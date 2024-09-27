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

const zkApps: { publicKey: PublicKey; privateKey: PrivateKey; }[] = [];
for (let i = 0; i < 2; i++ ) {
	const randPrivateKey = PrivateKey.random();
	zkApps.push({
		publicKey: randPrivateKey.toPublicKey(),
		privateKey: randPrivateKey,
	});
}

export interface ZkInput {
	graphQlUrl: string;
	payerPublicKey: string;
	payerPrivateKey: string;
	fee: number;
	nonce: string;
	memo?: string;
}

export async function gql4(input: ZkInput): Promise<void> {
	// const network = Mina.Network('http://65.109.105.40:5000/graphql');
	// const network = Mina.Network('https://api.minascan.io/node/devnet/v1/graphql');
	const network = Mina.Network('http://adonagy.hz.minaprotocol.network:3000/graphql');
	Mina.setActiveInstance(network);
	// const zkAppPublicKey = PublicKey.fromBase58(wallets[1].publicKey);
	// const zkAppPrivateKey = PrivateKey.fromBase58(wallets[1].privateKey);
	// const zks = zkApps.map((zkApp) => new Add(zkApp.publicKey));
	const zk1 = new Add(zkApps[0].publicKey);
	const zk2 = new Add(zkApps[1].publicKey);
	console.log('fetching account...');
	const { account } = await fetchAccount({ publicKey: payerKeys.publicKey });
	console.log(account);

	console.log('Compiling...');
	await Add.compile();
	console.log('Updating...');
	console.log('ZkAPP pub_key:', zkApps[0].publicKey.toBase58(), zkApps[0].privateKey.toBase58());
	console.log('ZkAPP pub_key:', zkApps[1].publicKey.toBase58(), zkApps[1].privateKey.toBase58());

	const payerAccount: any = { sender: payerKeys.publicKey, fee: Number('0.1') * 1e9, nonce: Types.Account.toJSON(account).nonce };
	let tx = await Mina.transaction(payerAccount, async () => {
		AccountUpdate.fundNewAccount(payerKeys.publicKey, 2);
		console.log('zkApp deploying...');
		await zk1.deploy();
		await zk2.deploy();
	});

	console.log('Proving...');
	await tx.prove();

	console.log('Submitting...');
	await tx.sign([payerKeys.privateKey, zkApps[0].privateKey, zkApps[1].privateKey]);

	await tx.safeSend().then((sentTx) => {
		console.log(sentTx);
		if (sentTx.data) {
		} else if ((tx as any)?.errors?.length) {
			console.log('Transaction errors: ', (tx as any)?.errors[0]);
			console.log((tx as any)?.errors[0].statusText);
		}
	});
}

