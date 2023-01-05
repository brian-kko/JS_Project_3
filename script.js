function initialize() {
    playerRock = document.getElementById("playerRock");
    playerPaper = document.getElementById("playerPaper");
    playerScissor = document.getElementById("playerScissor");
    enemyRock = document.getElementById("enemyRock");
    enemyPaper = document.getElementById("enemyPaper");
    enemyScissor = document.getElementById("enemyScissor");

    pArsenal = [5, 5, 5];
    eArsenal = [5, 5, 5];

    tieCount = 0;

    if (tieCount == 3) tieBreaker();

    logBox = document.getElementById("logBox");
    log = "Log --";

    display();
}

function display() {
    playerRock.innerHTML = pArsenal[0] + " Rock(s)";
    playerPaper.innerHTML = pArsenal[1] + " Paper(s)";
    playerScissor.innerHTML = pArsenal[2] + " Scissor(s)";

    enemyRock.innerHTML = eArsenal[0] + " Rock(s)";
    enemyPaper.innerHTML = eArsenal[1] + " Paper(s)";
    enemyScissor.innerHTML = eArsenal[2] + " Scissor(s)";

    logBox.innerHTML = log;
}

function roll(type) {
    if ((pArsenal[0] > 0 || pArsenal[1] > 0 || pArsenal[2] > 0) && (eArsenal[0] > 0 || eArsenal[1] > 0 || eArsenal[2] > 0)) {
        if (type == 0 && pArsenal[0] > 0) {
            console.log(rndNum);
            if (rndNum() == 0) {
                tieCount++;
                log += "<br />" + "Tie!";
            }
            if (rndNum() == 1) {
                tieCount = 0;
                log += "<br />" + "Paper beats Rock!";
                pArsenal[0] = pArsenal[0] - 1;
                eArsenal[0] = eArsenal[0] + 1;
            }
            if (rndNum() == 2) {
                tieCount = 0;
                log += "<br />" + "Rock beats Scissor!";
                pArsenal[2] = pArsenal[2] + 1;
                eArsenal[2] = eArsenal[2] - 1;
            }
            changeImage(0,rndNum());
        }
        // else if (pArsenal[0] == 0) log += "<br />" + "No more rocks :(";

        if (type == 1 && pArsenal[1] > 0) {
            if (rndNum() == 0) {
                tieCount = 0;
                log += "<br />" + "Paper beats Rock!";
                pArsenal[0] = pArsenal[0] + 1;
                eArsenal[0] = eArsenal[0] - 1;
            }
            if (rndNum() == 1) {
                tieCount++;
                log += "<br />" + "Tie!";
            }
            if (rndNum() == 2) {
                tieCount = 0;
                log += "<br />" + "Scissors beats Paper!";
                pArsenal[1] = pArsenal[1] - 1;
                eArsenal[1] = eArsenal[1] + 1;
            }
            changeImage(1,rndNum());
        }
        // else if (pArsenal[1] == 0) log += "<br />" + "No more paper :(";

        if (type == 2 && pArsenal[2] > 0) {
            if (rndNum() == 0) {
                tieCount = 0;
                log += "<br />" + "Rock beats Scissor!";
                pArsenal[2] = pArsenal[2] - 1;
                eArsenal[2] = eArsenal[2] + 1;
            }
            if (rndNum() == 1) {
                tieCount = 0;
                log += "<br />" + "Scissors beats Paper!";
                pArsenal[1] = pArsenal[1] + 1;
                eArsenal[1] = eArsenal[1] - 1;
            }
            if (rndNum() == 2) {
                tieCount++;
                log += "<br />" + "Tie!";
            }
            changeImage(2,rndNum());
        }
        // else if (pArsenal[2] == 0) log += "<br />" + "No more scissors :(";
    }
    else log += "<br />" + "Game has already ended!";

    display();
}

function rndNum() {
    if (eArsenal[0] == 0) return getRandomInteger(1, 2);
    else if (eArsenal[1] == 0) {
        if (getRandomInteger(1, 2) == 1) return 0;
        else return 2;
    }
    else if (eArsenal[2] == 0) return getRandomInteger(0, 1);
    else return getRandomInteger(0, 2);
}

function getRandomInteger(lower, upper) {
    var mulitplier = upper - (lower - 1);
    var rnd = parseInt(Math.random() * mulitplier) + lower;
    return rnd;
}

function tieBreaker() {
    tieCount = 0;
    if (pArsenal[0] == 0) pArsenal[getRandomInteger(1, 2)] = pArsenal[getRandomInteger(1, 2)] - 1;
    else if (pArsenal[1] == 0) {
        if (getRandomInteger(1, 2) == 1) pArsenal[0] = pArsenal[0] - 1;
        else pArsenal[2] = pArsenal[2] - 1;
    }
    else if (eArsenal[2] == 0) pArsenal[getRandomInteger(0, 1)] = pArsenal[getRandomInteger(0, 1)] - 1;
    else pArsenal[getRandomInteger(0, 2)] = pArsenal[getRandomInteger(0, 2)] - 1;

    if (eArsenal[0] == 0) eArsenal[getRandomInteger(1, 2)] = eArsenal[getRandomInteger(1, 2)] - 1;
    else if (eArsenal[1] == 0) {
        if (getRandomInteger(1, 2) == 1) eArsenal[0] = eArsenal[0] - 1;
        else eArsenal[2] = eArsenal[2] - 1;
    }
    else if (eArsenal[2] == 0) eArsenal[getRandomInteger(0, 1)] = eArsenal[getRandomInteger(0, 1)] - 1;
    else eArsenal[getRandomInteger(0, 2)] = eArsenal[getRandomInteger(0, 2)] - 1;

    log += "<br />" + "Tiebreaker: Both lose one weapon!";
    display();
}

function changeImage(player, enemy) {
    var a = "";
    if(player==0) a = "rock";
    else if(player==1) a = "paper";
    else a = "scissor";

    var b = "";
    if(enemy==0) b = "rock";
    else if(enemy==1) b = "paper";
    else b = "scissor";

    document.getElementById('playerImg').src = a + '.jpg';
    document.getElementById('enemyImg').src = b + '.jpg'; 
}