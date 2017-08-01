import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import App from './comps/App';
import reducers from './reducers';

import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';

import urlParse from 'common/utils/urlParse';

import AssetsManager from 'managers/AssetsManager.js';


var SoundManager = require('common/managers/SoundManager.js');

var assets = new AssetsManager();
var sounds = new SoundManager(assets);

window.assets = assets;

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const appStore = createStoreWithMiddleware(reducers);


window.version = "1.0.0";
console.log("version = " + window.version);

var qs = urlParse(window.location.search.substr(1).split('&'));

console.log("locale = " + qs['locale']);
console.log("token = " + qs['token']);
console.log("returnTo = " + qs['returnTo']);
window.token = qs['token'];

var locale;
if(!locale)
  locale = "ru";
else
  locale = qs['locale'].toLowerCase();

if(locale != "ru" && locale != "en")
  window.lang = "en";
else
  window.lang = locale;

//window.lang = "ru"; //заглушка если надо захардкодить язык

window.returnTo = qs['returnTo'];

try {
    localStorage.setItem('token', qs['token']);
} catch (e) {
    console.log("Safari in private browsing mode?");
}

assets.preloadCommon(window.lang, function() {
  console.log("preloading common complete!");
  ReactDOM.render(
  <Provider store={ appStore }>
    <HashRouter>
      <App assets={ assets } token={ qs['token']} sounds={ sounds } />
    </HashRouter>
  </Provider>
  , document.querySelector('.game-wrapper'));
});
