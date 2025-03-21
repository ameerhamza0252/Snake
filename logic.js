const coordinates =20;
let snakeArr=[{x:Math.floor(Math.random() * (coordinates - 1 + 1)) + 1,y:Math.floor(Math.random() * (coordinates - 1 + 1)) + 1}];
let snakeDirection = {x: 0, y: 0}; 
let snakebody=null;
let lastSegment=0;
let food={x:Math.floor(Math.random() * (coordinates - 1 + 1)) + 1,y:Math.floor(Math.random() * (coordinates - 1 + 1)) + 1};
let refreshtime=0;
let speed=5;
let score =0;
const foodSound = new Audio('Music/food.wav');
const gameOverSound = new Audio('Music/gameover.wav');

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-refreshtime)/ 1000 < 1/speed ){
        return;
    }
    refreshtime = ctime;
    startgame();
}

function MoveSnake(){
    // Snake move forward
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += snakeDirection.x;
    snakeArr[0].y += snakeDirection.y;
}


function DisplaySnake(){
//Display Snake On Screen
board.innerHTML="";
snakeArr.forEach((e,index)=>{
snakebody=document.createElement('div');
snakebody.style.gridRowStart=e.y;
snakebody.style.gridColumnStart=e.x;
if(index===0){
    snakebody.classList.add('head');
    //To rotate snakes head
    switch (`${snakeDirection.x},${snakeDirection.y}`) {
    case "0,-1":
        snakebody.classList.add("top");
        break;
    case "0,1":
        snakebody.classList.add("bottom");
        break;
    case "1,0":
        snakebody.classList.add("right");
        break;
    case "-1,0":
        snakebody.classList.add("left");
        break;
}
    }
    else{
        snakebody.classList.add('snake');
    }
   board.appendChild(snakebody);
});
}

function DisplayFood(){
    //Display Food
   food_display=document.createElement('div');
   food_display.classList.add('food');
   food_display.style.gridRowStart=food.y;
   food_display.style.gridColumnStart=food.x;
   board.appendChild(food_display);

}
function gameOver(){
    gameOverSound.play();
    score = 0;
    boardscore.innerHTML = "Score: " + score;
    speed = 5;
    snakeDirection = { x: 0, y: 0 };
    food = { x: Math.floor(Math.random() * coordinates), y: Math.floor(Math.random() * coordinates) };
    snakeArr = [{ x: Math.floor(Math.random() * coordinates), y: Math.floor(Math.random() * coordinates) }];
}
function startgame(){
DisplaySnake()
MoveSnake();
DisplayFood();

//Eat Food
   if(food.x==snakeArr[0].x && food.y==snakeArr[0].y){
        score++;
        boardscore.innerHTML="Score:"+score;
        speed = speed+1;
        foodSound.play();
        lastSegment = snakeArr[snakeArr.length - 1];
        snakeArr.push({ x: lastSegment.x, y: lastSegment.y });
        food={x:Math.floor(Math.random() * (coordinates - 1 + 1)) + 1,y:Math.floor(Math.random() * (coordinates - 1 + 1)) + 1};
    }
    //Collision
    if(snakeArr[0].x>20||snakeArr[0].y>20||snakeArr[0].x<=-1||snakeArr[0].y<=-1){
        gameOver();
    }
    // Check for Self-Collision
    for (let i = 2; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
           gameOver();
        }
    }
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    snakeDirection = {x: 1, y: 0} // Start the game
    switch(e.key){
         case "ArrowUp":
            snakeDirection.x = 0;
            snakeDirection.y = -1;
            break;
         case "ArrowDown":
            snakeDirection.x = 0;
            snakeDirection.y = 1;
            break;
        case "ArrowLeft":
            snakeDirection.x = -1;
            snakeDirection.y = 0;
            break;
        case "ArrowRight":
            snakeDirection.x = 1;
            snakeDirection.y = 0;
            break;
        default:
            break;
    }
});