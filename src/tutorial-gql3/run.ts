import { AccountUpdate, fetchAccount, Field, Mina, PrivateKey, Types } from 'o1js';
import { ProofsOnlyZkApp } from './ProofsOnlyZkApp';
import { SecondaryZkApp } from './SecondaryZkApp';

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

export async function gql3({ proofsEnabled } = { proofsEnabled: true }): Promise<void> {
	console.log('Running Proof ZK App');
	const network = Mina.Network('http://65.109.105.40:5000/graphql');
	Mina.setActiveInstance(network);
	// const Local = await Mina.LocalBlockchain({ proofsEnabled });
	// Mina.setActiveInstance(Local);
	// todo: add accounts from real wallets.
	// const deployerPublicKey = Local.testAccounts[0];
	// const deployerPrivateKey = deployerPublicKey.key;
	const deployerPrivateKey = PrivateKey.fromBase58(wallets[0].privateKey);
	const deployerPublicKey = deployerPrivateKey.toPublicKey();

	if (proofsEnabled) {
		console.log('PROOFS ENABLED!');
		console.log('Compiling ProofsOnlyZkApp');
		await ProofsOnlyZkApp.compile();
		console.log('Compiled ProofsOnlyZkApp');
		console.log('Compiling SecondaryZkApp');
		await SecondaryZkApp.compile();
		console.log('Compiled SecondaryZkApp');
	}

	const proofsOnlySk = PrivateKey.random();
	const proofsOnlyAddr = proofsOnlySk.toPublicKey();

	const secondarySk = PrivateKey.random();
	const secondaryAddr = secondarySk.toPublicKey();

	const legend = {
		[proofsOnlyAddr.toBase58()]: 'proofsOnlyZkApp',
		[secondaryAddr.toBase58()]: 'secondaryZkApp',
		[deployerPublicKey.toBase58()]: 'deployer',
	};

	const proofsOnlyInstance = new ProofsOnlyZkApp(proofsOnlyAddr);
	const secondaryInstance = new SecondaryZkApp(secondaryAddr);

	console.log('Fetching account');
	const { account } = await fetchAccount({ publicKey: deployerPublicKey });
	console.log('Fetched account');

	const deployTxn = await Mina.transaction({
		sender: deployerPublicKey,
		fee: Number('0.712') * 1e9,
		memo: 'Sent using o1js!',
		nonce: Number(Types.Account.toJSON(account).nonce),
	}, async () => {
		AccountUpdate.fundNewAccount(deployerPublicKey, 2);
		console.log('Deploying ProofsOnlyZkApp');
		await proofsOnlyInstance.deploy();
		await secondaryInstance.deploy();
		console.log('Deployed SecondaryZkApp');
	});

	console.log('Proving deployTxn');
	await deployTxn.prove();
	console.log('Proved deployTxn');
	console.log('Signing deployTxn');
	deployTxn.sign([deployerPrivateKey, proofsOnlySk, secondarySk]);
	console.log('Signed deployTxn');

	console.log('Sending deployTxn');
	await deployTxn.send();
	console.log('Sent deployTxn');

	const txn1 = await Mina.transaction({
		sender: deployerPublicKey,
		fee: Number('0.811') * 1e9,
		memo: 'Sent using o1js!',
		nonce: Number(Types.Account.toJSON(account).nonce) + 1,
	}, async () => {
		console.log('Calling add(4) on proofsOnlyInstance');
		await proofsOnlyInstance.add(Field(4));
		console.log('Called add(4) on proofsOnlyInstance');
	});

	console.log('Proving txn1');
	await txn1.prove();
	console.log('Proved txn1');

	console.log('Signing txn1');
	await txn1.sign([deployerPrivateKey]);
	console.log('Signed txn1');

	const txn2 = await Mina.transaction({
		sender: deployerPublicKey,
		fee: Number('0.911') * 1e9,
		memo: 'Sent using o1js!',
		nonce: Number(Types.Account.toJSON(account).nonce) + 2,
	}, async () => {
		console.log('Calling add(12) on proofsOnlyInstance');
		await proofsOnlyInstance.callSecondary(secondaryAddr);
		console.log('Called add(12) on proofsOnlyInstance');
	});

	console.log('Proving txn2');
	await txn2.prove();
	console.log('Proved txn2');

	console.log('Signing txn2');
	await txn2.sign([deployerPrivateKey]);
	console.log('Signed txn2');

	console.log('Sending txn2');
	await txn2.send();
	console.log('Sent txn2');
	console.log('----------------------------------------------------');
	console.log('FINISHED!');
}
