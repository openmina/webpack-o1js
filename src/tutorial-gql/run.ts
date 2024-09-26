import {
	fetchAccount,
	setGraphqlEndpoints,
	fetchLastBlock,
	PublicKey,
	Types, Mina,
} from 'o1js';

export async function runTutorialGql(): Promise<void> {
	console.log('o1js loaded');
	// const network = Mina.Network({
	// 	mina: "https://api.minascan.io/node/devnet/v1/graphql",
	// 	archive: "https://api.minascan.io/archive/devnet/v1/graphql",
	// });
	const network = Mina.Network('https://api.minascan.io/node/devnet/v1/graphql');
	Mina.setActiveInstance(network);

	let zkappAddress = PublicKey.fromBase58(
		'B62qpD75xH5R19wxZG2uz8whNsHPTioVoYcPV3zfjjSbzTmaHQHKKEV'
	);
	console.log('zkappAddress', zkappAddress.toBase58());
	console.log('fetching account');
	let { account, error } = await fetchAccount({
		publicKey: zkappAddress,
	});
	if (error) {
		console.log('error', error);
	}
	console.log('account', Types.Account.toJSON(account!));

	let block = await fetchLastBlock();
	console.log('last block', block);
}
