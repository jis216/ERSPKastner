const width = 800;
const height = 500;
const shrimpSize = 40;
const aueSize = 100;

var snapAngle = 90;
var shrimpPos = 200;
var auePosX = 400;
var auePosY = 100;
var refPos = 400;
var ref2Pos = 400;
var meterToPixel = 10;
var soundSpeed = 1500;
var movingShrimp, movingAngle, movingAue, movingAngle2 = false;
var showFirstPath = true;
var showSecondPath = false;
function setup(){

  let cnv = createCanvas(width, height);
  background('lightblue');
  cnv.parent("canvas");

  firstbox = createCheckbox('show first path', true);
  firstbox.changed(showFirst);
  firstbox.position(10, 10);
  secondbox = createCheckbox('show second path', false);
  secondbox.changed(showSecond);
  secondbox.position(10, 40);
  updateDirectLength();
  updateAngle();
  updateSurfaceLength();
  updateTotalLength();

}

function draw(){
  background('lightblue');

  drawShrimp(shrimpPos);
  drawAUE(auePosX, auePosY);
  drawAngle(refPos, 0);
  drawAngle(ref2Pos, height);
  drawReflectionWave();
}

function drawShrimp(){
    fill('pink');
    ellipse(shrimpPos, height, shrimpSize, shrimpSize);
}

function drawAUE(x, y){
  fill('yellow');
  ellipse(x, y, aueSize, aueSize);
  fill('black');
  ellipse(x, y, 5, 5);
}

function drawAngle(x, y){
  fill('red');
  ellipse(x + 5 * cos(snapAngle), y, 15, 15);
}

function drawReflectionWave(){
  stroke('black')
    line(shrimpPos, height, refPos, 0);
  if(showFirstPath){
  stroke('purple')
  line(refPos, 0, 2 * refPos - shrimpPos, height);
  }
  if(showSecondPath){
    stroke('green')
    line(refPos, 0, ref2Pos, height);
    line(ref2Pos, height, 2 * ref2Pos - refPos, 0);
  }
  stroke('black');
}

function mousePressed() {
  // Check if mouse is inside the circle
  var insShrimp = dist(mouseX, mouseY, shrimpPos, height);
  if (insShrimp < shrimpSize/2) {
       movingShrimp = true;
  }
  var insAngle = dist(mouseX, mouseY, refPos, 0);
  if( insAngle < 7.5){
      movingAngle = true;
  }

  var insAngle2 = dist(mouseX, mouseY, ref2Pos, height);
  if( insAngle2 < 7.5){
      movingAngle2 = true;
  }

  var insAue = dist(mouseX, mouseY, auePosX, auePosY);
  if( insAue < aueSize/2 ){
      movingAue = true;
  }

}

function mouseDragged() {
  if(movingAue){
    auePosX = mouseX;
    auePosY = mouseY;
  }
  if(movingShrimp){
    shrimpPos = mouseX;
  }
  if(movingAngle){
    refPos = mouseX;
  }
  if(movingAngle2){
    ref2Pos = mouseX;
  }
  updateDirectLength();

  updateAngle();
  updateAngle2();
  updateSurfaceLength();
  updateTotalLength();
}

function mouseReleased(){
  if(movingAue){
    auePosX = mouseX;
    auePosY = mouseY;
    movingAue = false;
  }
  if(movingShrimp){
    shrimpPos = mouseX;
    movingShrimp = false;
  }
  if(movingAngle){
    refPos = mouseX;
    movingAngle = false;
  }

  if(movingAngle2){
    ref2Pos = mouseX;
    movingAngle2 = false;
  }
  updateDirectLength();
  updateAngle();
  updateSurfaceLength();
  updateTotalLength();
  updateAngle2();

}
function updateAngle(){
   p = document.getElementById("angle");
   p.innerHTML = "ANGLE OF REFLECTION: " +
   Math.abs(Math.atan((refPos-shrimpPos)/height)*180/3.14)
}
function updateAngle2(){
   p = document.getElementById("angle2");
   p.innerHTML = "ANGLE OF REFLECTION 2: " +
   Math.abs(Math.atan((ref2Pos-refPos)/height)*180/3.14)
}

function updateDirectLength(){
   dista = dist(shrimpPos, height, auePosX, auePosY)/meterToPixel;
   time = dista/soundSpeed;
   samples = time * 65501;
   p = document.getElementById("direct");
   p.innerHTML = "DIRECT PATH LENGTH: " + dista;

   p = document.getElementById("directtime");
   p.innerHTML = "DIRECT TIME LENGTH: " + time;
/*
   p = document.getElementById("directsamps");
   p.innerHTML = "DIRECT PATH SAMPLE COUNT: " + samples;
*/
}

function updateSurfaceLength(){
  //Distance from shrimp to AUV
  dist1 = dist(shrimpPos, height, auePosX, auePosY)/meterToPixel;
  //Distance from Shrimp to Angle
  dist2 = dist(shrimpPos, height, refPos, 0)/meterToPixel;
  //Distance from Angle to AUV
  dist3 = dist(refPos, 0, auePosX, auePosY)/meterToPixel;
  diff = (dist2 + dist3) - dist1;
  time = (diff)/soundSpeed;
  samples = time * 65501;
  p = document.getElementById("surface");
  p.innerHTML = "ADD. SURFACE PATH LENGTH: " + (diff);

  p = document.getElementById("surfacetime");
  p.innerHTML = "SURFACE TIME LENGTH: " + time * 1000 + "ms";

  p = document.getElementById("surfacesamps");
  p.innerHTML = "SURFACE PATH SAMPLE COUNT: " + samples;
}

function updateTotalLength(){

  //Distance from shrimp to AUE
  dist1 = dist(shrimpPos, height, auePosX, auePosY)/meterToPixel;
  //Distance from Shrimp to Angle
  dist2 = dist(shrimpPos, height, refPos, 0)/meterToPixel;
  //Distance from Angle to Angle2
  dist3 = dist(refPos, 0, ref2Pos, height)/meterToPixel;
  //Distance from Angle2 to AUE
  dist4 = dist(ref2Pos, height, auePosX, auePosY);
  diff = (dist2+dist3+dist4) - dist1;
  time = dista/soundSpeed;
  samples = time * 65501;
  p = document.getElementById("total");
  p.innerHTML = "ADD. TOTAL PATH LENGTH: " + diff;

  p = document.getElementById("totaltime");
  p.innerHTML = "TOTAL TIME LENGTH: " + time;

  p = document.getElementById("totalsamps");
  p.innerHTML = "TOTAL PATH SAMPLE COUNT: " + samples;
}

function changeRatio(){
  meterToPixel = document.getElementById("change").value;
  console.log("changed");
}

function showSecond(){
  if (this.checked()) {
   showSecondPath = true;
 } else {
   showSecondPath = false;
 }
}

function showFirst(){
  if (this.checked()) {
   showFirstPath = true;
 } else {
   showFirstPath = false;
 }
}
