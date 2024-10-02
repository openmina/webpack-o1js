import { AccountUpdate, fetchAccount, Field, method, Mina, Permissions, PrivateKey, SmartContract, state, State, TransactionVersion, Types } from 'o1js';

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
			setVerificationKey: {
				txnVersion: TransactionVersion.current(),
				auth: Permissions.proof(),
			},
			setDelegate: Permissions.proof(),
			setPermissions: Permissions.proof(),
			setZkappUri: Permissions.proof(),
			setTokenSymbol: Permissions.proof(),
			incrementNonce: Permissions.proof(),
			setVotingFor: Permissions.proof(),
			setTiming: Permissions.proof(),
			send: Permissions.proof(),
			editState: Permissions.proof(),
			receive: Permissions.proof(),
			access: Permissions.proof(),
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

const randPrivateKey = PrivateKey.random();
export const zkAppKeys = {
	publicKey: randPrivateKey.toPublicKey(),
	privateKey: randPrivateKey,
};

export async function gql2deploy(): Promise<void> {
	// const network = Mina.Network('https://api.minascan.io/node/devnet/v1/graphql');
	const network = Mina.Network('http://adonagy.hz.minaprotocol.network:3000/graphql');
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
	const network = Mina.Network('https://api.minascan.io/node/devnet/v1/graphql');
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


// async function createAndDeployZkapp() {
// 	const network = Mina.Network('https://api.minascan.io/node/devnet/v1/graphql');
// 	Mina.setActiveInstance(network);
// 	// const zkAppPublicKey = PublicKey.fromBase58(wallets[1].publicKey);
// 	// const zkAppPrivateKey = PrivateKey.fromBase58(wallets[1].privateKey);
// 	const zkApp = new Add(deployedZkApp.publicKey);
// 	log('fetching account...');
// 	const { account } = await fetchAccount({ publicKey: payerKeys.publicKey });
//
// 	// const accountPrivateKey: PrivateKey = PrivateKey.fromBase58(wallets[0].privateKey);
// 	// const accountPublicKey: PublicKey = accountPrivateKey.toPublicKey();
//
// 	log('Compiling...');
// 	await Add.compile();
// 	log('Updating...');
// 	log('ZkAPP pub_key:', zkAppKeys.publicKey.toBase58(), zkAppKeys.privateKey.toBase58());
//
// 	const payerAccount: any = { sender: payerKeys.publicKey, fee: Number('0.112') * 1e9, nonce: Types.Account.toJSON(account).nonce };
// 	log('payerAccount', { sender: payerKeys.publicKey.toBase58(), fee: Number('0.112') * 1e9, nonce: Types.Account.toJSON(account).nonce });
// 	// let tx = await Mina.transaction(payerAccount, async () => {
// 	// 	AccountUpdate.fundNewAccount(payerKeys.publicKey);
// 	// 	log('zkApp updating...');
// 	// 	await zkApp.deploy();
// 	// });
// 	//
// 	// log('Proving...');
// 	// await tx.prove();
// 	//
// 	// log('Submitting...');
// 	// await tx.sign([payerKeys.privateKey, PrivateKey.fromBase58(deployedZkApp.privateKey)]);
// 	//
// 	// await tx.safeSend().then((sentTx) => {
// 	// 	log(sentTx);
// 	// 	if (sentTx.data) {
// 	// 		log('Sent transaction: ', sentTx);
// 	// 	} else if ((tx as any)?.errors?.length) {
// 	// 		log('Transaction errors: ', (tx as any)?.errors[0]);
// 	// 		log((tx as any)?.errors[0].statusText);
// 	// 	}
// 	// });
// 	log('Fetch zk app account');
// 	const { account: zkAccount } = await fetchAccount({ publicKey: deployedZkApp.publicKey });
// 	log('zk Account:', zkAccount);
// 	log('zkApp deployed');
// 	const tx = await Mina.transaction(payerAccount, async () => {
// 		log('zkApp updating...');
// 		await zkApp.update();
// 		log('zkApp updated');
// 	});
//
// 	log('Proving...');
// 	await tx.prove();
//
// 	log('Submitting...');
// 	await tx.sign([payerKeys.privateKey, deployedZkApp.privateKey]).safeSend().then((sentTx: any) => {
// 		log(sentTx);
// 		if (sentTx) {
// 			log('Sent transaction: ', sentTx);
// 		} else if ((tx as any)?.errors?.length) {
// 			log('Transaction errors: ', (tx as any)?.errors[0]);
// 			log((tx as any)?.errors[0].statusText);
// 		}
// 	});
// }

function log(...msg: any) {
	console.log(msg);
}