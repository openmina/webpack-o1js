import { SecondaryZkApp } from './SecondaryZkApp';

import {
	Field,
	SmartContract,
	state,
	State,
	method,
	PublicKey,
	Permissions,
	TransactionVersion, Bool,
} from 'o1js';

export class ProofsOnlyZkApp extends SmartContract {
	@state(Field) num = State<Field>();
	@state(Field) calls = State<Field>();

	override async deploy() {
		await super.deploy();
		this.account.permissions.set({
			...Permissions.default(),
			setDelegate: Permissions.proof(),
			setPermissions: Permissions.proof(),
			setVerificationKey: {
				auth: Permissions.proof(),
				txnVersion: TransactionVersion.current(),
			},
			setZkappUri: Permissions.proof(),
			setTokenSymbol: Permissions.proof(),
			incrementNonce: Permissions.proof(),
			setVotingFor: Permissions.proof(),
			setTiming: Permissions.proof(),
		});
	}

	@method
	override async init() {
		this.account.provedState.requireEquals(Bool(false));

		super.init();
		this.num.set(Field(1));
		this.calls.set(Field(0));
	}

	@method async add(incrementBy: Field) {
		this.account.provedState.requireEquals(Bool(true));

		const num = this.num.getAndRequireEquals();
		this.num.set(num.add(incrementBy));

		await this.incrementCalls();
	}

	@method async incrementCalls() {
		// const isInitialized = this.account.provedState.getAndRequireEquals();
		// isInitialized.assertTrue();
		this.account.provedState.requireEquals(Bool(true));

		const calls = this.calls.getAndRequireEquals();
		this.calls.set(calls.add(Field(1)));
	}

	@method async callSecondary(secondaryAddr: PublicKey) {
		this.account.provedState.requireEquals(Bool(true));

		const secondaryContract = new SecondaryZkApp(secondaryAddr);
		const num = this.num.getAndRequireEquals();

		await secondaryContract.add(num);

		// NOTE this gets the state at the start of the transaction
		this.num.set(secondaryContract.num.get());

		await this.incrementCalls();
	}
}