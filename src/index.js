import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import Home from "./component/Home.js";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import { Redirect,Switch } from "react-router";

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
	<Router>
		<App></App>
	</Router>	
	, document.getElementById('root'));
registerServiceWorker();
