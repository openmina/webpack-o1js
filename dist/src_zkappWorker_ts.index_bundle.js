/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["$"] = factory();
	else
		root["$"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/zkappWorker.ts":
/*!****************************!*\
  !*** ./src/zkappWorker.ts ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Outcome: () => (/* binding */ Outcome),\n/* harmony export */   Preimage: () => (/* binding */ Preimage),\n/* harmony export */   fromMacPack: () => (/* binding */ fromMacPack),\n/* harmony export */   toMacPack: () => (/* binding */ toMacPack)\n/* harmony export */ });\n/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! o1js */ \"./node_modules/o1js/dist/web/index.js\");\n/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bs58 */ \"./node_modules/bs58/index.js\");\n/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bs58__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var byteify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! byteify */ \"./node_modules/byteify/bundled/esm/index.esm.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__]);\no1js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (undefined && undefined.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\n\n\n\nclass Outcome extends (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Struct)({\n    description: o1js__WEBPACK_IMPORTED_MODULE_0__.CircuitString,\n    payment_employer: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64,\n    payment_contractor: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64,\n    payment_arbiter: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64,\n    start_after: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32,\n    finish_before: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32,\n}) {\n    static hash(v) {\n        return o1js__WEBPACK_IMPORTED_MODULE_0__.Poseidon.hash(v.description\n            .toFields()\n            .concat(v.payment_employer.toFields(), v.payment_contractor.toFields(), v.payment_arbiter.toFields(), v.start_after.toFields(), v.finish_before.toFields()));\n    }\n}\nclass Preimage extends (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Struct)({\n    contract: o1js__WEBPACK_IMPORTED_MODULE_0__.CircuitString,\n    address: o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey,\n    employer: o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey,\n    contractor: o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey,\n    arbiter: o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey,\n    deposited: Outcome,\n    success: Outcome,\n    failure: Outcome,\n    cancel: Outcome,\n}) {\n    static hash(v) {\n        return o1js__WEBPACK_IMPORTED_MODULE_0__.Poseidon.hash(v.contract\n            .toFields()\n            .concat(v.address.toFields(), v.employer.toFields(), v.contractor.toFields(), v.arbiter.toFields(), v.deposited.description.toFields(), v.deposited.payment_employer.toFields(), v.deposited.payment_contractor.toFields(), v.deposited.payment_arbiter.toFields(), v.deposited.start_after.toFields(), v.deposited.finish_before.toFields(), v.success.description.toFields(), v.success.payment_employer.toFields(), v.success.payment_contractor.toFields(), v.success.payment_arbiter.toFields(), v.success.start_after.toFields(), v.success.finish_before.toFields(), v.failure.description.toFields(), v.failure.payment_employer.toFields(), v.failure.payment_contractor.toFields(), v.failure.payment_arbiter.toFields(), v.failure.start_after.toFields(), v.failure.finish_before.toFields(), v.cancel.payment_employer.toFields(), v.cancel.payment_contractor.toFields(), v.cancel.payment_arbiter.toFields(), v.cancel.start_after.toFields(), v.cancel.finish_before.toFields()));\n    }\n}\nfunction Uint8ArrayToNumbers(input) {\n    let t = [];\n    for (let i = 0; i < input.length; ++i) {\n        t.push(input[i]);\n    }\n    return t;\n}\nfunction bytesToMacPack(_bytes) {\n    let encoded = bs58__WEBPACK_IMPORTED_MODULE_1___default().encode(_bytes);\n    const wordlen = 13; // number of characters per word\n    const linelen = 4; // number of words per line\n    // console.log(encoded.match(/.{1,13}/g));\n    let macpack = 'BEGINMACPACK.';\n    let line = 1;\n    while (encoded.length > 0) {\n        let word = '';\n        if (encoded.length < wordlen) {\n            word = encoded;\n            encoded = '';\n        }\n        else {\n            word = encoded.slice(0, wordlen);\n            encoded = encoded.slice(13, encoded.length);\n        }\n        if (line < linelen) {\n            macpack += ' ' + word;\n            line += 1;\n        }\n        else {\n            line = 1;\n            macpack += '\\n' + word;\n        }\n    }\n    macpack += '. ENDMACPACK.';\n    return macpack.toString();\n}\nfunction MacPackToBytes(macpack) {\n    let extracted = macpack.substring(macpack.indexOf('BEGINMACPACK.') + 13, macpack.lastIndexOf('. ENDMACPACK.'));\n    extracted = extracted.replace(/[\\n\\r\\s]/g, '');\n    return bs58__WEBPACK_IMPORTED_MODULE_1___default().decode(extracted);\n}\nfunction Uint8ArrayConcat(arrays) {\n    let t = [];\n    for (let j = 0; j < arrays.length; ++j) {\n        for (let i = 0; i < arrays[j].length; ++i) {\n            t.push(arrays[j][i]);\n        }\n    }\n    return new Uint8Array(t);\n}\nfunction outcomeToBytes(v) {\n    const bytes_text = Buffer.from(v.description.toString());\n    const bytes_text_length = Uint8Array.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.serializeUint8)(bytes_text.length));\n    const bytes_employer = Uint8Array.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.serializeUint64)(v.payment_employer.toBigInt()));\n    const bytes_contractor = Uint8Array.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.serializeUint64)(v.payment_contractor.toBigInt()));\n    const bytes_arbiter = Uint8Array.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.serializeUint64)(v.payment_arbiter.toBigInt()));\n    const bytes_start_after = Uint8Array.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.serializeUint64)(v.start_after.toUInt64().toBigInt()));\n    const bytes_finish_before = Uint8Array.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.serializeUint64)(v.finish_before.toUInt64().toBigInt()));\n    return Uint8ArrayConcat([\n        bytes_employer,\n        bytes_contractor,\n        bytes_arbiter,\n        bytes_start_after,\n        bytes_finish_before,\n        bytes_text_length,\n        bytes_text,\n    ]);\n}\nfunction bytesToOutcome(_bytes) {\n    const payment_employer = o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.deserializeUint64)(Uint8ArrayToNumbers(_bytes.slice(0, 8))));\n    const payment_contractor = o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.deserializeUint64)(Uint8ArrayToNumbers(_bytes.slice(8, 16))));\n    const payment_arbiter = o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.deserializeUint64)(Uint8ArrayToNumbers(_bytes.slice(16, 24))));\n    const start_after = o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.deserializeUint64)(Uint8ArrayToNumbers(_bytes.slice(24, 32))));\n    const finish_before = o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.deserializeUint64)(Uint8ArrayToNumbers(_bytes.slice(32, 40))));\n    const text_length = (0,byteify__WEBPACK_IMPORTED_MODULE_2__.deserializeUint8)(Uint8ArrayToNumbers(_bytes.slice(40, 41)));\n    const text = Buffer.from(_bytes.slice(41, 41 + text_length)).toString();\n    const description = o1js__WEBPACK_IMPORTED_MODULE_0__.CircuitString.fromString(text);\n    return new Outcome({\n        description: description,\n        payment_employer: payment_employer,\n        payment_contractor: payment_contractor,\n        payment_arbiter: payment_arbiter,\n        start_after: start_after,\n        finish_before: finish_before,\n    });\n}\nfunction preimageToBytes(v) {\n    const deposited = v.deposited;\n    const success = v.success;\n    const failure = v.failure;\n    const cancel = v.cancel;\n    // protocol version and format version\n    const bytes_header = Uint8Array.from([1, 1]); // contract version, format version\n    const bytes_contract_text = Buffer.from(v.contract.toString());\n    const bytes_contract_text_length = Uint8Array.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.serializeUint8)(bytes_contract_text.length));\n    const bytes_address = bs58__WEBPACK_IMPORTED_MODULE_1___default().decode(v.address.toBase58());\n    const bytes_employer = bs58__WEBPACK_IMPORTED_MODULE_1___default().decode(v.employer.toBase58());\n    const bytes_contractor = bs58__WEBPACK_IMPORTED_MODULE_1___default().decode(v.contractor.toBase58());\n    const bytes_arbiter = bs58__WEBPACK_IMPORTED_MODULE_1___default().decode(v.arbiter.toBase58());\n    const bytes_deposited = outcomeToBytes(deposited);\n    const bytes_deposited_length = Uint8Array.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.serializeUint8)(bytes_deposited.length));\n    const bytes_success = outcomeToBytes(success);\n    const bytes_success_length = Uint8Array.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.serializeUint8)(bytes_success.length));\n    const bytes_failure = outcomeToBytes(failure);\n    const bytes_failure_length = Uint8Array.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.serializeUint8)(bytes_failure.length));\n    const bytes_cancel = outcomeToBytes(cancel);\n    const bytes_cancel_length = Uint8Array.from((0,byteify__WEBPACK_IMPORTED_MODULE_2__.serializeUint8)(bytes_cancel.length));\n    return Uint8ArrayConcat([\n        bytes_header,\n        bytes_address,\n        bytes_employer,\n        bytes_contractor,\n        bytes_arbiter,\n        bytes_deposited_length,\n        bytes_deposited,\n        bytes_success_length,\n        bytes_success,\n        bytes_failure_length,\n        bytes_failure,\n        bytes_cancel_length,\n        bytes_cancel,\n        bytes_contract_text_length,\n        bytes_contract_text,\n    ]);\n}\nfunction bytesToPreimage(_bytes) {\n    // for now ignore the protocol version and format version and contract address...\n    const address = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(bs58__WEBPACK_IMPORTED_MODULE_1___default().encode(_bytes.slice(2, 42)));\n    let i = 2 + 40;\n    const employer = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(bs58__WEBPACK_IMPORTED_MODULE_1___default().encode(_bytes.slice(i, i + 40)));\n    i += 40;\n    const contractor = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(bs58__WEBPACK_IMPORTED_MODULE_1___default().encode(_bytes.slice(i, i + 40)));\n    i += 40;\n    const arbiter = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(bs58__WEBPACK_IMPORTED_MODULE_1___default().encode(_bytes.slice(i, i + 40)));\n    i += 40;\n    let length = 0;\n    length = (0,byteify__WEBPACK_IMPORTED_MODULE_2__.deserializeUint8)(Uint8ArrayToNumbers(_bytes.slice(i, i + 1)));\n    i += 1;\n    const outcome_deposited = bytesToOutcome(_bytes.slice(i, i + length));\n    i += length;\n    length = (0,byteify__WEBPACK_IMPORTED_MODULE_2__.deserializeUint8)(Uint8ArrayToNumbers(_bytes.slice(i, i + 1)));\n    i += 1;\n    const outcome_success = bytesToOutcome(_bytes.slice(i, i + length));\n    i += length;\n    length = (0,byteify__WEBPACK_IMPORTED_MODULE_2__.deserializeUint8)(Uint8ArrayToNumbers(_bytes.slice(i, i + 1)));\n    i += 1;\n    const outcome_failure = bytesToOutcome(_bytes.slice(i, i + length));\n    i += length;\n    length = (0,byteify__WEBPACK_IMPORTED_MODULE_2__.deserializeUint8)(Uint8ArrayToNumbers(_bytes.slice(i, i + 1)));\n    i += 1;\n    const outcome_cancel = bytesToOutcome(_bytes.slice(i, i + length));\n    i += length;\n    length = (0,byteify__WEBPACK_IMPORTED_MODULE_2__.deserializeUint8)(Uint8ArrayToNumbers(_bytes.slice(i, i + 1)));\n    i += 1;\n    const contract = Buffer.from(_bytes.slice(i, i + length)).toString();\n    return new Preimage({\n        contract: o1js__WEBPACK_IMPORTED_MODULE_0__.CircuitString.fromString(contract),\n        address: address,\n        employer: employer,\n        contractor: contractor,\n        arbiter: arbiter,\n        deposited: outcome_deposited,\n        success: outcome_success,\n        failure: outcome_failure,\n        cancel: outcome_cancel,\n    });\n}\nfunction fromMacPack(macpack) {\n    const _bytes = MacPackToBytes(macpack);\n    return bytesToPreimage(_bytes);\n}\nfunction toMacPack(mac_contract) {\n    const _bytes = preimageToBytes(mac_contract);\n    return bytesToMacPack(_bytes);\n}\nconst state_initial = 0;\nconst state_deposited = 1;\nconst state_canceled_early = 2;\nconst state_canceled = 3;\nconst state_succeeded = 4;\nconst state_failed = 5;\nclass Mac extends o1js__WEBPACK_IMPORTED_MODULE_0__.SmartContract {\n    constructor() {\n        super(...arguments);\n        this.commitment = (0,o1js__WEBPACK_IMPORTED_MODULE_0__.State)();\n        this.automaton_state = (0,o1js__WEBPACK_IMPORTED_MODULE_0__.State)();\n        this.memory = (0,o1js__WEBPACK_IMPORTED_MODULE_0__.State)();\n    }\n    deploy(args) {\n        super.deploy(args);\n        this.setPermissions({\n            ...o1js__WEBPACK_IMPORTED_MODULE_0__.Permissions.default(),\n            editState: o1js__WEBPACK_IMPORTED_MODULE_0__.Permissions.proof(),\n            send: o1js__WEBPACK_IMPORTED_MODULE_0__.Permissions.proof(),\n        });\n    }\n    initialize(commitment) {\n        this.commitment.set(commitment);\n        this.automaton_state.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(0));\n        this.memory.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(0));\n    }\n    deposit(contract_preimage, actor) {\n        const commitment = this.commitment.get();\n        this.commitment.assertEquals(commitment);\n        const automaton_state = this.automaton_state.get();\n        this.automaton_state.assertEquals(automaton_state);\n        const memory = this.memory.get();\n        this.memory.assertEquals(memory);\n        const blockchain_length = this.network.blockchainLength.get();\n        this.network.blockchainLength.assertEquals(blockchain_length);\n        // make sure this is the right contract by checking if\n        // the caller is in possession of the correct preimage\n        commitment.assertEquals(Preimage.hash(contract_preimage));\n        // check if the deposit deadline is respected\n        blockchain_length.assertGte(contract_preimage.deposited.start_after);\n        blockchain_length.assertLt(contract_preimage.deposited.finish_before);\n        // make sure the caller is a party in the contract\n        actor\n            .equals(contract_preimage.arbiter)\n            .or(actor.equals(contract_preimage.contractor))\n            .or(actor.equals(contract_preimage.employer))\n            .assertTrue();\n        // only someone who has not yet deposited can deposit\n        const actions = memory.toBits(3);\n        const acted = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.employer), actions[2], o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.contractor), actions[1], actions[0]));\n        const has_not_acted = acted.not();\n        has_not_acted.assertTrue();\n        // do the deposit\n        const amount = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.employer), contract_preimage.deposited.payment_employer, o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.contractor), contract_preimage.deposited.payment_contractor, o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.arbiter), contract_preimage.deposited.payment_arbiter, o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(0))));\n        // transfer the funds\n        const payerUpdate = o1js__WEBPACK_IMPORTED_MODULE_0__.AccountUpdate.create(actor);\n        payerUpdate.send({ to: this.address, amount: amount });\n        // update the memory\n        actions[2] = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.employer), (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Bool)(true), actions[2]);\n        actions[1] = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.contractor), (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Bool)(true), actions[1]);\n        actions[0] = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.arbiter), (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Bool)(true), actions[0]);\n        // check if everyone acted\n        const has_everyone_acted = actions[0].and(actions[1]).and(actions[2]);\n        // update the memory\n        const new_memory = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(has_everyone_acted, (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(0), o1js__WEBPACK_IMPORTED_MODULE_0__.Field.fromBits(actions));\n        this.memory.set(new_memory);\n        // update state\n        const new_state = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(has_everyone_acted, (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_deposited), (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_initial));\n        this.automaton_state.set(new_state);\n    }\n    withdraw(contract_preimage, actor) {\n        const commitment = this.commitment.get();\n        this.commitment.assertEquals(commitment);\n        const automaton_state = this.automaton_state.get();\n        this.automaton_state.assertEquals(automaton_state);\n        const memory = this.memory.get();\n        this.memory.assertEquals(memory);\n        // make sure this is the right contract by checking if\n        // the caller is in possession of the correct preimage\n        commitment.assertEquals(Preimage.hash(contract_preimage));\n        // make sure the caller is a party in the contract\n        actor\n            .equals(contract_preimage.arbiter)\n            .or(actor.equals(contract_preimage.contractor))\n            .or(actor.equals(contract_preimage.employer))\n            .assertTrue();\n        // check who has acted\n        const actions = memory.toBits(3);\n        const acted = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.employer), actions[2], o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.contractor), actions[1], o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.arbiter), actions[0], (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Bool)(false))));\n        const has_not_acted = acted.not();\n        // determine if it is allowed to withdraw at this stage\n        const is_state_canceled_early = automaton_state.equals((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_canceled_early));\n        const is_state_canceled = automaton_state.equals((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_canceled));\n        const is_state_succeeded = automaton_state.equals((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_succeeded));\n        const is_state_failed = automaton_state.equals((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_failed));\n        const withdraw_allowed = is_state_canceled_early\n            .and(acted)\n            .or(is_state_canceled.and(has_not_acted))\n            .or(is_state_succeeded.and(has_not_acted))\n            .or(is_state_failed.and(has_not_acted));\n        withdraw_allowed.assertTrue();\n        // determine the amount of the withdrawal\n        const current_outcome = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(is_state_canceled_early, contract_preimage.deposited, o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(is_state_canceled, contract_preimage.cancel, o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(is_state_succeeded, contract_preimage.success, contract_preimage.failure // only option left...\n        )));\n        const amount = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.employer), current_outcome.payment_employer, o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.contractor), current_outcome.payment_contractor, current_outcome.payment_arbiter // only option left...\n        ));\n        // do the withdrawal\n        this.send({ to: actor, amount: amount });\n        // update the memory\n        actions[2] = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.employer), actions[2].not(), actions[2]);\n        actions[1] = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.contractor), actions[1].not(), actions[1]);\n        actions[0] = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(actor.equals(contract_preimage.arbiter), actions[0].not(), actions[0]);\n        const new_memory = o1js__WEBPACK_IMPORTED_MODULE_0__.Field.fromBits(actions);\n        this.memory.set(new_memory);\n    }\n    success(contract_preimage, actor_pk) {\n        const commitment = this.commitment.get();\n        this.commitment.assertEquals(commitment);\n        const automaton_state = this.automaton_state.get();\n        this.automaton_state.assertEquals(automaton_state);\n        const blockchain_length = this.network.blockchainLength.get();\n        this.network.blockchainLength.assertEquals(blockchain_length);\n        // make sure this is the right contract by checking if\n        // the caller is in possession of the correct preimage\n        commitment.assertEquals(Preimage.hash(contract_preimage));\n        // check if the deposit deadline is respected\n        blockchain_length.assertGte(contract_preimage.success.start_after);\n        blockchain_length.assertLt(contract_preimage.success.finish_before);\n        // make sure the caller is a party in the contract\n        actor_pk\n            .equals(contract_preimage.arbiter)\n            .or(actor_pk.equals(contract_preimage.contractor))\n            .or(actor_pk.equals(contract_preimage.employer))\n            .assertTrue();\n        // make sure that the caller is approving this method\n        o1js__WEBPACK_IMPORTED_MODULE_0__.AccountUpdate.create(actor_pk).requireSignature();\n        // state must be deposited\n        automaton_state.assertEquals((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_deposited));\n        // ensure caller is the arbiter\n        actor_pk.equals(contract_preimage.arbiter).assertTrue();\n        // update the state to \"succeeded\"\n        this.automaton_state.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_succeeded));\n        // zero the memory for the withdrawals\n        this.memory.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(0));\n    }\n    failure(contract_preimage, actor_pk) {\n        const commitment = this.commitment.get();\n        this.commitment.assertEquals(commitment);\n        const automaton_state = this.automaton_state.get();\n        this.automaton_state.assertEquals(automaton_state);\n        const blockchain_length = this.network.blockchainLength.get();\n        this.network.blockchainLength.assertEquals(blockchain_length);\n        // make sure this is the right contract by checking if\n        // the caller is in possession of the correct preimage\n        commitment.assertEquals(Preimage.hash(contract_preimage));\n        // check if the deposit deadline is respected\n        blockchain_length.assertGte(contract_preimage.failure.start_after);\n        blockchain_length.assertLt(contract_preimage.failure.finish_before);\n        // make sure the caller is a party in the contract\n        actor_pk\n            .equals(contract_preimage.arbiter)\n            .or(actor_pk.equals(contract_preimage.contractor))\n            .or(actor_pk.equals(contract_preimage.employer))\n            .assertTrue();\n        // make sure that the caller is approving this method\n        o1js__WEBPACK_IMPORTED_MODULE_0__.AccountUpdate.create(actor_pk).requireSignature();\n        // state must be deposited\n        automaton_state.assertEquals((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_deposited));\n        // ensure caller is the arbiter\n        actor_pk.equals(contract_preimage.arbiter).assertTrue();\n        // update the state to \"canceled\"\n        this.automaton_state.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_failed));\n        // zero the memory for the withdrawals\n        this.memory.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(0));\n    }\n    cancel(contract_preimage, actor_pk) {\n        const commitment = this.commitment.get();\n        this.commitment.assertEquals(commitment);\n        const automaton_state = this.automaton_state.get();\n        this.automaton_state.assertEquals(automaton_state);\n        const memory = this.memory.get();\n        this.memory.assertEquals(memory);\n        const blockchain_length = this.network.blockchainLength.get();\n        this.network.blockchainLength.assertEquals(blockchain_length);\n        // make sure this is the right contract by checking if\n        // the caller is in possession of the correct preimage\n        commitment.assertEquals(Preimage.hash(contract_preimage));\n        // make sure the caller is a party in the contract\n        actor_pk\n            .equals(contract_preimage.arbiter)\n            .or(actor_pk.equals(contract_preimage.contractor))\n            .or(actor_pk.equals(contract_preimage.employer))\n            .assertTrue();\n        // make sure that the caller is approving this method\n        o1js__WEBPACK_IMPORTED_MODULE_0__.AccountUpdate.create(actor_pk).requireSignature();\n        // before deposit deadline anyone can cancel\n        const is_in_deposit = contract_preimage.deposited.start_after\n            .lte(blockchain_length)\n            .and(contract_preimage.deposited.finish_before.gt(blockchain_length))\n            .and(automaton_state.equals((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_initial)));\n        // after deposit deadline only the employee can cancel\n        const is_within_deadline = contract_preimage.success.start_after\n            .lte(blockchain_length)\n            .and(contract_preimage.success.finish_before.gt(blockchain_length))\n            .and(automaton_state.equals((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_deposited)));\n        // as for the deadline, it has to be either initial (for everyone)\n        // either deposited (for employee) in order to cancel\n        is_in_deposit.or(is_within_deadline).assertTrue();\n        // if it is after the initial stage, caller must be employee\n        const is_caller_correct = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(is_within_deadline, actor_pk.equals(contract_preimage.employer), (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Bool)(true));\n        is_caller_correct.assertTrue();\n        // update the state to \"canceled\" or \"canceled early\"\n        const next_state = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(is_within_deadline, (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_canceled), (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(state_canceled_early));\n        this.automaton_state.set(next_state);\n        // if canceled late then zero out the memory\n        const next_memory = o1js__WEBPACK_IMPORTED_MODULE_0__.Circuit.if(is_within_deadline, (0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(0), memory);\n        this.memory.set(next_memory);\n    }\n}\n__decorate([\n    (0,o1js__WEBPACK_IMPORTED_MODULE_0__.state)(o1js__WEBPACK_IMPORTED_MODULE_0__.Field),\n    __metadata(\"design:type\", Object)\n], Mac.prototype, \"commitment\", void 0);\n__decorate([\n    (0,o1js__WEBPACK_IMPORTED_MODULE_0__.state)(o1js__WEBPACK_IMPORTED_MODULE_0__.Field),\n    __metadata(\"design:type\", Object)\n], Mac.prototype, \"automaton_state\", void 0);\n__decorate([\n    (0,o1js__WEBPACK_IMPORTED_MODULE_0__.state)(o1js__WEBPACK_IMPORTED_MODULE_0__.Field),\n    __metadata(\"design:type\", Object)\n], Mac.prototype, \"memory\", void 0);\n__decorate([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [o1js__WEBPACK_IMPORTED_MODULE_0__.Field]),\n    __metadata(\"design:returntype\", void 0)\n], Mac.prototype, \"initialize\", null);\n__decorate([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Preimage, o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey]),\n    __metadata(\"design:returntype\", void 0)\n], Mac.prototype, \"deposit\", null);\n__decorate([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Preimage, o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey]),\n    __metadata(\"design:returntype\", void 0)\n], Mac.prototype, \"withdraw\", null);\n__decorate([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Preimage, o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey]),\n    __metadata(\"design:returntype\", void 0)\n], Mac.prototype, \"success\", null);\n__decorate([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Preimage, o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey]),\n    __metadata(\"design:returntype\", void 0)\n], Mac.prototype, \"failure\", null);\n__decorate([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Preimage, o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey]),\n    __metadata(\"design:returntype\", void 0)\n], Mac.prototype, \"cancel\", null);\nconst applicationState = {\n    Mac: null,\n    Outcome: null,\n    Preimage: null,\n    zkapp: null,\n    preimage: null,\n    transaction: null,\n    fromMacPack: typeof fromMacPack,\n    toMacPack: typeof toMacPack,\n    vKey: null\n};\n// ---------------------------------------------------------------------------------------\nconst functions = {\n    loadSnarkyJS: async (args) => {\n        await o1js__WEBPACK_IMPORTED_MODULE_0__.isReady;\n    },\n    setActiveInstanceToBerkeley: async (args) => {\n        const Berkeley = o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.BerkeleyQANet('https://proxy.berkeley.minaexplorer.com/graphql');\n        o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.setActiveInstance(Berkeley);\n    },\n    loadContract: async (args) => {\n        applicationState.Mac = Mac;\n        applicationState.Outcome = Outcome;\n        applicationState.Preimage = Preimage;\n        applicationState.fromMacPack = typeof fromMacPack;\n        applicationState.toMacPack = typeof toMacPack;\n    },\n    fetchBlockchainLength: async (args) => {\n        let block = await (0,o1js__WEBPACK_IMPORTED_MODULE_0__.fetchLastBlock)('https://proxy.berkeley.minaexplorer.com/graphql');\n        return block.blockchainLength.toJSON();\n    },\n    compileContract: async (args) => {\n        let { verificationKey } = await applicationState.Mac.compile();\n        applicationState.vKey = verificationKey;\n    },\n    fetchAccount: async (args) => {\n        const publicKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.publicKey58);\n        return await (0,o1js__WEBPACK_IMPORTED_MODULE_0__.fetchAccount)({ publicKey });\n    },\n    generatePrivateKey: async (args) => {\n        const privateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.random();\n        return privateKey.toBase58();\n    },\n    initZkappInstance: async (args) => {\n        const publicKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.publicKey58);\n        applicationState.zkapp = new applicationState.Mac(publicKey);\n    },\n    getBlockchainLength: async (args) => {\n        const network_state = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.getNetworkState();\n        return network_state.blockchainLength.toString();\n    },\n    createDeployTransaction: async (args) => {\n        const zkAppPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(args.privateKey58);\n        const deployerPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(args.deployerPrivateKey58);\n        let transactionFee = 100000000;\n        //const _commitment: Field = state.Preimage.hash(state.preimage);\n        let verificationKey = applicationState.vKey;\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction({ feePayerKey: deployerPrivateKey, fee: transactionFee }, () => {\n            o1js__WEBPACK_IMPORTED_MODULE_0__.AccountUpdate.fundNewAccount(deployerPrivateKey);\n            applicationState.zkapp.deploy({ zkappKey: zkAppPrivateKey, verificationKey });\n            //state.zkapp!.initialize(_commitment);\n        });\n        applicationState.transaction = transaction;\n    },\n    createInitTransaction: async (args) => {\n        const deployerPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(args.deployerPrivateKey58);\n        let transactionFee = 100000000;\n        const _commitment = applicationState.Preimage.hash(applicationState.preimage);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction({ feePayerKey: deployerPrivateKey, fee: transactionFee }, () => {\n            applicationState.zkapp.initialize(_commitment);\n        });\n        applicationState.transaction = transaction;\n    },\n    createDeployTransactionAuro: async (args) => {\n        const zkAppPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(args.privateKey58);\n        const _commitment = applicationState.Preimage.hash(applicationState.preimage);\n        let verificationKey = applicationState.vKey;\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction({ feePayerKey: zkAppPrivateKey, fee: 100000000 }, () => {\n            applicationState.zkapp.deploy({ zkappKey: zkAppPrivateKey, verificationKey });\n            applicationState.zkapp.initialize(_commitment);\n        });\n        applicationState.transaction = transaction;\n    },\n    sendTransaction: async (args) => {\n        const res = await applicationState.transaction.send();\n        const hash = await res.hash();\n        return JSON.stringify({\n            'hash': hash\n        });\n    },\n    sendTransactionSign: async (args) => {\n        const feePayerPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(args.deployerPrivateKey58);\n        applicationState.transaction.sign([feePayerPrivateKey]);\n        const res = await applicationState.transaction.send();\n        const hash = await res.hash();\n        return JSON.stringify({\n            'hash': hash\n        });\n    },\n    createDepositTransaction: async (args) => {\n        const feePayerPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(args.deployerPrivateKey58);\n        let transactionFee = 100000000;\n        const actor = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.actorPublicKey58);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction({ feePayerKey: feePayerPrivateKey, fee: transactionFee }, () => {\n            applicationState.zkapp.deposit(applicationState.preimage, actor);\n        });\n        applicationState.transaction = transaction;\n    },\n    createDepositTransactionAuro: async (args) => {\n        const actor = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.actorPublicKey58);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(() => {\n            applicationState.zkapp.deposit(applicationState.preimage, actor);\n        });\n        applicationState.transaction = transaction;\n    },\n    createWithdrawTransaction: async (args) => {\n        const feePayerPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(args.deployerPrivateKey58);\n        let transactionFee = 100000000;\n        const actor = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.actorPublicKey58);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction({ feePayerKey: feePayerPrivateKey, fee: transactionFee }, () => {\n            applicationState.zkapp.withdraw(applicationState.preimage, actor);\n        });\n        applicationState.transaction = transaction;\n    },\n    createWithdrawTransactionAuro: async (args) => {\n        const actor = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.publicKey58);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(() => {\n            applicationState.zkapp.withdraw(applicationState.preimage, actor);\n        });\n        applicationState.transaction = transaction;\n    },\n    createSuccessTransaction: async (args) => {\n        const feePayerPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(args.deployerPrivateKey58);\n        let transactionFee = 100000000;\n        const actor = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.actorPublicKey58);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction({ feePayerKey: feePayerPrivateKey, fee: transactionFee }, () => {\n            applicationState.zkapp.success(applicationState.preimage, actor);\n        });\n        applicationState.transaction = transaction;\n    },\n    createSuccessTransactionAuro: async (args) => {\n        const actor = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.publicKey58);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(() => {\n            applicationState.zkapp.success(applicationState.preimage, actor);\n        });\n        applicationState.transaction = transaction;\n    },\n    createFailureTransaction: async (args) => {\n        const feePayerPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(args.deployerPrivateKey58);\n        let transactionFee = 100000000;\n        const actor = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.actorPublicKey58);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction({ feePayerKey: feePayerPrivateKey, fee: transactionFee }, () => {\n            applicationState.zkapp.failure(applicationState.preimage, actor);\n        });\n        applicationState.transaction = transaction;\n    },\n    createFailureTransactionAuro: async (args) => {\n        const actor = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.publicKey58);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(() => {\n            applicationState.zkapp.failure(applicationState.preimage, actor);\n        });\n        applicationState.transaction = transaction;\n    },\n    createCancelTransaction: async (args) => {\n        const feePayerPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(args.deployerPrivateKey58);\n        let transactionFee = 100000000;\n        const actor = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.actorPublicKey58);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction({ feePayerKey: feePayerPrivateKey, fee: transactionFee }, () => {\n            applicationState.zkapp.cancel(applicationState.preimage, actor);\n        });\n        applicationState.transaction = transaction;\n    },\n    createCancelTransactionAuro: async (args) => {\n        const actor = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.publicKey58);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(() => {\n            applicationState.zkapp.cancel(applicationState.preimage, actor);\n        });\n        applicationState.transaction = transaction;\n    },\n    getContractState: async (args) => {\n        const automaton_state = await applicationState.zkapp.automaton_state.get();\n        const memory = await applicationState.zkapp.memory.get();\n        const actions = memory.toBits(3);\n        let st = 'initial';\n        switch (parseInt(automaton_state.toString())) {\n            case 0:\n                st = 'initial';\n                break;\n            case 1:\n                st = 'deposited';\n                break;\n            case 2:\n                st = 'canceled_early';\n                break;\n            case 3:\n                st = 'canceled';\n                break;\n            case 4:\n                st = 'succeeded';\n                break;\n            case 5:\n                st = 'failed';\n                break;\n            default:\n                st = 'unknown';\n                break;\n        }\n        return JSON.stringify({\n            'acted': {\n                'employer': actions[2].toBoolean(),\n                'contractor': actions[1].toBoolean(),\n                'arbiter': actions[0].toBoolean()\n            },\n            'automaton_state': st\n        });\n    },\n    fromMacPack: (args) => {\n        applicationState.preimage = applicationState.fromMacPack(args.macpack);\n    },\n    toMacPack: (args) => {\n        return applicationState.toMacPack(applicationState.preimage);\n    },\n    getPreimageData: (args) => {\n        return JSON.stringify({\n            address: applicationState.preimage.address.toBase58(),\n            employer: applicationState.preimage.employer.toBase58(),\n            contractor: applicationState.preimage.contractor.toBase58(),\n            arbiter: applicationState.preimage.arbiter.toBase58(),\n            contract_description: applicationState.preimage.contract.toString(),\n            contract_outcome_deposit_description: applicationState.preimage.deposited.description.toString(),\n            contract_outcome_deposit_after: parseInt(applicationState.preimage.deposited.start_after.toString()),\n            contract_outcome_deposit_before: parseInt(applicationState.preimage.deposited.finish_before.toString()),\n            contract_outcome_deposit_employer: parseInt(applicationState.preimage.deposited.payment_employer.toString()),\n            contract_outcome_deposit_contractor: parseInt(applicationState.preimage.deposited.payment_contractor.toString()),\n            contract_outcome_deposit_arbiter: parseInt(applicationState.preimage.deposited.payment_arbiter.toString()),\n            contract_outcome_success_description: applicationState.preimage.success.description.toString(),\n            contract_outcome_success_after: parseInt(applicationState.preimage.success.start_after.toString()),\n            contract_outcome_success_before: parseInt(applicationState.preimage.success.finish_before.toString()),\n            contract_outcome_success_employer: parseInt(applicationState.preimage.success.payment_employer.toString()),\n            contract_outcome_success_contractor: parseInt(applicationState.preimage.success.payment_contractor.toString()),\n            contract_outcome_success_arbiter: parseInt(applicationState.preimage.success.payment_arbiter.toString()),\n            contract_outcome_failure_description: applicationState.preimage.failure.description.toString(),\n            contract_outcome_failure_after: parseInt(applicationState.preimage.failure.start_after.toString()),\n            contract_outcome_failure_before: parseInt(applicationState.preimage.failure.finish_before.toString()),\n            contract_outcome_failure_employer: parseInt(applicationState.preimage.failure.payment_employer.toString()),\n            contract_outcome_failure_contractor: parseInt(applicationState.preimage.failure.payment_contractor.toString()),\n            contract_outcome_failure_arbiter: parseInt(applicationState.preimage.failure.payment_arbiter.toString()),\n            contract_outcome_cancel_description: applicationState.preimage.cancel.description.toString(),\n            contract_outcome_cancel_after: parseInt(applicationState.preimage.cancel.start_after.toString()),\n            contract_outcome_cancel_before: parseInt(applicationState.preimage.cancel.finish_before.toString()),\n            contract_outcome_cancel_employer: parseInt(applicationState.preimage.cancel.payment_employer.toString()),\n            contract_outcome_cancel_contractor: parseInt(applicationState.preimage.cancel.payment_contractor.toString()),\n            contract_outcome_cancel_arbiter: parseInt(applicationState.preimage.cancel.payment_arbiter.toString())\n        });\n    },\n    definePreimage: (args) => {\n        const outcome_deposited = new applicationState.Outcome({\n            description: o1js__WEBPACK_IMPORTED_MODULE_0__.CircuitString.fromString(args.contract_outcome_deposit_description),\n            payment_employer: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_deposit_employer),\n            payment_contractor: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_deposit_contractor),\n            payment_arbiter: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_deposit_arbiter),\n            start_after: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32.from(args.contract_outcome_deposit_after),\n            finish_before: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32.from(args.contract_outcome_deposit_before)\n        });\n        const outcome_success = new applicationState.Outcome({\n            description: o1js__WEBPACK_IMPORTED_MODULE_0__.CircuitString.fromString(args.contract_outcome_success_description),\n            payment_employer: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_success_employer),\n            payment_contractor: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_success_contractor),\n            payment_arbiter: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_success_arbiter),\n            start_after: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32.from(args.contract_outcome_success_after),\n            finish_before: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32.from(args.contract_outcome_success_before)\n        });\n        const outcome_failure = new applicationState.Outcome({\n            description: o1js__WEBPACK_IMPORTED_MODULE_0__.CircuitString.fromString(args.contract_outcome_failure_description),\n            payment_employer: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_failure_employer),\n            payment_contractor: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_failure_contractor),\n            payment_arbiter: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_failure_arbiter),\n            start_after: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32.from(args.contract_outcome_failure_after),\n            finish_before: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32.from(args.contract_outcome_failure_before)\n        });\n        const outcome_cancel = new applicationState.Outcome({\n            description: o1js__WEBPACK_IMPORTED_MODULE_0__.CircuitString.fromString(args.contract_outcome_cancel_description),\n            payment_employer: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_cancel_employer),\n            payment_contractor: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_cancel_contractor),\n            payment_arbiter: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(args.contract_outcome_cancel_arbiter),\n            start_after: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32.from(args.contract_outcome_cancel_after),\n            finish_before: o1js__WEBPACK_IMPORTED_MODULE_0__.UInt32.from(args.contract_outcome_cancel_before)\n        });\n        applicationState.preimage = new applicationState.Preimage({\n            contract: o1js__WEBPACK_IMPORTED_MODULE_0__.CircuitString.fromString(args.contract_description),\n            address: o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.address),\n            employer: o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.employer),\n            contractor: o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.contractor),\n            arbiter: o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.arbiter),\n            deposited: outcome_deposited,\n            success: outcome_success,\n            failure: outcome_failure,\n            cancel: outcome_cancel\n        });\n    },\n    proveTransaction: async (args) => {\n        await applicationState.transaction.prove();\n    },\n    getTransactionJSON: async (args) => {\n        return applicationState.transaction.toJSON();\n    },\n};\nself.addEventListener('message', async (event) => {\n    const returnData = await functions[event.data.fn](event.data.args);\n    const message = {\n        id: event.data.id,\n        data: returnData,\n    };\n    postMessage(message);\n});\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://$/./src/zkappWorker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_bs58_index_js-node_modules_byteify_bundled_esm_index_esm_js-node_modules-f2beb1"], () => (__webpack_require__("./src/zkappWorker.ts")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".index_bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"src_zkappWorker_ts": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk$"] = self["webpackChunk$"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return __webpack_require__.e("vendors-node_modules_bs58_index_js-node_modules_byteify_bundled_esm_index_esm_js-node_modules-f2beb1").then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});