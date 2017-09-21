
//setup canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

//setting up canvas dimensions
var winHeight = 600;
var winWidth = 600;
canvas.height = winHeight;
canvas.width = winWidth;

var mouse = {
    "x": undefined,
    "y": undefined
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

//Physics
var gravity = 0.5;
var friction = 0.0001;
var jumpForce = -10;

//Floor height diffrence
var floorH = 200;

//for debugging   --will be removed at release time--
console.log(canvas)

//Listning keyboard keys
window.addEventListener('keydown', function (event) {
    
    //right arrow
    if (event.keyCode == 39 && p1.grounded == true) {
        p1.jump();
    }
});


//function for calculating distance between two center's of circle colliders
function calculateDistance(x1, y1, x2, y2) {
    var xDis = x1 - x2;
    var yDis = y1 - y2;

    return Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis,2));
}

class Obstacles{
    constructor(x, y, dx, radius,color,p1/*,p2,p3*/) {
        this.x = x;
        this.dx = dx;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.p1 = p1;
        //this.p2 = p2;
        //this.p3 = p3;
        //for debuging only
        this.temColor1 = this.p1.color;
        //this.temColor2 = this.p2.color;
        //this.temColor3 = this.p3.color;
        this.num = Math.random();
    }
    
    update(){
        this.x += -this.dx * 2;
        

        //character 1
        if (calculateDistance(this.p1.x,this.p1.y,this.x,this.y) < this.p1.radius+this.radius){
            this.p1.color = 'black';
        }
        else{
            this.p1.color = this.temColor1;
        }

        //Character 2
        /*
        if (calculateDistance(this.p2.x,this.p2.y,this.x,this.y) < this.p2.radius+this.radius){
            this.p2.color = 'black';
        }
        else{
            this.p2.color = this.temColor2;
        }

        //character 3
        if (calculateDistance(this.p3.x,this.p3.y,this.x,this.y) < this.p3.radius+this.radius){
            this.p3.color = 'black';
        }
        else{
            this.p3.color = this.temColor3;
        }
        */

        this.draw();
    }

    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
    }
}



class Circle_PO{
    constructor(x, y, dx, dy, radius, color, gravity, friction, grounded, floor) {
        this.floor = floor;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.gravity = gravity;
        this.friction = friction;
        this.radius = radius;
        this.grounded;
    }

    update(){
        if (this.y + this.radius + this.dy > /*canvas.height*/ this.floor) {
            this.dy = -this.dy;
            this.dy = this.dy * this.friction;
            this.dx = this.dx * this.friction;
            this.grounded = true;
        } else {
            this.dy += this.gravity;
            this.grounded = false;
        }

        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx * this.friction;

        }

        this.y += this.dy;
        this.draw();
    }   

    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
    }
}




class Player extends Circle_PO{
    jump() {
        this.dy = jumpForce;
    }
}

class Ai extends Circle_PO{
    jump(){
        this.dy = jumpForce;
    }
}



var p1;
var ai1;
var ai2;
var obs;
function init() {
    p1 = new Player(100, 300, 1, 1, 30, 'red', gravity, friction, false, canvas.height);
    ai1 = new Ai(200, 300, 1, 1, 30, 'grey', gravity, friction, false, canvas.height);
    ai2 = new Ai(300, 300, 1, 1, 30, 'grey', gravity, friction, false, canvas.height);
    obs = new Obstacles(600,570,2,10,'black',p1);
}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);
    p1.update();
    ai1.update();
    ai2.update();
    obs.update();
}

init();
animate();