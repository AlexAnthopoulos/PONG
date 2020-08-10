class Vec
{
    constructor(x = 0 , y = 0)
    {
        this.x = x;
        this.y = y;
    }
}


//Draw main gaming area and get canvas elements
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000';
ctx.fillRect(0,0,canvas.width,canvas.height);

//Create the ball
ctx.fillStyle = '#fff';
ctx.fillRect(0,0,10,10);