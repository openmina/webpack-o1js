import {
	AccountUpdate, Bool,
	fetchAccount,
	Field,
	method,
	Mina,
	Permissions, Poseidon,
	PrivateKey, Provable,
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

class IsEven extends SmartContract {
	@state(Field) number = State<Field>();

	// Initialize the zkApp with a number
	override init() {
		this.account.provedState.requireEquals(this.account.provedState.get());
		this.account.provedState.get().assertFalse();

		super.init();
		this.number.set(Field(10));
	}

	// Method to check if the number is even
	@method
	async checkEven() {
		this.number.requireEquals(this.number.get());
		const num = this.number.get();
		const isEven = num.isEven();
		this.generateProof(isEven);
	}

	// Generate a proof for the computation
	generateProof(isEven: Bool) {
		const hash = Poseidon.hash([this.number.get()]);
		// Provable.log(hash, isEven);
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

const zkApps: { publicKey: PublicKey; privateKey: PrivateKey; }[] = [];
for (let i = 0; i < 2; i++) {
	const randPrivateKey = PrivateKey.random();
	zkApps.push({
		publicKey: randPrivateKey.toPublicKey(),
		privateKey: randPrivateKey,
	});
}

export interface ZkInput {
	payerPublicKey: string;
	payerPrivateKey: string;
	fee: number;
	nonce: string;
	memo?: string;
	accountUpdates: number;
}

export async function gql4(): Promise<void> {
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

export async function gql4Update(input: ZkInput = {
	payerPrivateKey: 'EKEQGWy4TjbVeqKjbe7TW81DKQM34min5FNmXpKArHKLyGVd3KSP',
	payerPublicKey: 'B62qpD75xH5R19wxZG2uz8whNsHPTioVoYcPV3zfjjSbzTmaHQHKKEV',
	accountUpdates: 1,
	fee: 0.05,
	memo: 'ZkApp Update o1js',
	nonce: null,
}, updates: { next: (val: { step: string, duration: number }) => void } = { next: (v) => {} }): Promise<any> {
	console.log('----------- Updating ZkApp (Proof) -----------');
	// const network = Mina.Network('http://65.109.105.40:5000/graphql');
	const network = Mina.Network('https://api.minascan.io/node/devnet/v1/graphql');
	// const network = Mina.Network('http://adonagy.hz.minaprotocol.network:3000/graphql');
	Mina.setActiveInstance(network);
	const pairs = Array.from({ length: input.accountUpdates }, () => {
		const randPrivateKey = PrivateKey.fromBase58('EKDx37bQBfayZn7M5rhDSVBZBBQLHZukqJMRfC1esVAPZ5iFzWSM');
		return {
			publicKey: randPrivateKey.toPublicKey(),
			privateKey: randPrivateKey,
		};
	});
	const zkApps: IsEven[] = pairs.map((pair) => new IsEven(pair.publicKey));

	let stepStartTime = performance.now();

	const updateStep = (step: string) => {
		const now = performance.now();
		updates.next({ step, duration: now - stepStartTime });
		let duration = (now - stepStartTime) / 1000;
		console.log(`${step} (${Math.round(duration * 10000) / 10000}s)`);
		stepStartTime = now;
	};

	await IsEven.compile();
	updateStep('Compiled');

	const { account } = await fetchAccount({ publicKey: payerKeys.publicKey });

	const payerAccount = {
		sender: PublicKey.fromBase58(input.payerPublicKey),
		fee: input.fee * 1e9,
		nonce: Number(Types.Account.toJSON(account).nonce),
		memo: input.memo,
	};
	let tx = await Mina.transaction(payerAccount, async () => {
		await Promise.all(zkApps.map((zkApp) => zkApp.checkEven()));
	});

	updateStep('Proved Check Even');

	await tx.prove();
	updateStep('Proved');

	await tx.sign([PrivateKey.fromBase58(input.payerPrivateKey), ...pairs.map((pair) => pair.privateKey)]);
	updateStep('Signed');

	return tx.safeSend().then((sentTx) => {
		updateStep('Sent');
		updateStep(null);
		console.log(sentTx);
		console.log('----------- Done -----------');
		return sentTx;
	});
}

export async function deployZkApp(graphQlUrl: string, input: ZkInput, updates: { next: (val: { step: string, duration: number }) => void }): Promise<any> {
	console.log('----------- Sending ZkApp -----------');
	const network = Mina.Network(graphQlUrl);
	Mina.setActiveInstance(network);
	const pairs = Array.from({ length: input.accountUpdates }, () => {
		const randPrivateKey = PrivateKey.random();
		return {
			publicKey: randPrivateKey.toPublicKey(),
			privateKey: randPrivateKey,
		};
	});
	console.log(pairs.map((pair) => pair.privateKey.toBase58()));
	const zkApps: Add[] = pairs.map((pair) => new Add(pair.publicKey));

	let stepStartTime = performance.now();

	const updateStep = (step: string) => {
		const now = performance.now();
		if (step === 'Compiling') {
			updates.next({ step, duration: undefined });
			return;
		}
		let duration = Math.round((now - stepStartTime) / 1000 * 1000) / 1000;
		updates.next({ step, duration });
		console.log(`${step} (${duration}s)`);
		stepStartTime = now;
	};

	updateStep('Compiling');
	await Add.compile();
	updateStep('Compiled');

	const payerAccount = { sender: PublicKey.fromBase58(input.payerPublicKey), fee: input.fee * 1e9, nonce: Number(input.nonce), memo: input.memo };
	let tx = await Mina.transaction(payerAccount, async () => {
		AccountUpdate.fundNewAccount(PublicKey.fromBase58(input.payerPublicKey), input.accountUpdates);
		for (const zkApp of zkApps) {
			await zkApp.deploy();
		}
	});

	updateStep('Deployed');

	await tx.prove();
	updateStep('Proved');

	await tx.sign([PrivateKey.fromBase58(input.payerPrivateKey), ...pairs.map((pair) => pair.privateKey)]);
	updateStep('Signed');

	return tx.safeSend().then((sentTx) => {
		updateStep('Sent');
		console.log(sentTx);
		console.log('----------- Done -----------');
		return sentTx;
	});
}

const deployedZkApps: string[] = [
	"EKEbTHeqQbq5zeFuspjVSoatEebrG7fJnz8CrXyP4aVAXzeD1Z6A",
	"EKFF1zZ4KUCZoe7GXHAPcfLdkGPgsYJ5RNtQvHMx8ndhY1pZttaa"
];

export async function updateZkApp(graphQlUrl: string, input: ZkInput, updates: { next: (val: { step: string, duration: number }) => void }): Promise<any> {
	console.log('----------- Updating ZkApp -----------');
	const network = Mina.Network(graphQlUrl);
	Mina.setActiveInstance(network);
	const pairs = Array.from({ length: input.accountUpdates }, (_, i: number) => {
		const randPrivateKey = PrivateKey.fromBase58(deployedZkApps[i]);
		return {
			publicKey: randPrivateKey.toPublicKey(),
			privateKey: randPrivateKey,
		};
	});
	const zkApps: Add[] = pairs.map((pair) => new Add(pair.publicKey));

	let stepStartTime = performance.now();

	const updateStep = (step: string) => {
		const now = performance.now();
		if (step === 'Compiling') {
			updates.next({ step, duration: undefined });
			return;
		}
		let duration = Math.round((now - stepStartTime) / 1000 * 1000) / 1000;
		updates.next({ step, duration });
		console.log(`${step} (${duration}s)`);
		stepStartTime = now;
	};
	updateStep('Compiling');

	await Add.compile();
	updateStep('Compiled');

	const payerAccount = { sender: PublicKey.fromBase58(input.payerPublicKey), fee: input.fee * 1e9, nonce: Number(input.nonce), memo: input.memo };
	let tx = await Mina.transaction(payerAccount, async () => {
		for (const zkApp of zkApps) {
			await zkApp.update();
		}
	});

	updateStep('Proved Check Even');

	await tx.prove();
	updateStep('Proved');

	await tx.sign([PrivateKey.fromBase58(input.payerPrivateKey), ...pairs.map((pair) => pair.privateKey)]);
	updateStep('Signed');

	return tx.safeSend().then((sentTx) => {
		updateStep('Sent');
		updateStep(null);
		console.log(sentTx);
		console.log('----------- Done -----------');
		return sentTx;
	});
}