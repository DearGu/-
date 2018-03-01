import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";
import ToDo from "./redux/reducers/reducer";
import App from "./component/app";

let store = createStore(ToDo);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App></App>
		</Router>
	</Provider>	
	, document.getElementById('root'));
registerServiceWorker();
