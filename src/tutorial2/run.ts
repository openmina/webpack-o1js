import { AccountUpdate, Field, method, Mina, Poseidon, PrivateKey, SmartContract, State, state } from 'o1js';

class IncrementSecret extends SmartContract {
	@state(Field) x = State<Field>();

	@method
	async initState(salt: Field, firstSecret: Field) {
		this.x.set(Poseidon.hash([salt, firstSecret]));
	}

	@method
	async incrementSecret(salt: Field, secret: Field) {
		const x = this.x.get();
		this.x.requireEquals(x);

		Poseidon.hash([salt, secret]).assertEquals(x);
		this.x.set(Poseidon.hash([salt, secret.add(1)]));
	}
}

export async function runTutorial2() {
	const useProof = false;

	const Local = await Mina.LocalBlockchain({ proofsEnabled: useProof });
	Mina.setActiveInstance(Local);

	const deployerAccount = Local.testAccounts[0];
	const deployerKey = deployerAccount.key;
	const senderAccount = Local.testAccounts[1];
	const senderKey = senderAccount.key;

	const salt = Field.random();

// ----------------------------------------------------

// create a destination we will deploy the smart contract to
	const zkAppPrivateKey = PrivateKey.random();
	const zkAppAddress = zkAppPrivateKey.toPublicKey();

	const zkAppInstance = new IncrementSecret(zkAppAddress);
	const deployTxn = await Mina.transaction(deployerAccount, async () => {
		AccountUpdate.fundNewAccount(deployerAccount);
		await zkAppInstance.deploy();
		return await zkAppInstance.initState(salt, Field(750));
	});
	await deployTxn.prove();
	await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();

// get the initial state of IncrementSecret after deployment
	const num0 = zkAppInstance.x.get();
	console.log('state after init:', num0.toString());

// ----------------------------------------------------

	const txn1 = await Mina.transaction(senderAccount, async () =>
		await zkAppInstance.incrementSecret(salt, Field(750)),
	);
	await txn1.prove();
	await txn1.sign([senderKey]).send();

	const num1 = zkAppInstance.x.get();
	console.log('state after txn1:', num1.toString());

// ----------------------------------------------------
}