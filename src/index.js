import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import Home from "./component/Home.js";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import { Redirect,Switch } from "react-router";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ToDo from "./redux/reducers/reducer";

let store = createStore(ToDo);

class App extends Component {
  render() {
    return (
    	<Switch>
	      <Route path="/home" component={Home}></Route>
	      <Redirect to="/home/recommondMusic"/>
      	</Switch>
    );
  }
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App></App>
		</Router>
	</Provider>	
	, document.getElementById('root'));
registerServiceWorker();
