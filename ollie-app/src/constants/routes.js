import asyncComponent from './modules/AsyncComponents';
import Pricing from '../components/views/pricing';

const routes = {
	REGISTER: {
		path: '/',
		component: asyncComponent(() => import('../components/views/pricing')),
	},
};
export default routes;
