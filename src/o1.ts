import ZkappWorkerClient from './zkAppWorkerClient';


// DECORATORS VERSION (ORIGINAL)
// class Square extends SmartContract {
// 	@state(Field) num = State<Field>();
//
// 	override init() {
// 		super.init();
// 		this.num.set(Field(3));
// 	}
//
// 	@method update(square: Field) {
// 		const currentState = this.num.get();
// 		this.num.assertEquals(currentState);
// 		square.assertEquals(currentState.mul(currentState));
// 		this.num.set(square);
// 	}
// }

// NON-DECORATORS VERSION (SUGGESTED FOR JAVASCRIPT) - but same behaviour
// class Square extends SmartContract {
// 	num: State<Field> = State();
//
// 	override init() {
// 		super.init();
// 		this.num.set(Field(3));
// 	}
//
// 	update(square: Field) {
// 		const currentState = this.num.get();
// 		this.num.assertEquals(currentState);
// 		square.assertEquals(currentState.mul(currentState));
// 		this.num.set(square);
// 	}
// }
//
// declareMethods(Square, { update: [Field as any] });
// declareState(Square, { num: Field as any });

async function init() {
	const zkappWorkerClient = new ZkappWorkerClient();
	setTimeout(async () => {
		console.log('-------------');
		console.log('loading SnarkyJS');
		console.log('SnarkyJS loaded');
		await zkappWorkerClient.loadSnarkyJS();
		console.log('setting active instance to Berkeley');
		await zkappWorkerClient.setActiveInstanceToBerkeley();
		console.log('-------------');
		console.log('loading contract');
		await zkappWorkerClient.loadContract();
		console.log('contract loaded');
		console.log('-------------');
		const length = await zkappWorkerClient.fetchBlockchainLength();
		console.log('blockchain length: ' + length);

		setTimeout(async () => {
			console.log('-------------');
			console.log('connecting to AURO WALLET');

			await zkappWorkerClient.setActiveInstanceToBerkeley();
			const mina = (window as any).mina;
			const publicKeyBase58: string[] = await mina.requestAccounts();
			console.log('AURO connected');
			console.log(publicKeyBase58);

			setTimeout(async() => {
				console.log('Generating Private Key');
				const generatedPrivKey = await zkappWorkerClient.generatePrivateKey();
				console.log('Generated Private key', generatedPrivKey);
				console.log('-------------');
				console.log('Will compile circuit');
				console.log('compiling');
				const x = await zkappWorkerClient.compileContract();
				console.log('compiled');
			}, 1000);

		}, 1000);
	}, 2000);

// 	try {
// 		isReady.then(async (a) => {
// 			console.log(a);
//
// 			console.log('o1js loaded');
//
// 			const useProof = false;
//
// 			if (Mina) {
// 				console.log('mina');
// 				const Local = Mina.LocalBlockchain({ proofsEnabled: useProof });
// 				Mina.setActiveInstance(Local);
// 				const { privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0];
// 				const { privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1];
//
// // ----------------------------------------------------
//
// // Create a public/private key pair. The public key is your address and where you deploy the zkApp to
// 				const zkAppPrivateKey = PrivateKey.random();
// 				console.log(zkAppPrivateKey);
// 				const zkAppAddress = zkAppPrivateKey.toPublicKey();
//
// // create an instance of Square - and deploy it to zkAppAddress
// 				const zkAppInstance = new Square(zkAppAddress);
// 				let deployTxn;
// 				try {
// 					Mina.transaction(deployerAccount, () => {
// 						AccountUpdate.fundNewAccount(deployerAccount);
// 						zkAppInstance.deploy();
// 					}).then(d => {
// 						deployTxn = d;
// 					});
// 				} catch (e) {
// 					console.error(e);
// 				} finally {
// 					console.log('The final block');
// 				}
// 				// const deployTxn = await Mina.transaction(deployerAccount, () => {
// 				// 	AccountUpdate.fundNewAccount(deployerAccount);
// 				// 	zkAppInstance.deploy();
// 				// });
// 			}
// 		});
// 	} catch (e) {
// 		console.error(e);
// 	} finally {
// 		console.log('The final block');
// 	}
	// await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();
	//
	// const txn1 = await Mina.transaction(senderAccount, () => {
	// 	zkAppInstance.update(Field(9));
	// });
	// console.log('prooving');
	// await txn1.prove();
	// console.log('prooved');

}

export default init;
