
function setScores(scores){
    window.localStorage.setItem("scores", JSON.stringify(scores));
}


function getScores(scores){
    return JSON.parse(window.localStorage.getItem("scores"));
}

