import React,{ Component } from 'react';
import Home from "./Home.js";
import ArtList from "./artMsg/artList";
import { Route } from 'react-router-dom';
import { Redirect,Switch } from "react-router";
import PlaySong from "./playSong/playSong";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
    	<div>
	    	<Switch>
		      <Route path="/home" component={Home}></Route>
		      <Route path="/artList/:id" component={ArtList}></Route>
		      <Redirect to="/home/recommondMusic"/>
	      </Switch>
        {
            this.props.appState.isOpenPlayer? <PlaySong></PlaySong>:""
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appState:state
  }
}

export default connect(mapStateToProps,undefined,undefined,{pure:false})(App);