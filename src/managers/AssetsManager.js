import BaseAssetsManager from 'common/managers/BaseAssetsManager';


export default class AssetsManager extends BaseAssetsManager {
    
    constructor() {
        super();
        console.log("AssetsManager");
    }
   
    preloadCommon(locale, callBack) {
    
        this.preloader.show();
        var self = this;
        
        this.commonLoader
            .add("locale", "res/locale/lang_" + locale.toUpperCase() + ".json")
            .add("soundOn", "res/img/soundOn.png")
            .add("soundOff", "res/img/soundOff.png")
            .add("full", "res/img/full.png")
            .add("fullExit", "res/img/fullExit.png")
            //sounds
            .add("background", "res/sounds/background_menu.mp3")
            .on("progress", function(loader, resource){
                self.preloader.progressHandler(loader.progress);
            })
            .load(function() {
                callBack();
                self.preloader.remove();
            });
    }



    
}

