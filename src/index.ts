import { runTutorial2 } from './tutorial2/run';
import { runTutorialGql } from './tutorial-gql/run';
import { runTutorial3 } from './tutorial3/run';
import { gql2deploy, gql2DeployMultipleAccounts, gql2update, gql2UpdateMultipleAccounts } from './tutorial-gql2/run';
import { gql3 } from './tutorial-gql3/run';
import { deployZkApp, gql4, updateZkApp, gql4Update } from './tutorial-gql4/run';
import { zkRollup } from './zk-rollup/zk-rollup';

// document.getElementById('tutorial2').onclick = () => runTutorial2();
// document.getElementById('tutorial3').onclick = () => runTutorial3();
// document.getElementById('tutorialgql').onclick = () => runTutorialGql();
// document.getElementById('gql2deploy').onclick = () => gql2deploy();
// document.getElementById('gql2update').onclick = () => gql2update();
// document.getElementById('gql2deployMultiple').onclick = () => gql2DeployMultipleAccounts();
// document.getElementById('gql2updateMultiple').onclick = () => gql2UpdateMultipleAccounts();
// document.getElementById('gql3').onclick = () => gql3();
// document.getElementById('gql4').onclick = () => gql4();
// document.getElementById('gql4Update').onclick = () => gql4Update();
// document.getElementById('zkrollup').onclick = () => zkRollup();

export {
	deployZkApp,
	updateZkApp,
};