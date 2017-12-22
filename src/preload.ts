console.log("preload setup");

window["__play"] = () => {
    let play = document.getElementsByClassName("play-song playPause")
    if (play && play.length > 0) {
        (play[0]).click();
    }
};

window["__next"] = () => {
    let play = document.getElementsByClassName("next-song next")
    if (play && play.length > 0) {
        (play[0]).click();
    }
};

window["__prev"] = () => {
    let play = document.getElementsByClassName("prev-song previous")
    if (play && play.length > 0) {
        (play[0]).click();
    }
};

// navigator.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36";