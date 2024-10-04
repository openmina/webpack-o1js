import {
	AccountUpdate,
	fetchAccount,
	Field,
	method,
	Mina,
	Permissions,
	PrivateKey,
	PublicKey,
	SmartContract,
	state,
	State,
	TransactionVersion,
	Types,
} from 'o1js';
import { ZkInput } from '../tutorial-gql4/run';

class Add extends SmartContract {
	@state(Field) num = State<Field>();

	override init(): void {
		this.account.provedState.requireEquals(this.account.provedState.get());
		this.account.provedState.get().assertFalse();

		super.init();
		this.num.set(Field(1));
	}

	@method
	async update() {
		const currentState = this.num.getAndRequireEquals();
		const newState = currentState.add(5);
		this.num.set(newState);
	}

	override async deploy() {
		super.deploy();
		this.account.permissions.set({
			...Permissions.default(),
			setDelegate: Permissions.signature(),
			setPermissions: Permissions.signature(),
			setZkappUri: Permissions.signature(),
			setTokenSymbol: Permissions.signature(),
			incrementNonce: Permissions.signature(),
			setVotingFor: Permissions.signature(),
			setTiming: Permissions.signature(),
			send: Permissions.proof(),
			editState: Permissions.proof(),
			receive: Permissions.none(),
			access: Permissions.none(),
			editActionState: Permissions.proof(),
		});
	}
}

const wallets = [
	{
		privateKey: 'EKEQGWy4TjbVeqKjbe7TW81DKQM34min5FNmXpKArHKLyGVd3KSP',
		publicKey: 'B62qpD75xH5R19wxZG2uz8whNsHPTioVoYcPV3zfjjSbzTmaHQHKKEV',
	},
	{
		privateKey: 'EKETKywEr7ktbzqj8D2aj4yYZVMyj33sHuWLQydbzt1M3sGnAbTh',
		publicKey: 'B62qnLjgW4LAnrxkcdLc7Snb49qx6aP5qsmPsp6ueZN4XPMC621cqGc',
	},
];

const payerKeys = {
	publicKey: PrivateKey.fromBase58(wallets[0].privateKey).toPublicKey(),
	privateKey: PrivateKey.fromBase58(wallets[0].privateKey),
};

/**
 * Use this for deploying a new ZK App
 */
// const randPrivateKey = PrivateKey.random();
// export const zkAppKeys = {
// 	publicKey: randPrivateKey.toPublicKey(),
// 	privateKey: randPrivateKey,
// };

/**
 *  after the ZK App is deployed use the keys from the deployed one.
 *
 *  Here is a deployed one.
 *  B62qj4tNWfzb4MoEr2zMjfDu4P9gvwvw5XyFjDKBee3FZa81aE8MHTN
 *  EKDhoHvwKue45WsKtLA9LNhd6yzUH6Eg9bqW918DPzuqmSa2B4c1
 *
 */
export const zkAppKeys = {
	publicKey: PublicKey.fromBase58('B62qj4tNWfzb4MoEr2zMjfDu4P9gvwvw5XyFjDKBee3FZa81aE8MHTN'),
	privateKey: PrivateKey.fromBase58('EKDhoHvwKue45WsKtLA9LNhd6yzUH6Eg9bqW918DPzuqmSa2B4c1'),
};

export async function gql2deploy(): Promise<void> {
	const network = Mina.Network('https://api.minascan.io/node/devnet/v1/graphql');
	// const network = Mina.Network('http://adonagy.hz.minaprotocol.network:3000/graphql');
	// const network = Mina.Network('http://65.109.105.40:5000/graphql');
	Mina.setActiveInstance(network);
	// const zkAppPublicKey = PublicKey.fromBase58(wallets[1].publicKey);
	// const zkAppPrivateKey = PrivateKey.fromBase58(wallets[1].privateKey);
	const zkApp = new Add(zkAppKeys.publicKey);
	log('fetching account...');
	const { account } = await fetchAccount({ publicKey: payerKeys.publicKey });

	log('Compiling...');
	await Add.compile();
	log('Updating...');
	log('ZkAPP pub_key:', zkAppKeys.publicKey.toBase58(), zkAppKeys.privateKey.toBase58());

	const payerAccount: any = { sender: payerKeys.publicKey, fee: Number('0.111') * 1e9, nonce: Types.Account.toJSON(account).nonce };
	log('payerAccount', { sender: payerKeys.publicKey.toBase58(), fee: Number('0.111') * 1e9, nonce: Types.Account.toJSON(account).nonce });
	let tx = await Mina.transaction(payerAccount, async () => {
		AccountUpdate.fundNewAccount(payerKeys.publicKey);
		log('zkApp deploying...');
		await zkApp.deploy();
	});

	log('Proving...');
	await tx.prove();

	log('Submitting...');
	await tx.sign([payerKeys.privateKey, zkAppKeys.privateKey]);

	await tx.safeSend().then((sentTx) => {
		log(sentTx);
		if (sentTx.data) {
			log('Sent transaction: ', sentTx);
		} else if ((tx as any)?.errors?.length) {
			log('Transaction errors: ', (tx as any)?.errors[0]);
			log((tx as any)?.errors[0].statusText);
		}
	});
}

export async function gql2update(): Promise<void> {
	const network = Mina.Network('http://adonagy.hz.minaprotocol.network:3000/graphql');
	Mina.setActiveInstance(network);
	// const zkAppPublicKey = PublicKey.fromBase58(wallets[1].publicKey);
	// const zkAppPrivateKey = PrivateKey.fromBase58(wallets[1].privateKey);
	const zkApp = new Add(zkAppKeys.publicKey);
	log('fetching account...');
	const { account } = await fetchAccount({ publicKey: payerKeys.publicKey });

	log('Compiling...');
	await Add.compile();
	log('Updating...');
	log('ZkAPP pub_key:', zkAppKeys.publicKey.toBase58(), zkAppKeys.privateKey.toBase58());

	const payerAccount: any = { sender: payerKeys.publicKey, fee: Number('0.112') * 1e9, nonce: Types.Account.toJSON(account).nonce };
	log('payerAccount', { sender: payerKeys.publicKey.toBase58(), fee: Number('0.112') * 1e9, nonce: Types.Account.toJSON(account).nonce });
	log('Fetch zk app account');
	const { account: zkAccount } = await fetchAccount({ publicKey: zkAppKeys.publicKey });
	log('zk Account:', zkAccount);
	log('zkApp deployed');
	const tx = await Mina.transaction(payerAccount, async () => {
		log('zkApp updating...');
		await zkApp.update();
		log('zkApp updated');
	});

	log('Proving...');
	await tx.prove();

	log('Submitting...');
	await tx.sign([payerKeys.privateKey, zkAppKeys.privateKey]).safeSend().then((sentTx: any) => {
		log(sentTx);
		if (sentTx) {
			log('Sent transaction: ', sentTx);
		} else if ((tx as any)?.errors?.length) {
			log('Transaction errors: ', (tx as any)?.errors[0]);
			log((tx as any)?.errors[0].statusText);
		}
	});
}

function log(...msg: any) {
	console.log(msg);
}
const deployedZkAppsForMultipleAccountUpdates: string[] = [
	"EKDmgmpAAtwqJisq5SAKC1tV56fGUt4srtLYyPNoZC2ginj13cED",
	"EKFG9d7MmFgekoEgYkw8uZUV7Nmk1JBisWETGKWmCZX2FDGuzCbv",
	"EKEw1ueSFFd6K53Zq6P54XLgZyJAhnx777Vd6aWY8a8bEscRQcFD",
	"EKESyzeCVXZdDdMMN3iuTwMLTAXX9Y7CX6rkPRPA5PGKuPouZq5g",
	"EKEZ58x3YAXfshcTSkyuXfkKYKt71ni5TTQKx2biXhKeqAND8sUN",
	"EKEXEUQosKnNxat2MKMtyAxUAnGZAxRA79oHWpEkJC24bDCg5qzu",
	"EKEK81cs5XVQasVrfhS2zHmBp5KLEqMtGiiKmUcCb47KbYnUuWZJ",
	"EKF6Kt1qwCekhKYuvQwHFbxDpbMP1aEDnoq1RWvPrx1eGgmvpohA"
];
export async function gql2DeployMultipleAccounts(): Promise<any> {
	const network = Mina.Network('http://adonagy.hz.minaprotocol.network:3000/graphql');
	Mina.setActiveInstance(network);
	const pairs = Array.from({ length: 8 }, () => {
		const randPrivateKey = PrivateKey.random();
		return {
			publicKey: randPrivateKey.toPublicKey(),
			privateKey: randPrivateKey,
		};
	});
	console.log(pairs.map((pair) => pair.privateKey.toBase58()));
	const zkApps: Add[] = pairs.map((pair) => new Add(pair.publicKey));

	await Add.compile();
	console.log('Compiled');
	const { account } = await fetchAccount({ publicKey: payerKeys.publicKey });

	const payerAccount = {
		sender: payerKeys.publicKey,
		fee: Number('0.11') * 1e9,
		nonce: Number(Types.Account.toJSON(account).nonce),
		memo: 'Deploy zk App o1js',
	};
	let tx = await Mina.transaction(payerAccount, async () => {
		AccountUpdate.fundNewAccount(payerKeys.publicKey, 8);
		await Promise.all(zkApps.map((zkApp) => zkApp.deploy()));
	});

	await tx.prove();
	console.log('Proved');

	await tx.sign([payerKeys.privateKey, ...pairs.map((pair) => pair.privateKey)]);
	console.log('Signed');

	return tx.safeSend().then((sentTx) => {
		console.log('Sent');
		console.log(sentTx);
		console.log('----------- Done -----------');
		return sentTx;
	});
}

export async function gql2UpdateMultipleAccounts(): Promise<any> {
	// const network = Mina.Network('http://adonagy.hz.minaprotocol.network:3000/graphql');
	const network = Mina.Network('https://api.minascan.io/node/devnet/v1/graphql');
// const network = Mina.Network('http://65.109.105.40:5000/graphql');
	Mina.setActiveInstance(network);
	const pairs = Array.from({ length: 8 }, (_, i) => {
		const randPrivateKey = PrivateKey.fromBase58(deployedZkAppsForMultipleAccountUpdates[i]);
		return {
			publicKey: randPrivateKey.toPublicKey(),
			privateKey: randPrivateKey,
		};
	});
	const zkApps: Add[] = pairs.map((pair) => new Add(pair.publicKey));

	console.log('compiling');
	await Add.compile();
	console.log('Compiled');
	const { account } = await fetchAccount({ publicKey: payerKeys.publicKey });

	const payerAccount = {
		sender: payerKeys.publicKey,
		fee: Number('0.11') * 1e9,
		nonce: Number(Types.Account.toJSON(account).nonce),
		memo: 'Update zk App o1js',
	};
	console.log('sending');
	let tx = await Mina.transaction(payerAccount, async () => {
		for (const zkApp of zkApps) {
			await zkApp.update();
		}
	});


	await tx.prove();
	console.log('Proved');

	await tx.sign([payerKeys.privateKey, ...pairs.map((pair) => pair.privateKey)]);
	console.log('Signed');

	return tx.safeSend().then((sentTx) => {
		console.log('Sent');
		console.log(sentTx);
		console.log('----------- Done -----------');
		return sentTx;
	});
}