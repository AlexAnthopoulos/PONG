class Vec
{
    constructor(x = 0 , y = 0)
    {
        this.x = x;
        this.y = y;
    }
}

class Rect
{
    constructor(w,h)
    {
        this.pos = new Vec;
        this.size = new Vec(w,h);
    }
    //Getting different sides of the ball to make more accessible when it comes down to calculating bounces across the x and y axis.
    get left()
    {
        return this.pos.x - this.size.x / 2;
    }
    get right()
    {
        return this.pos.x + this.size.x / 2;
    }
    get top()
    {
        return this.pos.y - this.size.y / 2;
    }
    get bottom()
    {
        return this.pos.y + this.size.y / 2;
    }
}

class Ball extends Rect
{
    constructor()
    {
        super(10,10);
        this.vel = new Vec
    }
}
//Draw main gaming area and get canvas elements
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');


const ball = new Ball;
console.log(ball);
ball.pos.x = 100;
ball.pos.y = 50
ball.vel.x = 900;
ball.vel.y = 800;
//Creating animation update for the page
let lastUpdate;

function callback(milliseconds) {
    if(lastUpdate) {
        //Update in seconds for easier changes
        update((milliseconds - lastUpdate)/1000);
    }
    //Doing this so we add on the animation frame the callback
    lastUpdate = milliseconds;
    requestAnimationFrame(callback);
}

//Updating ball position
function update(dt){
    //Movement of the ball relative to time difference
    ball.pos.x += ball.vel.x * dt;
    ball.pos.y += ball.vel.y * dt;
    
    //Create bouncing of the ball by inverting the velocity on both x and y axis across the corners of the board
    if(ball.left < 0 || ball.right > canvas.width){
        ball.vel.x = -ball.vel.x;
    }
    if(ball.top < 0 || ball.bottom > canvas.height){
        ball.vel.y = -ball.vel.y;
    }
    //Create board stuff
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //Create the ball
    ctx.fillStyle = '#fff';
    ctx.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
}

callback();