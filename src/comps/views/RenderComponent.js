import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Pixi from 'pixi.js';


var GameView = require('../../render/views/GameView.js');



class RenderComponent extends Component {


    constructor( props ) { 
        super(props);
    }

    componentWillReceiveProps(nextProps) {
       

    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    componentDidMount() {
        //console.log("ChooseRingView#componentDidMount");
        PIXI.settings.PRECISION_FRAGMENT = 'highp';

        this.renderer = PIXI.autoDetectRenderer(845, 451, { antialias: false, transparent: true });
        //this.renderer = new PIXI.CanvasRenderer(845, 451, { antialias: false, transparent: true });
        this.gameCanvas.appendChild(this.renderer.view);
        this.context.assets.setRender(this.renderer);

        this.renderer.roundPixels = true;
            
        this.stage = new PIXI.Container();
        
        var self = this;

        this.game = new GameView(this.context.assets, this.context.consts, this.context.sounds);
        this.stage.addChild(this.game);
        this.animate = this.animate.bind(this);
        this.animate();
    }

    componentWillUnmount() {
        //здесь все чистим!
        console.log("Game#componentWillUnmount");
        this.game.destroy({ children: true, texture: false, baseTexture: false });
        this.stage.destroy({ children: true, texture: false, baseTexture: false });
        this.gameCanvas.removeChild(this.renderer.view);
        this.game.clearResources();
        this.game = null;
        this.renderer.destroy(true);
        this.renderer = null;
        this.gameCanvas = null;
        this.animate = null;
    }

   

    animate() {
        window.stats.begin();
        if(!this || !this.renderer) return;
        this.renderer.render(this.stage);
        window.stats.end();
        requestAnimationFrame(this.animate);
    }


    render() {
       
        return (
            <div>
                <div id="render" ref={(gameCanvas) => { this.gameCanvas = gameCanvas; }} ></div>
            </div>
        );
    }

}

RenderComponent.childContextTypes = {
  assets: React.PropTypes.object,
  consts: React.PropTypes.object,
  sounds: React.PropTypes.object
};

RenderComponent.contextTypes = {
  assets: React.PropTypes.object,
  consts: React.PropTypes.object,
  sounds: React.PropTypes.object
};

function mapStateToProps(state) {
   
    return {  };
}

function mapDispatchToProps(dispatch) {
    var actions = {};
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderComponent);