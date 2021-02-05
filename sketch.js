Q = 0; //initial value
I = 0; //initial value

Vcap=0;
C = 0.375;

Vbatt = 10; // Volts

R = 5; // Ohms

dt = 0.1;

battery_is_connected = false;

function preload() {
  imgDisconnected = loadImage("RCdisconnected.png");
  imgConnected = loadImage("RCconnected.png");
}


function draw() {
  
  if (keyIsPressed) {
   if (key == 'c') battery_is_connected = true;
   if (key == 'd') battery_is_connected = false;
  }
    
  if ( battery_is_connected == true) {
    I = 0;
    Vcap = Vbatt;
    Q = C*Vcap;
  } else {
    I = Vcap/R;
    Q += -I*dt;
    Vcap = Q/C;
  }
  
  
  display();

  graph1.addPoint(Q);
  graph1.display();
  print("Q = ",Q); // Uncomment if curious about precise value of Q
  
  graph2.addPoint(I);
  graph2.display();
print("I = ",I); // Uncomment if curious about precise value of I

} // end draw()