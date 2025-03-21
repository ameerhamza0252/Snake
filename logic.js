let snakeArr=[{x:5,y:5}];
let inputDir = {x: 0, y: 0}; 
let snakebody=null;
let food={x:2,y:5};
let refreshtime=0;
let speed=2;
let score =0;
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-refreshtime)/ 1000 < 1/speed ){
        return;
    }
    refreshtime = ctime;
    startgame();
}
function startgame(){
// Snake move forward
 for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
//Display Snake On Screen
board.innerHTML="";
snakeArr.forEach((e,index)=>{
   snakebody=document.createElement('div');
   snakebody.style.gridRowStart=e.y;
   snakebody.style.gridColumnStart=e.x;
   if(index===0){
        snakebody.classList.add('head');
    //To rotate snakes head
    switch (`${inputDir.x},${inputDir.y}`) {
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
//Display Food
   food1=document.createElement('div');
   food1.classList.add('food');
   food1.style.gridRowStart=food.y;
   food1.style.gridColumnStart=food.x;
   board.appendChild(food1);


    if(food.x==snakeArr[0].x && food.y==snakeArr[0].y){
        score++;
        speed = speed+1;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        food.x=Math.floor(Math.random() * 31) + 1;
        food.y=Math.floor(Math.random() * 31) + 1;
    }
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    inputDir = {x: 0, y: 1} // Start the game
    switch(e.key){
         case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
         case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});