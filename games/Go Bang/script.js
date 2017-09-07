/**
 * Created by Lenovo on 2017/7/1.
 */

var audio = document.createElement("audio");
var down = document.createElement("audio");
var win = document.createElement("audio");
var lose = document.createElement("audio");

audio.src = "music.mp3";
down.src = "down.wav";
win.src = "win.wav";
lose.src = "lose.wav";

document.body.appendChild(audio, down, win, lose);
audio.autoplay = 'autoplay';


var over = false;
var me = true; //我
var now_i = 0, now_j = 0;
var now_comi = 0, now_comj = 0;

var chressBord = [];//棋盘
for(var i = 0; i < 15; i++){
    chressBord[i] = [];
    for(var j = 0; j < 15; j++){
        chressBord[i][j] = 0;
    }
}

//赢法的统计数组
var myWin = [];
var computerWin = [];
var regret_myWin = [];
var regret_comWin = [];

//赢法数组
var wins = [];
for(var i = 0; i < 15; i++){
    wins[i] = [];
    for(var j = 0; j < 15; j++){
        wins[i][j] = [];
    }
}

var count = 0; //赢法总数
//横线赢法
for(i = 0; i < 15; i++){
    for(j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}

//竖线赢法
for(var i = 0; i < 15; i++){
    for(var j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}

//正斜线赢法
for(var i = 0; i < 11; i++){
    for(var j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}

//反斜线赢法
for(var i = 0; i < 11; i++){
    for(var j = 14; j > 3; j--){
        for(var k = 0; k < 5; k++){
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}

for(var i = 0; i < count; i++){
    myWin[i] = 0;
    computerWin[i] = 0;
    regret_myWin[i] = 0;
    regret_comWin[i] = 0;
}
//主函数部分
alert("Welcome to play Go Bang! Now please click enter to start this game!");
var chess = document.getElementById("chess");
var context = chess.getContext('2d');
context.lineWidth = 1;
context.strokeStyle = '#bfbfbf'; //边框颜色

var logo = new Image();
logo.src = 'logo.jpg';
logo.onload  = function(){
    context.drawImage(logo,0,0,450,450);
    drawChessBoard();
};

document.getElementById("restart").onclick = function(){
    window.location.reload();
};
document.getElementById("stop").onclick = function (){
    if(document.getElementById("stop").innerText==='Stop Music'){
        audio.pause();
        document.getElementById("stop").innerHTML = 'Turn on Music';
    }
    else {
        audio.play();
        document.getElementById("stop").innerHTML = 'Stop Music';
    }
};
function destroy(i, j){
    context.clearRect(i*30, j*30, 30, 30);
    context.beginPath();
    context.drawImage(logo, i*30, j*30, 30, 30, i*30, j*30, 30, 30);
    context.closePath();
    context.beginPath();
    context.moveTo(15+i*30, j*30);
    context.lineTo(15+i*30, j*30+30);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(i*30, j*30+15);
    context.lineTo(i*30+30, j*30+15);
    context.stroke();
    context.closePath();
}
var revertFlag = false;
document.getElementById("regret").onclick = function (){
    if(!over&&!revertFlag){
        chressBord[now_i][now_j] = 0;
        destroy(now_i, now_j);
        chressBord[now_comi][now_comj] = 0;
        destroy(now_comi, now_comj);
        for (var k = 0; k < count; k++) {
            if (wins[now_comi][now_comj][k]) {
                myWin[k]--;
                computerWin[k] = regret_comWin[k];
            }
            if (wins[now_comi][now_comj][k]){
                computerWin[k]--;
                myWin[k] = regret_myWin[k];
            }
        }
        document.getElementById("regret").style.backgroundColor = "gray";
        revertFlag = true;
    }
};
var i = 0;
var j = 0;
chess.onclick = function(e){
    if(over){
        return;
    }
    if(!me) {
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    now_i = i;
    now_j = j;
    if(chressBord[i][j] === 0){
        oneStep(i,j,me);
        revertFlag = false;
        document.getElementById("regret").style.backgroundColor = "green";
        chressBord[i][j] = 1;//我        
        for(var k = 0; k < count; k++){
            if(wins[i][j][k]){
                myWin[k]++;
                regret_comWin[k] = computerWin[k];
                computerWin[k] = 6;//这个位置对方不可能赢了
                if(myWin[k] === 5){
                    audio.pause();
                    win.play();
                    window.alert('You win!! Wanna play once more?');
                    setTimeout("window.location.reload()", 2000);
                    over = true;
                }
            }
        }
        if(!over){
            me = !me;
            computerAI();
        }
    }

};
//计算机下棋
var u = 0;
var v = 0;
var computerAI = function (){
    var myScore = [];
    var computerScore = [];
    var max = 0;
    for(var i = 0; i < 15; i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j = 0; j < 15; j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 15; j++){
            if(chressBord[i][j] === 0){
                for(var k = 0; k < count; k++){
                    if(wins[i][j][k]){
                        if(myWin[k] === 1){
                            myScore[i][j] += 200;
                        }else if(myWin[k] === 2){
                            myScore[i][j] += 400;
                        }else if(myWin[k] === 3){
                            myScore[i][j] += 2000;
                        }else if(myWin[k] === 4){
                            myScore[i][j] += 10000;
                        }

                        if(computerWin[k] === 1){
                            computerScore[i][j] += 220;
                        }else if(computerWin[k] === 2){
                            computerScore[i][j] += 420;
                        }else if(computerWin[k] === 3){
                            computerScore[i][j] += 2100;
                        }else if(computerWin[k] === 4){
                            computerScore[i][j] += 20000;
                        }
                    }
                }

                if(myScore[i][j] > max){
                    max  = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] === max){
                    if(computerScore[i][j] > computerScore[u][v]){
                        u = i;
                        v = j;
                    }
                }

                if(computerScore[i][j] > max){
                    max  = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] === max){
                    if(myScore[i][j] > myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }

            }
        }
    }
    oneStep(u,v,false);
    chressBord[u][v] = 2;
    now_comi = u;
    now_comj = v;
    for(var k = 0; k < count; k++){
        if(wins[u][v][k]){
            computerWin[k]++;
            regret_myWin[k] = myWin[k];
            myWin[k] = 6;//这个位置对方不可能赢了
            if(computerWin[k] === 5){
                audio.pause();
                lose.play();
                window.alert('You lose!! The game robot beats you! Wanna try once again?');
                setTimeout("window.location.reload()", 2000);
                over = true;
            }
        }
    }
    if(!over){
        me = !me;
    }
};

//绘画棋盘
var drawChessBoard = function(){
    for(i = 0; i < 15; i++){
        context.beginPath();
        context.moveTo(15 + i * 30 , 15);
        context.lineTo(15 + i * 30 , 435);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(15 , 15 + i * 30);
        context.lineTo(435 , 15 + i * 30);
        context.stroke();
        context.closePath();
    }
};
//画棋子
var oneStep = function(i,j,me) {
    down.play();
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);//画圆
    context.closePath();
    //渐变
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);

    if (me) {
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#636766');
    } else {
        gradient.addColorStop(0, '#d1d1d1');
        gradient.addColorStop(1, '#f9f9f9');
    }
    context.fillStyle = gradient;
    context.fill();
};