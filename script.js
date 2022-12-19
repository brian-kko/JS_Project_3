function randNum(min, max) {
    var mulitplier = max - (min - 1);
    var rnd = parseInt(Math.random() * mulitplier) + min;
    return rnd;
}

function initialize() {
    playerStr = document.getElementById("playerStr");
    playerCng = document.getElementById("playerCng");
    playerSpd = document.getElementById("playerSpd");
    playerFtg = document.getElementById("playerFtg");
    enemyStr = document.getElementById("enemyStr");
    enemyCng = document.getElementById("enemyCng");
    enemySpd = document.getElementById("enemySpd");
    enemyFtg = document.getElementById("enemyFtg");

    playerLog = document.getElementById("logs");
    enemyLog = document.getElementById("logs");

    player = { str: 6, cng: 6, spd: 6, ftg: 30, maxFtg: 30, prevFtg: 30, atk: 0, def: 0, state: "", dead: "n", log: "" };
    enemy = { str: 6, cng: 6, spd: 6, ftg: 30, maxFtg: 30, prevFtg: 30, atk: 0, def: 0, state: "", dead: "n", log: "" };


    randomizeStats();
}

function display() {
    playerStr.innerHTML = "Strength: " + player.str;
    playerCng.innerHTML = "Cunning: " + player.cng;
    playerSpd.innerHTML = "Speed: " + player.spd;
    playerFtg.innerHTML = "Fatigue: " + player.ftg;
    enemyStr.innerHTML = "Strength: " + enemy.str;
    enemyCng.innerHTML = "Cunning: " + enemy.cng;
    enemySpd.innerHTML = "Speed: " + enemy.spd;
    enemyFtg.innerHTML = "Fatigue: " + enemy.ftg;
    playerLog.innerHTML = player.log;
    enemyLog.innerHTML = enemy.log;
    if (player.ftg >= (enemy.ftg * 2) || enemy.ftg < 0) {
        document.getElementById("finisher").style.display = "block";
    }
    else {
        document.getElementById("finisher").style.display = "none";
    }
}

function randomizeStats() {
    array1 = [1, 2, 3, 4]
    for (i = 0; i < 2; i++) {
        let index = Math.floor(Math.random() * (array1.length))
        if (array1[index] === 1) {
            player.str += Math.floor(Math.random() * 2);
            array1.splice(index, 1);
        }
        else if (array1[index] === 2) {
            player.cng += Math.floor(Math.random() * 2);
            array1.splice(index, 1);
        }
        else if (array1[index] === 3) {
            player.spd += Math.floor(Math.random() * 2);
            array1.splice(index, 1);
        }
        else if (array1[index] === 4) {
            player.ftg += Math.floor(Math.random() * 7);
            array1.splice(index, 1);
        }
    }

    if (array1[0] === 1) {
        player.str += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array1[0] === 2) {
        player.cng += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array1[0] === 3) {
        player.spd += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array1[0] === 4) {
        player.ftg += (Math.floor(Math.random() * 7) * -1);
    }

    if (array1[1] === 1) {
        player.str += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array1[1] === 2) {
        player.cng += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array1[1] === 3) {
        player.spd += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array1[1] === 4) {
        player.ftg += (Math.floor(Math.random() * 7) * -1);
    }

    array2 = [1, 2, 3, 4]
    for (i = 0; i < 2; i++) {
        let index = Math.floor(Math.random() * (array2.length))
        if (array2[index] === 1) {
            enemy.str += Math.floor(Math.random() * 2);
            array2.splice(index, 1);
        }
        else if (array2[index] === 2) {
            enemy.cng += Math.floor(Math.random() * 2);
            array2.splice(index, 1);
        }
        else if (array2[index] === 3) {
            enemy.spd += Math.floor(Math.random() * 2);
            array2.splice(index, 1);
        }
        else if (array2[index] === 4) {
            enemy.ftg += Math.floor(Math.random() * 7);
            array2.splice(index, 1);
        }
    }

    if (array2[0] === 1) {
        enemy.str += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array2[0] === 2) {
        enemy.cng += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array2[0] === 3) {
        enemy.spd += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array2[0] === 4) {
        enemy.ftg += (Math.floor(Math.random() * 7) * -1);
    }

    if (array2[1] === 1) {
        enemy.str += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array2[1] === 2) {
        enemy.cng += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array2[1] === 3) {
        enemy.spd += (Math.floor(Math.random() * 2) * -1);
    }
    else if (array2[1] === 4) {
        enemy.ftg += (Math.floor(Math.random() * 7) * -1);
    }

    player.maxFtg = player.ftg;
    player.prevFtg = player.ftg;

    enemy.maxFtg = enemy.ftg;
    enemy.prevFtg = enemy.ftg;

    display();
}

function turn(p, e) {
    if (player.dead === "n" && enemy.dead === "n") {
        let enemyChoice = (Math.floor(Math.random() * 2)) + 1;
        if (enemy.ftg >= (player.ftg * 2) || player.ftg < 0) {
            finishMoveCalc(enemy);
        }
        else if (enemyChoice == 1) {
            attackCalc(enemy);
        }
        else if (enemyChoice == 2) {
            defendCalc(enemy);
        }

        if (player.state == "attacking") {
            if (p.atk > e.def) {
                e.ftg -= (p.atk - e.def)
            }

            if (e.state == "attacking") {
                if (e.atk > p.def) {
                    p.ftg -= (e.atk - p.def);
                }
            }

            if (enemy.state == "finishing move") {
                if ((e.atk - p.def) > 1) {
                    p.dead = "y";
                }
                else if (p.state == "defending") {
                    restore(p);
                }
            }

        }
        else if (player.state == "defending") {
            if (e.state == "defending") {
                restore(player);
                restore(enemy);
            }
            else if (e.atk > p.def) {
                p.ftg -= (e.atk - p.def);
            }
            else {
                restore(p);
            }

            if (enemy.state == "finishing move") {
                if ((e.atk - p.def) > 1) {
                    p.dead = "y";
                }
                else if (p.state == "defending") {
                    restore(p);
                }
            }

        }
        else if (player.state == "finishing move") {
            if ((p.atk - e.def) > 1) {
                e.dead = "y";
            }
            else if (e.state == "defending") {
                restore(e);
            }
        }

        if ((player.prevFtg - player.ftg) / 5 != 0) {
            if (Math.floor((player.prevFtg - player.ftg) / 5) < 0) {
                player.str -= Math.floor((player.prevFtg - player.ftg) / 5) + 1;
                player.cng -= Math.floor((player.prevFtg - player.ftg) / 5) + 1;
                player.spd -= Math.floor((player.prevFtg - player.ftg) / 5) + 1;
                player.prevFtg = player.ftg;
            }
            else {
                player.str -= Math.floor((player.prevFtg - player.ftg) / 5);
                player.cng -= Math.floor((player.prevFtg - player.ftg) / 5);
                player.spd -= Math.floor((player.prevFtg - player.ftg) / 5);
                player.prevFtg = player.ftg;
            }
        }
        if ((enemy.prevFtg - enemy.ftg) / 5 != 0) {
            if (Math.floor((enemy.prevFtg - enemy.ftg) / 5) < 0) {
                enemy.str -= Math.floor((enemy.prevFtg - enemy.ftg) / 5) + 1;
                enemy.cng -= Math.floor((enemy.prevFtg - enemy.ftg) / 5) + 1;
                enemy.spd -= Math.floor((enemy.prevFtg - enemy.ftg) / 5) + 1;
                enemy.prevFtg = enemy.ftg;
            }
            else {
                enemy.str -= Math.floor((enemy.prevFtg - enemy.ftg) / 5);
                enemy.cng -= Math.floor((enemy.prevFtg - enemy.ftg) / 5);
                enemy.spd -= Math.floor((enemy.prevFtg - enemy.ftg) / 5);
                enemy.prevFtg = enemy.ftg;
            }
        }

    }
    if (player.dead == "n" && enemy.dead == "y") {
        p.log += "You Win!"
        display();
    }
    else if (player.dead == "y" && enemy.dead == "n") {
        p.log += "You Lose";
        display();
    }
    player.state = "";
    player.atk = 0;
    player.def = 0;

    enemy.state = "";
    enemy.atk = 0;
    enemy.def = 0;

    display();
}

function attackCalc(p) {
    p.state = "attacking";
    p.atk = (p.str + p.spd + p.cng) / ((Math.floor(Math.random() * 3)) + 1);
    p.def = p.spd + ((Math.floor(Math.random() * 6)) + 1);
    p.log += "Attacked\t";
}

function defendCalc(p) {
    p.state = "defending";
    p.def = p.spd + p.cng;
    p.log += "Defended\t";
}

function finishMoveCalc(p) {
    p.state = "finishing move";
    p.atk = (p.str + p.spd) / ((Math.floor(Math.random() * 3)) + 1);
    p.def = p.spd + ((Math.floor(Math.random() * 6)) + 1);
    p.log += "Finisher\t";
}

function attack(p) {
    p.state = "attacking";
    p.atk = (p.str + p.spd + p.cng) / ((Math.floor(Math.random() * 3)) + 1);
    p.def = p.spd + ((Math.floor(Math.random() * 6)) + 1);
    p.log += "Attack, ";
    turn(player, enemy);
    display();
}

function defend(p) {
    p.state = "defending";
    p.def = p.spd + p.cng;
    p.log += "Defend, ";
    turn(player, enemy);
    display();
}

function finishMove(p) {
    p.state = "finishing move";
    p.atk = (p.str + p.spd) / ((Math.floor(Math.random() * 3)) + 1);
    p.def = p.spd + ((Math.floor(Math.random() * 6)) + 1);
    p.log += "Finishing Move, ";
    turn(player, enemy);
    display();
}

function restore(r) {
    let restoreF = ((Math.floor(Math.random() * 6)) + 1);
    if ((r.ftg + restoreF) > r.maxFtg) {
        r.ftg = r.maxFtg;
    }
    else {
        r.ftg += restoreF;
    }
}