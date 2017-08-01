require('es6-promise').polyfill();
import axios from 'axios';

import { appStore } from '../index';

var errorWindow = require('common/comps/modals/ErrorWindow.js');

export const FETCH_INITIAL_SESSION = 'FETCH_INITIAL_SESSION';

export const REQ_HAS_ERRORED = 'REQ_HAS_ERRORED';
export const REQ_IS_LOADING = 'REQ_IS_LOADING';
export const REQ_DATA_SUCCESS = 'REQ_DATA_SUCCESS';



var Preloader = require('common/comps/Preloader.js'),
    preloader = new Preloader();


export function requestErrorHandler(error, errorHandler, btnText){
     console.log(error);
     btnText = btnText || "пробовать снова";
     errorWindow.show(error, function(e){
        console.log("errorWindow clicked!");
        errorWindow.closeWindow();
        errorHandler();
    }, btnText);
}

function refreshPage() {
    window.top.postMessage("", "*");
    window.location.replace(window.returnTo + "?lang=" + window.lang);
}

function statusErrorChecker(statusCode, statusText) {
    if(status == 403) {
        requestErrorHandler("Ваша сессия просрочена, пожалуйста залогиньтесь снова", refreshPage, "перелогиниться");
    } else {
        requestErrorHandler(statusCode + " " + statusText, refreshPage, 'обновить страницу');
    }
}

function error200Checker(errorsArray) {
    if(errorsArray[0] && errorsArray[0].code && errorsArray[0].code == "balance.notEnoughCredits") {
        requestErrorHandler(window.assets.getLocaleString("balance", "notEnoughCredits"), fillBalance, window.assets.getLocaleString("balance", "refreshBalance"));
    } else {
         var errStr = '';
         for (var i = 0; i < errorsArray.length; i++) {
             errStr = window.assets.getLocaleString("errors", errorsArray[i].code, { PARAM: errorsArray[i].args }) + "  ";
         }
         requestErrorHandler(errStr, refreshPage, 'обновить страницу');
    }
}


