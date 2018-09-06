import './styles.scss';
import * as Constants from './constants';
import * as utils from './utils';

const app = () => {
    console.log(`app running!!! ${Constants.NAMESPACE}`);
    console.log(utils.square(4));
};

window.app = app;
