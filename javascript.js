var root = this;

var speed = 20; // speed of the snake
var vx, vy; // snake position
var gFood;
var head;
var SnakeDirection;
var snake;
function init() {
    // Initialize everything!
    vx = 1; vy = 0;
    snake = new Array();
    SnakeDirection = "";
}

init(); // call init function
function addFood() {
    gFood = new lib.Food(); // Call Food Movieclip from library
    root.addChild(gFood);
}

function init() {

    // Add food to stage
    addFood();
}
function addFood() {
    gFood = new lib.Food();
    gFood.x = 36 + Math.random()*(stage.canvas.clientWidth-100);
    gFood.y = 36 + Math.random()*(stage.canvas.clientHeight-100);
    root.addChild(gFood);
}
function addSnake() {
    head = new lib.SnakePart();
    head.x = stage.canvas.clientWidth/2;
    head.y = stage.canvas.clientHeight/2;
    snake.push(head);
    root.addChild(head);
}
function init() {
    
    // Add snake to stage
    addSnake();
}
function init() {
    
    createjs.Ticker.addEventListener("tick" , onEnterFrame);
}
function onEnterFrame() {
    //setting direction of velocity
    if(SnakeDirection == "left" && vx != 1) {
        vx = -1;
        vy = 0;
    } else if(SnakeDirection == "right" && vx != -1) {
        vx = 1;
        vy = 0;
    } else if(SnakeDirection == "up" && vy != 1) {
        vx = 0;
        vy = -1;
    } else if(SnakeDirection == "down" && vy != -1) {
        vx = 0;
        vy = 1;
    }
}
function onEnterFrame() {
    
    //move body of the snake
    for(var i = snake.length-1; i>0; --i){
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }
    //changing the position of snake's head
    head.x += vx*speed;
    head.y += vy*speed;
}
function onEnterFrame() {
    //collison with stage
    if(head.x - head.nominalBounds.width/2 <= 0){
        reset();
    }
    if(head.x + head.nominalBounds.width/2 >= stage.canvas.clientWidth){
        reset();
    }
    if(head.y - head.nominalBounds.height/2 <= 0){
		reset();
	}
    if(head.y + head.nominalBounds.height/2 >= stage.canvas.clientHeight){
        reset();
	}
}
function onEnterFrame() {
    
    //collision with tail
    for(var j = snake.length-1;j>=1;--j){
        if(snake[0].x == snake[j].x && snake[0].y == snake[j].y){
            reset();
            break;
		}
	}
}
function onEnterFrame() {
    
    //collision with food
    var p = head.localToLocal(0,0,gFood);
    if(head.hitTest(p.x, p.y)){
        root.removeChild(gFood);
        addFood();
        var bodyPart = new lib.SnakePart();
        bodyPart.x = snake[snake.length - 1].x;
        bodyPart.y = snake[snake.length - 1].y;
        snake.push(bodyPart);
        root.addChild(bodyPart);
	}
}
function reset() {
    root.removeChild(gFood);
    addFood();
    head.x = stage.canvas.clientWidth/2;
    head.y = stage.canvas.clientHeight/2;
    vx = 1;vy = 0;
    for(var i = snake.length-1;i>0;--i){
        root.removeChild(snake[i]);
        snake.splice(i,1);
    }
}
function init() {
    
    window.onkeydown = userPressed.bind(this);
}
function userPressed(event) {
	console.log("press", event);
	if(event.code == "ArrowLeft") {
	   SnakeDirection = "left";
	} else if (event.code == "ArrowRight") {
	   SnakeDirection = "right";
	} else if (event.code == "ArrowUp") {
		SnakeDirection = "up";
	} else if (event.code == "ArrowDown") {
		SnakeDirection = "down";
	}
}

