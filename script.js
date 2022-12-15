function randNum(min, max){
    var mulitplier = upper - (lower - 1);
    var rnd = parseInt(Math.random() * mulitplier) + lower;
    return rnd;
}

function initialize(){
    playerStr = document.getElementById("playerStr");
    playerCng = document.getElementById("playerCun");
    playerSpd = document.getElementById("playerSpd");
    playerFtg = document.getElementById("playerFtg");
    enemyStr = document.getElementById("enemyStr");
    enemyCng = document.getElementById("enemyCng");
    enemySpd = document.getElementById("enemySpd");
    enemyFtg = document.getElementById("enemyFtg");

    playerStats = [6,6,6,30];
    enemyStats = [6,6,6,30];

    randomizeStats();
    display();
}

function display(){
    playerStr.innerHTML = "Strength: "+ playerStats[0];
    playerCng.innerHTML = "Cunning: "+ playerStats[1];
    playerSpd.innerHTML = "Speed: "+ playerStats[2];
    playerFtg.innerHTML = "Fatigue: "+ playerStats[3];
    enemyStr.innerHTML = "Strength: "+ playerStats[0];
    enemyCng.innerHTML = "Cunning: "+ playerStats[1];
    enemySpd.innerHTML = "Speed: "+ playerStats[2];
    enemyFtg.innerHTML = "Fatigue: "+ playerStats[3];
}

function randomizeStats(){
    let array1=[1,2,3,4];
    array1.splice(randNum(1,4),1);
    array1.splice(randNum(1,3),1);

    for(var i in array1) 
    {
        if(array1[i]!=4)playerStats[array1[i]] += randNum(0,1);
        else playerStats[3] +=randNum(0,6);
    }

    let array2=[1,2,3,4];
    array2.splice(randNum(1,4),1);
    array2.splice(randNum(1,3),1);

    for(var i in array2) 
    {
        if(array2[i]!=4)enemyStats[array2[i]] += randNum(0,1);
        else enemyStats[4] +=randNum(0,3);
    }
}

