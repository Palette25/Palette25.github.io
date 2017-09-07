/**
 * Created by Lenovo on 2017/6/29.
 */

//初始化音乐元素
var bgm = document.createElement("audio");
var over = document.createElement("audio");
bgm.src = "bgm.wav";
over.src = "over.wav";
document.body.appendChild(bgm, over);

//初始化canvas画布
var cav = document.getElementById("cav");
var cxt = cav.getContext("2d");

//初始化画布属性，以及蛇身各项初始值
var snakeSize = 20;
var cvsGridx = cav.width / snakeSize;
var cvsGridy = cav.height / snakeSize;
var snakeBody = [];
var dire = 2;
var food = {};
var direflag = 0;
var score = 0;

//初始化函数
function init(){
    bgm.autoplay = 'autoplay';
    bgm.loop = true;//循环播放背景音乐
    for(var i = 0;i < 3;i++){
        createSnakeBody(parseInt(cvsGridx / 2) + i, parseInt(cvsGridy / 2));
    }//初始化创建蛇身
    drawSnake();//将蛇身画到画布上
    putfood();//将食物画到画布上
}
//初始化创建蛇身函数
function createSnakeBody(x,y){
    snakeBody.push({x: x, y: y, color: snakeBody.length===0? "red":"black"});//头为红色，蛇身为黑色
    document.getElementById("score").innerText = score;//初始化得分
}
//画方块的函数
function drawRect(snakeNode){
    cxt.beginPath();
    cxt.fillStyle = snakeNode.color;
    cxt.fillRect(snakeNode.x * snakeSize, snakeNode.y * snakeSize, snakeSize, snakeSize);//将指定区域天上相应的颜色
    cxt.closePath();
}
//将蛇身画到画布上的函数
function drawSnake(){
    cxt.clearRect(0, 0, 1000, 1000);
    for(var i = 0;i<snakeBody.length;i++){
        drawRect(snakeBody[i]);
    }
    drawRect(food);
}
//蛇接受每一步指令，做出运动的函数
function snakeMove(){
    var newNode = {x: snakeBody[0].x, y: snakeBody[0].y, color:"red"};
    switch(dire){
        case 1: newNode.y -= 1;
            break;
        case -1: newNode.y += 1;
            break;
        case 2: newNode.x -= 1;
            break;
        case -2: newNode.x += 1;
            break;
    }
    for(var i = snakeBody.length - 1;i > 0;i--){
        snakeBody[i].x = snakeBody[i-1].x;
        snakeBody[i].y = snakeBody[i-1].y;
        if(snakeBody[i].x===newNode.x&&snakeBody[i].y===newNode.y){
            gameover();
        }
    }
    snakeBody[0] = newNode;
    direflag = 0;
    isGetFood(snakeBody[0]);
    outOfBorder(snakeBody[0]);
    drawSnake();
    document.getElementById("score").innerHTML = 'Your score is: '+score;
}
//游戏结束函数
function gameover(){
    window.clearInterval(time);
    bgm.pause();
    over.play();
    setTimeout("window.alert('Game Over!')", 1000);
    setTimeout("window.location.reload()", 1200);
}
//越界判断函数
function outOfBorder(node){
    if(node.x<0 || node.x>cvsGridx -1 || node.y<0 || node.y>cvsGridy -1) {
        gameover();
    }
}
function isGetFood(node){
    if(node.x===food.x&&node.y===food.y){
        putfood();
        snakeBody.push({x: snakeBody[snakeBody.length-1].x,
                        y: snakeBody[snakeBody.length-1].y,
                        color:"black"});
        score++;
    }
}
function setDirection(dir){
    direflag = 1;
    if(Math.abs(dir)===Math.abs(dire)){}
    else dire = dir;
}
document.onkeydown = function(e){
    if(direflag) return;
    e.preventDefault();
    switch(e.keyCode){
        case 38: setDirection(1); //上
                 break;
        case 40: setDirection(-1); //下
                 break;
        case 37: setDirection(2); //左
                 break;
        case 39: setDirection(-2); //右
                 break;
    }
};
function putfood(){
    var flag = 1;
    while(1){
        flag = 1;
        var food_x = parseInt(Math.random() * cvsGridx);
        var food_y = parseInt(Math.random() * cvsGridy);
        for(var i = 0;i<snakeBody.length;i++){
            if(food_x===snakeBody[i].x&&food_y===snakeBody[i].y) flag = 0;
        }
        if(flag) break;
    }
    food = {x: food_x, y: food_y, color:"yellow"};
}
alert("Welcome to play Greedy Snake! Now please click enter to start this game!");
init();
var time  = setInterval(function(){
    snakeMove()
}, 100);