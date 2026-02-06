// 課題05-06 tic_tac_toeのjsをbaseに使用してください。
// 98_Time guessing quiz のjs からもコードをコピーすると早く出来上がりますよ！
"use strict";

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let startTime;       // Startボタンクリック時の時刻
let timeoutid;       // ID
let stopTime = 0;    // Stopまでの経過時間
setButtonStateInitial(); // ボタンを"初期"状態とする

let counter = 0;
const squares = document.getElementsByClassName("square");
const squaresArray = Array.from(squares);

// squares の要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const a_4 = document.getElementById("a_4");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const b_4 = document.getElementById("b_4");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");
const c_4 = document.getElementById("c_4");
const d_1 = document.getElementById("d_1");
const d_2 = document.getElementById("d_2");
const d_3 = document.getElementById("d_3");
const d_4 = document.getElementById("d_4");

// Message
const msgtxt1 = '<p class="text animateanimated animate__rubberBand">Push Start!!</p>';
const msgtxt2 = '<p class="text animate__bounceIn">Hurry Up!!</p>';
const msgtxt3 = '<p class="text animate__animated animate__heartBeat">Hurry Up!!!!!!</p>';
const msgtxt4 = '<p class="text animate__animated animate__rollIn">Clear!!</p>';
// Sound
let gameSound = [
    "sound/start.mp3",
    "sound/stop.mp3",
    "sound/reset.mp3",
    "sound/ok.mp3",
    "sound/ng.mp3",
];

window.addEventListener("DOMContentLoaded",
    function(){
        setMessage("start");
        let squaresBox = document.getElementById("squaresBox")
        squaresBox.classList.add("js-unclickable");
        squaresBox.style.backgroundColor = "grey";
    }, false
);

squaresArray.forEach(function (square){
    square.addEventListener("click", () => {
        isSelect(square);
    });
});

function isSelect(selectSquare){
    if(counter == 7){
        setMessage("hurryup1");
    }
    if(counter == 12){
        setMessage("hurryup2");
    }
    let w_id = selectSquare.getAttribute("id");
    let w_num = document.getElementById(w_id).innerHTML

    if(w_num == counter + 1){
        // sound
        let music = new Audio(gameSound[3]);
        music.currentTime = 0;
        music.play();
        selectSquare.style.color = "grey";
        counter++;
    }
    else{
        // sound
        let music = new Audio(gameSound[4]);
        music.currentTime = 0;
        music.play();
    }

    // Game over when it reaches 16
    if(counter === 16){
        gameOver();
    }
}

// メッセージ切り替え関数

function setMessage(id){
    switch(id){
        case "start":
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;
        case "hurryup1":
            document.getElementById("msgtext").innerHTML = msgtxt2;
            break;
        case "hurryup2": 
            document.getElementById("msgtext").innerHTML = msgtxt3;
            break;
        case "game_over": 
            document.getElementById("msgtext").innerHTML = msgtxt4;
            break;
        default:
            document.getElementById("msgtext").innerHTML = msgtxt1;    
    }
}

// when game is over

function gameOver(){
    setMessage("game_over");

    let squaresBox = document.getElementById("squaresBox")
    squaresBox.classList.add("js-unclickable");
    squaresBox.style.backgroundColor = "rgba(128,128,128,0.5)";
    // sound
    let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

    $(document).snowfall({
        flakeColor : "rgb(255, 240, 245)",
        maxSpeed : 3,
        minspeed : 1,
        maxSize : 20, 
        minSize : 10,
        image : "img/star.png"
    });

    setButtonStateStopped();
    clearTimeout(timeoutid);
    stopTime = Date.now() - startTime;
}

let arrNum;
let arrId = ["a_1","a_2","a_3","a_4","b_1","b_2","b_3","b_4","c_1","c_2","c_3","c_4","d_1","d_2","d_3","d_4"];
let numArr;
let numSquareId;

function randominizing(){
    arrNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    numArr = [];
    numSquareId = ["","","","","","","","","","","","","","","",""];

    for(let i = 0, arrLen = arrNum.length; i < 16; i++, arrLen--){
        let rndNum = Math.floor(Math.random() * arrLen);
        numArr.push(arrNum[rndNum]);
        arrNum[rndNum] = arrNum[arrLen - 1];
    }

    for(let i = 0; i < 16; i++) {
        let resultId = numArr.indexOf(i+1)
        numSquareId[resultId] = arrId[resultId]
        document.getElementById(arrId[i]).innerHTML = numArr[i];
    }

}

// Button when clicked
//////////////////////////////////
// Start button
//////////////////////////////////
start.addEventListener("click",
  function() {
    setMessage("hurryup1");
    let squaresBox = document.getElementById("squaresBox")
    squaresBox.classList.remove("js-unclickable");
    squaresBox.style.backgroundColor = "";
    // sound 
    let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

    randominizing()

    // ボタンをタイマー"動作中"状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  },false
);

//////////////////////////////////
// Stop button
//////////////////////////////////
stop.addEventListener("click",
  function() {
    let squaresBox = document.getElementById("squaresBox")
    squaresBox.classList.add("js-unclickable");

    setButtonStateStopped();
    clearTimeout(timeoutid);
    stopTime = Date.now() - startTime;
    // sound 
    let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();
    
  },false
);

//////////////////////////////////
// Reset button
//////////////////////////////////
reset.addEventListener("click",
    function(){
        setMessage("start");
        let squaresBox = document.getElementById("squaresBox")
        squaresBox.classList.add("js-unclickable");
        squaresBox.style.backgroundColor = "grey";

        $(document).snowfall("clear");

        counter = 0;
        // sound
        let music = new Audio(gameSound[2]);
        music.currentTime = 0;
        music.play();
        // ボタンを"初期"状態とする
        setButtonStateInitial()
        timer.textContent = "00:00.000";
        stopTime = 0;

        squaresArray.forEach(function (square){
            square.style.color = "black";
            let w_id = square.getAttribute("id");
            document.getElementById(w_id).innerHTML = "";
            square.style.color = "#4a488e";
        });
    }
);

// Timer function
function countUp(){
    const d = new Date(Date.now() - startTime + stopTime);
    // padStart()で2桁表示
    const m = String(d.getMinutes()).padStart(2,"0");
    const s = String(d.getSeconds()).padStart(2,"0");
    const ms = String(d.getMilliseconds()).padStart(3, "0");
    // 
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutid = setTimeout(() => {
        // 再変呼び出し
        countUp();
    }, 10);
}

// Button state functions
// 初期　または　Reset後
function setButtonStateInitial(){
    start.classList.remove("js-inactive");
    stop.classList.add("js-inactive");
    reset.classList.add("js-inactive");
    start.classList.remove("js-unclickable");
    stop.classList.add("js-unclickable");
    reset.classList.add("js-unclickable");
}

// タイマー動作中
function setButtonStateRunning(){
    start.classList.add("js-inactive");
    stop.classList.remove("js-inactive");
    reset.classList.add("js-inactive");
    start.classList.add("js-unclickable");
    stop.classList.remove("js-unclickable");
    reset.classList.add("js-unclickable");
}

// タイマー停止中
function setButtonStateStopped(){
    start.classList.add("js-inactive");
    stop.classList.add("js-inactive");
    reset.classList.remove("js-inactive");
    start.classList.add("js-unclickable");
    stop.classList.add("js-unclickable");
    reset.classList.remove("js-unclickable");
}