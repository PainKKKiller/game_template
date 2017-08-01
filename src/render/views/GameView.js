import { appStore } from './../../index';



function GameView(assets, consts, sounds) {
    PIXI.Container.call(this);

    window.assets = assets;
    window.consts = consts;
    window.sounds = sounds;

    // create a text object with a nice stroke
    var txt = new PIXI.Text('Game View Render!', { fontFamily: 'Arial', fontSize: '65px', fontWeight: 'bold', fill: '#cc00ff', align: 'center', stroke: '#FFFFFF', strokeThickness: 6 });

    // setting the anchor point to 0.5 will center align the text... great for spinning!
    txt.anchor.set(0.5);
    txt.position.x = 310;
    txt.position.y = 200;

    this.addChild(txt);
    
    sounds.playSound("background", true);
   
}

GameView.prototype = Object.create(PIXI.Container.prototype);

GameView.prototype.clearResources = function() {
     sounds.stopSound("background", true);
}

module.exports = GameView;
