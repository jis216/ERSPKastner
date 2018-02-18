const width = 1000;
const shrimpSize = 40;
const aueSize = 100;
const soundSpeed = 1500;
const sampFreq = 65501;

var snapAngle = 90;
var shrimpPos = 200;
var auePosX = 620;
var auePosY = 100;
var refPos = 500;
var ref2Pos = 500;
var ref3Pos = 300;
var meterToPixel = 5;
var height = 50 * meterToPixel;

var movingShrimp, movingAngle, movingAue, movingAngle2, movingAngle3 = false;
var showFirstPath = true;
var showSecondPath = false;
function setup(){
  let cnv = createCanvas(width, 600);
  background('lightblue');
  cnv.parent("canvas");

  firstbox = createCheckbox('show first ref. path', true);
  firstbox.changed(showFirst);
  firstbox.position(410, 10);
  secondbox = createCheckbox('show second ref. path', false);
  secondbox.changed(showSecond);
  secondbox.position(410, 40);

  depth = createSlider(35, 75, 50);
  depth.position(410, 60);
  height = depth.value() * meterToPixel;
  drawFloor(height);

  updateDirectLength();
  updateAngle();
  updateAngle2();
  updateAngle3();
  updateSurfaceLength();
  updateTotalLength();
  updateDepth();

}

function draw(){
  background('lightblue');
  drawFloor(height);

  drawShrimp(shrimpPos);
  drawAUE(auePosX, auePosY);
  drawAngle(refPos, 0, 'purple');
  drawAngle(ref2Pos, height, 'green');
  drawAngle(ref3Pos, 0, 'green');
  drawReflectionWave();

  height = depth.value() * meterToPixel;

}
function drawFloor(depth){
  fill('brown');
  rect(0, depth, width, 600 );
}

function drawShrimp(){
    fill('pink');
    ellipse(shrimpPos, height, shrimpSize, shrimpSize);
    fill('black')
    text((auePosX - shrimpPos)/meterToPixel, shrimpPos+10, height + 10);

}

function drawAUE(x, y){
  fill('yellow');
  ellipse(x, y, aueSize, aueSize);
  fill('black');
  ellipse(x, y, 5, 5);
  text(y / meterToPixel, x + 10, y + 10);
}

function drawAngle(x, y, color){
  fill(color);
  ellipse(x + 5, y, 15, 15);
  fill('black')
  text((auePosX -x) / meterToPixel, x + 10, y + 10);

}

function drawReflectionWave(){
  stroke('black')
  line(shrimpPos, height, auePosX, auePosY);
  if(showFirstPath){
  stroke('purple')
  line(shrimpPos, height, refPos, 0);

  line(refPos, 0, 2 * refPos - shrimpPos, height);
  }
  if(showSecondPath){
    stroke('green')
    line(shrimpPos, height, ref3Pos, 0);
    line(ref3Pos, 0, ref2Pos, height);
    line(ref2Pos, height, 2 * ref2Pos - ref3Pos, 0);
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

  var insAngle3 = dist(mouseX, mouseY, ref3Pos, 0);
  if( insAngle3 < 7.5){
      movingAngle3 = true;
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
    ref3Pos = (ref2Pos + shrimpPos)/2;
  }
  if(movingAngle3){
    ref3Pos = mouseX;
  }
  updateDirectLength();

  updateAngle();
  updateAngle2();
  updateSurfaceLength();
  updateTotalLength();
  updateDepth();
  updateAngle3();
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
        ref3Pos = (ref2Pos + shrimpPos)/2;
    movingAngle2 = false;
  }

  if(movingAngle3){
    ref3Pos = mouseX;
    movingAngle3 = false;
  }
  updateDirectLength();
  updateAngle();
  updateSurfaceLength();
  updateTotalLength();
  updateAngle2();
  updateAngle3();
  updateDepth();

}
function updateAngle(){
   p = document.getElementById("angle");
   p.innerHTML = "FIRST ANGLE OF REFLECTION: " +
   Math.abs(Math.atan((refPos-shrimpPos)/height)*180/3.14).toFixed(2)
}
function updateAngle2(){
   p = document.getElementById("angle2");
   p.innerHTML = "SECOND ANGLE OF REFLECTION: " +
   Math.abs(Math.atan((ref3Pos-shrimpPos)/height)*180/3.14).toFixed(2) + " ERROR!"
}
function updateAngle3(){
   p = document.getElementById("angle3");
   p.innerHTML = "SECOND ANGLE OF REFLECTION 2: " +
   Math.abs(Math.atan((ref2Pos-ref3Pos)/height)*180/3.14).toFixed(2)
}

function updateDirectLength(){
   dista = dist(shrimpPos, height, auePosX, auePosY)/meterToPixel;
   time = dista/soundSpeed;
   samples = time * sampFreq;
   p = document.getElementById("direct");
   p.innerHTML = "DIRECT PATH LENGTH: " + dista.toFixed(2) + "m";

   p = document.getElementById("directtime");
   p.innerHTML = "DIRECT TIME LENGTH: " + (time * 1000).toFixed(2) + "ms";
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
  diff = (dist2 + dist3);
  time = (diff)/soundSpeed;
  samples = time * 65501;
  p = document.getElementById("surface");
  p.innerHTML = "ADD. SURFACE PATH LENGTH: " + (diff).toFixed(2) + "m";

  p = document.getElementById("surfacetime");
  p.innerHTML = "ADD. SURFACE TIME LENGTH: " + (time * 1000).toFixed(2) + "ms";

  p = document.getElementById("surfacesamps");
  p.innerHTML = "ADD. SURFACE PATH SAMPLE COUNT: " + samples.toFixed(0);
}

function updateTotalLength(){

  //Distance from shrimp to AUE
  dist1 = dist(shrimpPos, height, auePosX, auePosY)/meterToPixel;
  //Distance from Shrimp to Angle
  dist2 = dist(shrimpPos, height, refPos, 0)/meterToPixel;
  //Distance from Angle to AUV
  dist3 = dist(refPos, 0, auePosX, auePosY)/meterToPixel;

  //Distance from Shrimp to Angle3
  dist4 = dist(shrimpPos, height, ref3Pos, 0)/meterToPixel;
  //Distance from Angle3 to Angle2
  dist5 = dist(ref3Pos, 0, ref2Pos, height)/meterToPixel;
  //Distance from Angle2 to AUE
  dist6 = dist(ref2Pos, height, auePosX, auePosY)/meterToPixel;
  diff = (dist4+dist5+dist6) - (dist1);
  time = diff/soundSpeed;
  samples = time * sampFreq;
  p = document.getElementById("total");
  p.innerHTML = "ADD. TOTAL PATH LENGTH: " + diff.toFixed(2) + "m";

  p = document.getElementById("totaltime");
  p.innerHTML = "ADD. TOTAL TIME LENGTH: " + (time * 1000).toFixed(2) + "ms";

  p = document.getElementById("totalsamps");
  p.innerHTML = "ADD. TOTAL PATH SAMPLE COUNT: " + samples.toFixed(0);
}

function updateDepth(){
  p = document.getElementById("depth");
  p.innerHTML = "DEPTH: " + depth.value() + "m";

}

function changeRatio(){
  meterToPixel = document.getElementById("ratio").value;
  console.log(meterToPixel);
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

function basic(){

  console.log(auePosX);
  auePosX = 400;
  auePosY = 10 * meterToPixel;
  refPos = 400;
  ref2Pos = 400;
  ref3Pos = 400;
  shrimpPos = 400;
}
