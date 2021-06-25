import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Add from './pages/Add';
import View from './pages/View';
import ViewPoll from './pages/ViewPoll';

const App = () => {

	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet id="main">
					<Route path="/" exact={true}>
						<Redirect to="/page/view" />
					</Route>

					<Route path="/page/view" exact={ true }>
						<View />
					</Route>

					<Route path="/page/view/:id" exact={ true }>
						<ViewPoll />
					</Route>

					<Route path="/page/add" exact={ true }>
						<Add />
					</Route>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;