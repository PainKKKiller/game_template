import React, { Component } from 'react';
import { postPlatform, prepareLeaveApp } from 'common/utils/SiteHelper';

import './chooseBetSubject.css';


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


export default class ChooseBetSubject extends Component {

  constructor(props) {
    super(props);
    console.log("ChooseBetSubject");
  }

  componentDidMount() {
      window.top.postMessage(this.context.assets.getLocaleString("general", "platformChoice"), "*");
  }

  stopPariHandler(e) {
      console.log("stop pari");
      prepareLeaveApp();
      window.location.replace(window.returnTo + "?lang=" + window.lang + "&token=" + window.token + "&relogin=1");

  }

  chooseSubjectHandler(e) {
      if (e && e.currentTarget) {
          console.log(e.currentTarget.className);
          if(e.currentTarget.className == "aircraft") {
              this.context.consts.betSubject = 'FLIGHT';
          } else if(e.currentTarget.className == "weather") {
              this.context.consts.betSubject = 'WEATHER';
          }
          postPlatform(this);
      }
      console.log("chooseSubjectHandler: ");
  }

  render() {
    console.log(this.context);

    return (
      <div className="chooseBetSubject">
        <Link to="/render"><div onClick={this.chooseSubjectHandler.bind(this)} className="aircraft">
            <p className="chooseBetSubject-txt">{ this.context.assets.getLocaleString("buttons", "aero") }</p>
        </div></Link>
        <Link to="/render"><div onClick={this.chooseSubjectHandler.bind(this)} className="weather">
            <p className="chooseBetSubject-txt">{ this.context.assets.getLocaleString("buttons", "WEATHER") }</p>
        </div></Link>
        <button onClick={this.stopPariHandler.bind(this)} className="btnBigRed">{ this.context.assets.getLocaleString("buttons", "changePlatform") }</button>
      </div>
    );
  }
}

ChooseBetSubject.contextTypes = {
  assets: React.PropTypes.object,
  consts: React.PropTypes.object
};


