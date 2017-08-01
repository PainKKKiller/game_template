import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {  } from '../actions';

import BlankPage from 'common/comps/views/BlankPage';
import ChooseBetSubject from 'comps/views/ChooseBetSubject';

import RenderComponent from 'comps/views/RenderComponent';

import Overlay from 'common/comps/Overlay';

import GlobalConstants from 'common/utils/GlobalConstants';

import { Router as Router2, browserHistory, Redirect } from 'react-router';

import keyboardjs from 'keyboardjs';

import BaseApp from 'common/comps/BaseApp';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from 'react-router-dom';



function RedirectRoute ({component: Component, redirectTo, ...rest}) {
  console.log("RedirectRoute " + redirectTo +  " " + (redirectTo == "/"));

  return (
    <Route
      {...rest}
      render={(props) => redirectTo == "/"
        ? <Component {...props} />
        : <Redirect to={{ pathname: redirectTo, state: {from: props.location}}} />}
    />
  )
}


 class App extends BaseApp {

  constructor(props) {
    super(props);

    this.state = { redirectTo: "/bets" };

    window.stats = new Stats();
    window.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(window.stats.dom);
  }
 



  render() {
 
    return (

      <div id='game-container' width="1126" height="634">
        <div>
        <Switch>
          <RedirectRoute redirectTo={ this.state.redirectTo } exact path="/" component={ BlankPage }/>
          <Route path="/bets" component={ ChooseBetSubject }/>
          <Route path="/render" component={ RenderComponent }/>
        </Switch>
        </div>
        <Overlay/>
      </div>
    );
  }
}


function mapStateToProps(state) {
    console.log("app#mapStateToProps");
    return { session:  state.session };
}

function mapDispatchToProps(dispatch) {
    var actions = {};
    return bindActionCreators(actions, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));