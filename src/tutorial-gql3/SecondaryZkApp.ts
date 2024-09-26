import { Field, method, Permissions, SmartContract, state, State } from 'o1js';

export class SecondaryZkApp extends SmartContract {
	@state(Field) num = State<Field>();

	override async deploy() {
		await super.deploy();
		this.account.permissions.set({
			...Permissions.default(),
		});
	}

	@method
	override async init() {
		this.account.provedState.getAndRequireEquals();
		this.account.provedState.get().assertFalse();

		super.init();
		this.num.set(Field(12));
	}

	@method async add(incrementBy: Field) {
		this.account.provedState.getAndRequireEquals();
		this.account.provedState.get().assertTrue();

		const num = this.num.getAndRequireEquals();
		this.num.set(num.add(incrementBy));
	}
}