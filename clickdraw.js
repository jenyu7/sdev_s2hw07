/*
 * Jen Yu 
 * SoftDev Period 7
 * 02-05-2018
 * K#01: It's about CONNECTION
 */

var svg = document.getElementById("slate");

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

var svgCallBack = function(e){
    e.preventDefault();
    if (e.target != svg){return;}
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
	var l = document.createElementNS("http://www.w3.org/2000/svg", "line");
	l.setAttribute("x1", prevX);
	l.setAttribute("y1", prevY);
	l.setAttribute("x2", cors[0]);
	l.setAttribute("y2", cors[1]);
	l.setAttribute("stroke", "black");
	svg.appendChild(l);
    }
    console.log(cors);
    //circle just drawn -> store coordinates for next drawn circle
    prevX = cors[0];
    prevY = cors[1];   
};

//draws a dot, returns the x and y coordinates in a list
var drawDot = function(x, y){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", 10);
    c.setAttribute("fill", "red");
    c.setAttribute("stroke", "black");
    svg.appendChild(c);
    return [x, y]
};

//clears the screen and resets the prevX and prevY variables
var clearCallBack = function(e){
    /*
    var rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect.setAttribute("x", 0);
    rect.setAttribute("y", 0);
    rect.setAttribute("width", 500);
    rect.setAttribute("height", 500);
    rect.setAttribute("fill", "white");
    svg.appendChild(rect);
    console.log("cleared");*/
    while(svg.firstChild){
	svg.removeChild(svg.firstChild);
    }
    prevX, prevY = null;
};

//add the event listeners
toggle.addEventListener("click", toggleCallBack);
clear.addEventListener("click", clearCallBack);
svg.addEventListener("click", svgCallBack);


/*
var drawRect = function(x, y){
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(x-15,y-15,30,30);
};
//var isRect = true;
//isRect = !isRect;
*/
