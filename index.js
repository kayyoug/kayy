const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

const bestScore=document.querySelector("#bestScore");

const gameWidth = gameBoard.width;
const gameHeight= gameBoard.height;
const boardBackground = "red";
const snakeColor = "green";
const snakeBorder = "black";
const foodColor = "purple";
const unitSize= 25;
let running= false;
let xVelocity = unitSize;
let  yVelocity= 0;
let foodX;
let foodY;
let score = 0;
let highScore= 0;
let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0,y:0}
];


window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
gameStart();


function gameStart(){
    running=true;
    scoreText.textContent=score ;

    createFood();
    drawFood();
    nextTick()
}
function nextTick(){
    if (running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameover();
            nextTick();


        },25);

    }
    else {displayGameover()}
}
function clearBoard(){
    ctx.fillStyle = boardBackground

    ctx.fillRect(0,0, gameWidth,gameHeight,)
}
function createFood(){
    function randomFood(min, max) {
        const randNumb=Math.round((Math.random() * (max-min)+min )/unitSize) * unitSize;
        return randNumb ;   }
    foodX = randomFood(0, gameWidth-unitSize);
    foodY = randomFood(0, gameWidth-unitSize);
}
function drawFood(){ctx.fillStyle=foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize);

}
function drawSnake(){
    ctx.fillStyle=snakeBorder;
    ctx.strokeStyle=snakeColor;
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)

    })



}
function moveSnake(){
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };


    snake.unshift(head);


    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    } else {

        snake.pop();
    }
}
function changeDirection(event){
    const keyPressed=event.keyCode;

    const up=87;
    const foward=38;
    const down=83;
    const back=40;
    const left=65;
    const sidewayB=37;
    const right= 68;
    const sidewayA=39;

    const goingUp=(yVelocity==-unitSize)
    const goingDown=(yVelocity==unitSize)
    const goingRight = (xVelocity==unitSize)
    const goingLeft=(xVelocity==-unitSize)
    switch (true){
        case(keyPressed==left&&sidewayB&&!goingRight):
            xVelocity=-unitSize;
            yVelocity=0;
            break;
        case(keyPressed==right&&sidewayA&&!goingLeft):
            xVelocity=unitSize;
            yVelocity=0;
            break;
        case(keyPressed==up&&foward&&!goingDown):
            xVelocity=0;
            yVelocity=-unitSize;
            break;
        case(keyPressed==down&&back&&!goingUp):
            xVelocity=0;
            yVelocity=unitSize;
            break;

        case(keyPressed==sidewayB&&!goingRight):
            xVelocity=-unitSize;
            yVelocity=0;
            break;
        case(keyPressed==sidewayA&&!goingLeft):
            xVelocity=unitSize;
            yVelocity=0;
            break;
        case(keyPressed==foward&&!goingDown):
            xVelocity=0;
            yVelocity=-unitSize;
            break;
        case(keyPressed==back&&!goingUp):
            xVelocity=0;
            yVelocity=unitSize;
            break;
    }
}
function checkGameover(){
    switch(true){
        case(snake[0].x<0):
            running=false;
            break;
        case (snake[0].x>=gameWidth):
            running =false
            break;
        case(snake[0].y<0):
            running=false;
            break;
        case (snake[0].y>=gameHeight):
            running =false
    }
    for(let i = 1; i<snake.length;i+=1){if (snake[i].x==snake[0].x && snake[i].y==snake[0].y)
        running=false;}}
function displayGameover(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("GAMEOVER!!", gameWidth/2,gameHeight/2 )
    running = false
}
function resetGame(){
    score=0
    xVelocity=unitSize;
    yVelocity=0;
    snake = [
        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2, y:0},
        {x:unitSize, y:0},
        {x:0,y:0}];


    gameStart();
}







