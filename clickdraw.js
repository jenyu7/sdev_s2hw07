/*
 * Jen Yu 
 * SoftDev Period 7
 * 02-05-2018
 * K#01: It's about CONNECTION
 */

var canvas = document.getElementById("slate");
var height = canvas.getAttribute("height");
var width = canvas.getAttribute("width");
var ctx = canvas.getContext("2d"); // set context to 2d

var toggle = document.getElementById("toggle");
var clear = document.getElementById("clear");

console.log(toggle);
console.log(clear);

//coordinate type 
var state = 0;

//array of type names
var modes = ["Offset", "Client", "Screen", "Page"];

//increases state by 1 each time, modulo 4 taken
var toggleCallBack = function(e){
    state ++;
    state %= 4;
    document.getElementById("mode").innerHTML = modes[state];
    console.log("toggled");
};

//variables to store (x,y) of previous circle
var prevX, prevY = null;

var canvasCallBack = function(e){
    e.preventDefault();
    var cors = [];
    //draw dots based on state
    if (state == 0)
	cors = drawDot(e.offsetX, e.offsetY);
    else if (state == 1)
	cors = drawDot(e.clientX, e.clientY);
    else if (state == 2)
	cors = drawDot(e.screenX, e.screenY);
    else
	cors = drawDot(e.pageX, e.pageY);
    //if a circle has already been drawn:
    //move back to coordinates of original circle
    //draw a line from previous circle to the new circle
    //stroke (so the line appears)
    if (prevX != null && prevY != null){
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(cors[0], cors[1]);
	ctx.stroke();
	ctx.closePath();
    }
    console.log(cors);
    //circle just drawn -> store coordinates for next drawn circle
    prevX = cors[0];
    prevY = cors[1];   
};

//draws a dot, returns the x and y coordinates in a list
var drawDot = function(x, y){
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(x,y,20,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    return [x, y]
};

//clears the screen and resets the prevX and prevY variables
var clearCallBack = function(e){
    console.log("cleared");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,600,600);
    prevX, prevY = null;
};

//add the event listeners
toggle.addEventListener("click", toggleCallBack);
clear.addEventListener("click", clearCallBack);
canvas.addEventListener("click", canvasCallBack);


/*
var drawRect = function(x, y){
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(x-15,y-15,30,30);
};
//var isRect = true;
//isRect = !isRect;
*/
