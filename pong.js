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
ctx.fillStyle = '#000';
ctx.fillRect(0,0,canvas.width,canvas.height);

const ball = new Ball;
console.log(ball);
//Create the ball
ctx.fillStyle = '#fff';
ctx.fillRect(0,0,10,10);