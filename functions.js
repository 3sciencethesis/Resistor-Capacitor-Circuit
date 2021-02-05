var imgConnected;
var imgDisconnected;

var graph1;
var graph2;

var isrunning = false;

function setup() {
  createCanvas(750,500);
  
  Q = 0;
  I = 0;

  graph1 = new Graph();
  graph2 = new Graph();
  
  graph1.colorFunction = color(255,177,100); //orange
  graph1.xTitle = "time";

  graph2.colorFunction = color(0,191,191); //aqua
  
  this.focus();
  
 }

// Draw the ship and other stuff
function display() { 
    background(255);
    stroke(0);
    strokeWeight(2);
    if (keyIsPressed) {
      isrunning = true;
    }
  
   textSize(14);
   noStroke();
   text("Press C to connect the switch to the battery.",30,25);
  text("Press D to disconnect the switch from the battery.", 30, 43)
  
    textSize(15)
  fill (127,0,255) //violet
  noStroke();
  text("Source", 15, 134 );
  fill (34,139,34); //forest green
  noStroke();
  text ("Capacitor", 225, 120); 
  fill (178,34,34); //firebrick red
  noStroke();
  text("Resistor", 470, 130);

   if ( battery_is_connected == true) {
    image(imgConnected,0.05*width,0.1*height);
   } else {
    image(imgDisconnected,0.05*width,0.1*height);
   }

    textSize(20);
    fill(255,177,100); // orange
  	noStroke();
    text("Charge on the Capacitor",250,325);
    fill(0,191,191); // aqua
  	noStroke();
    text("Current in the Resistor",250,350);

    fill(0,0,0); //If more text is written elsewhere make sure the default is black
    stroke(0,0,0); // If more lines are drawn elsewhere make sure the default is black
    
   graph1.increaseMarginFactor = 1.1;
   graph2.increaseMarginFactor = 2.0;
}

function Graph() {
  
  m_x = 500;
  m_y = 250;
  
  m_size_x = 200;
  m_size_y = 200;
  
  fontSize = 25;
  
  this.DataArray = [];
  this.PlotArray = [];
  
  this.colorFunction = color(0,0,0);

  this.xTitle = "";
  this.yTitle = "";
  
  this.minY = 0;
  this.maxY = 0;
  
  this.increaseMarginFactor = 1.1;
  
  this.display = function() {
    this.setTitle();
    this.setAxes();
    this.calcPlotArray();
    this.drawPoints();
    //print(this.DataArray);
  }
  
  this.setTitle = function (){
    textSize(fontSize);
    fill(0,0,0);
    noStroke();
    text(this.xTitle, (m_x + m_size_x - this.xTitle.length*fontSize/2), (m_y + m_size_y + 25));
    text(this.yTitle, (m_x - 25),(m_y + fontSize));    
  }
  
  this.setAxes = function() {
    stroke(0);
    strokeWeight(2);
    line(m_x,m_y,m_x,m_y+m_size_y);
    line(m_x,m_y+m_size_y,m_x+m_size_x,m_y+m_size_y);
  }
  
  this.addPoint = function( newpoint ) {
  if (isrunning) {
   append(this.DataArray, newpoint); 
  }
  }
  
  this.calcPlotArray = function() {
   //this.minY = min(this.DataArray);
   this.minY = 0; 
   this.maxY = this.increaseMarginFactor*max(this.DataArray);
  // this.PlotArray = m_size_y*this.DataArray/this.maxY;
    //this.PlotArray = this.DataArray;
    for(var i = 0; i < this.DataArray.length ; i++){
     this.PlotArray[i] = m_size_y*this.DataArray[i]/this.maxY; 
    }
  }

  this.drawPoints = function() {
   for (var i = 1; i < this.PlotArray.length ; i++) {
    //print(i);
    xi = m_size_x*i/this.PlotArray.length;
    xi_previous = m_size_x*(i-1)/this.PlotArray.length;
     //print(xi);
     strokeWeight(2);
     //stroke(0);
    stroke(this.colorFunction);
//    point(m_x+xi,m_y+m_size_y-this.PlotArray[i]);
     line(m_x+xi,m_y+m_size_y-this.PlotArray[i],m_x+xi_previous,m_y+m_size_y-this.PlotArray[i-1]);
   }
  }
  
  /*  
  this.drawPoints = function () {
   this.minY = min(this.Array);
   this.maxY = increaseMarginFactor*max(this.Array);
    
   for(var xi = 0; xi < this.m_size_x ; xi++ ) {
     pos = this.Array.length*xi/m_size_x;
     
        x1 = oxi + m_x;
        y1 = oyi + m_y + m_size_y;
        x2 = xi + m_x;
        y2 = yi + m_y + m_size_y; 
   }
    
  }
*/  
  
}