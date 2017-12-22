"use strict";
console.log("preload setup");
window["__play"] = () => {
    let play = document.getElementsByClassName("play-song playPause");
    if (play && play.length > 0) {
        (play[0]).click();
    }
};
window["__next"] = () => {
    let play = document.getElementsByClassName("next-song next");
    if (play && play.length > 0) {
        (play[0]).click();
    }
};
window["__prev"] = () => {
    let play = document.getElementsByClassName("prev-song previous");
    if (play && play.length > 0) {
        (play[0]).click();
    }
};
//# sourceMappingURL=preload.js.map