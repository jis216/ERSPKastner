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
var showTime = false;
function setup(){
  let cnv = createCanvas(width, 600);
  background('lightblue');
  cnv.parent("canvas");

  button = createButton('change to time/dist');
  button.position(15, 90);
  button.mousePressed(change);
  firstbox = createCheckbox('show first ref. path', true);
  firstbox.changed(showFirst);
  firstbox.position(15, 10);
  secondbox = createCheckbox('show second ref. path', false);
  secondbox.changed(showSecond);
  secondbox.position(15, 40);

  depth = createSlider(35, 75, 50);
  depth.position(15, 60);
  height = depth.value() * meterToPixel;
  drawFloor(height);
  drawText(showTime);
  /*
  updateDirectLength();
  updateAngle();
  updateAngle2();
  updateAngle3();
  updateSurfaceLength();
  updateTotalLength(); */
//  updateDepth();

}

function drawText(time){
  ratio = meterToPixel;
  fills = "";
  if(time){
   ratio = ratio*soundSpeed/ 1000;
   fills = "s"
  }

  fill('black')
  //Floor
  text(height/meterToPixel + "m", 100, height)
  //shrimp
  text(((auePosX - shrimpPos)/meterToPixel).toFixed(2) + "m", shrimpPos+10, height + 10);
  //aue
  text((auePosY /meterToPixel).toFixed(2) + "m", auePosX+ 10, auePosY + 10);
  //direct
  text((dist(shrimpPos, height, auePosX, auePosY)/ratio).toFixed(2) +"m"+fills, (shrimpPos+auePosX)/2, (height+auePosY)/2 );

  //ref2
  if(showSecondPath){
    text((distof2()/ratio).toFixed(2) +"m"+fills, (shrimpPos+ref3Pos)/2, (height)/2 );
  }
  if(showFirstPath){
   text((distof1()/ratio).toFixed(2) +"m"+fills, (refPos+auePosX)/2, (auePosY)/2 );
}

}
function distof1(){
  return dist(shrimpPos, height, ref3Pos, 0) + dist(ref3Pos, 0, auePosX, auePosY);
}
function distof2(){
  return dist(shrimpPos, height, ref2Pos, 0) + dist(ref2Pos, 0, ref3Pos, height) + dist(ref3Pos, height, auePosX, auePosY);
}

function draw(){
  background('lightblue');
  drawFloor(height);

  drawShrimp(shrimpPos);
  drawAUE(auePosX, auePosY);
  if(showFirstPath)
  drawAngle(refPos, 0, 'purple');
  if(showSecondPath){
  drawAngle(ref2Pos, height, 'green');
  drawAngle(ref3Pos, 0, 'green');
}
  drawReflectionWave();
  drawText(showTime);
  height = depth.value() * meterToPixel;

}
function drawFloor(depth){
  fill('brown');
  rect(0, depth, width, 600 );
  fill('black')
//  text(height/meterToPixel + "m", 300, depth)
}

function drawShrimp(){
    fill('pink');
    ellipse(shrimpPos, height, shrimpSize, shrimpSize);
    fill('black')
  //  text((auePosX - shrimpPos)/meterToPixel + "m", shrimpPos+10, height + 10);

}

function drawAUE(x, y){
  fill('yellow');
  ellipse(x, y, aueSize, aueSize);
  fill('black');
  ellipse(x, y, 5, 5);
//  text(y / meterToPixel + "m", x + 10, y + 10);
}

function drawAngle(x, y, color){
  fill(color);
  ellipse(x + 5, y, 15, 15);
  fill('black')
//  text(((auePosX -x) / meterToPixel).toFixed(2) + "m", x + 10, y + 10);

}

function drawReflectionWave(){
  stroke('black')
  line(shrimpPos, height, auePosX, auePosY);
  if(showFirstPath){
  stroke('purple')
  line(shrimpPos, height, refPos, 0);
  line(refPos, 0, auePosX, auePosY);
//  line(refPos, 0, 2 * refPos - shrimpPos, height);
  }
  if(showSecondPath){
    stroke('green')
    line(shrimpPos, height, ref3Pos, 0);
    line(ref3Pos, 0, ref2Pos, height);
    line(ref2Pos, height, auePosX, auePosY);

  //  line(ref2Pos, height, 2 * ref2Pos - ref3Pos, 0);
  }
  stroke('black');
}

function mousePressed() {
  // Check if mouse is inside the circle
  var insShrimp = dist(mouseX, mouseY, shrimpPos, height);
  if (insShrimp < shrimpSize/2) {
       movingShrimp = true;
  }
  /*
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
  */
  var insAue = dist(mouseX, mouseY, auePosX, auePosY);
  if( insAue < aueSize/2 ){
      movingAue = true;
  }

}

function mouseDragged() {
  if(movingAue){
    auePosX = mouseX;
    auePosY = mouseY;

    refPos = (height*auePosX + auePosY*shrimpPos)/(height+auePosY).toFixed(2)
//    ref3Pos = (height*auePosY - auePosY*auePosY - height*auePosX)/(height-2*auePosY)
    ref3Pos = (auePosX- shrimpPos)*(height)/(3*height- auePosY) + shrimpPos
    ref2Pos = 2*ref3Pos - shrimpPos
  }
  if(movingShrimp){
    shrimpPos = mouseX;
    refPos = (height*auePosX + auePosY*shrimpPos)/(height+auePosY).toFixed(2)
//    ref3Pos = (height*auePosY - auePosY*auePosY - height*auePosX)/(height-2*auePosY)
    ref3Pos = (auePosX- shrimpPos)*(height)/(3*height- auePosY) + shrimpPos
    ref2Pos = 2*ref3Pos - shrimpPos

  }
  /*
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
  */
//  updateDirectLength();
  //updateAngle();
  //updateAngle2();
  //updateSurfaceLength();
  //updateTotalLength();
  //updateDepth();
  //updateAngle3();
}

function mouseReleased(){
  if(movingAue){
    auePosX = mouseX;
    auePosY = mouseY;
    movingAue = false;
    refPos = (height*auePosX + auePosY*shrimpPos)/(height+auePosY).toFixed(2)
//    ref3Pos = (height*auePosY - auePosY*auePosY - height*auePosX)/(height-2*auePosY)
    ref3Pos = (auePosX- shrimpPos)*(height)/(3*height- auePosY) + shrimpPos
    ref2Pos = 2*ref3Pos - shrimpPos
  }

  if(movingShrimp){
    shrimpPos = mouseX;
    refPos = (height*auePosX + auePosY*shrimpPos)/(height+auePosY).toFixed(2)
//    ref3Pos = (height*auePosY - auePosY*auePosY - height*auePosX)/(height-2*auePosY)
    ref3Pos = (auePosX- shrimpPos)*(height)/(3*height- auePosY) + shrimpPos
    ref2Pos = 2*ref3Pos - shrimpPos

    movingShrimp = false;
  }
  /*
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
  */
/*  updateDirectLength();
  updateAngle();
  updateSurfaceLength();
  updateTotalLength();
  updateAngle2();
  updateAngle3(); */
//  updateDepth();

}
function updateAngle(){
   p = document.getElementById("angle");
   p.innerHTML = "FIRST ANGLE OF REFLECTION: " +
   Math.abs(Math.atan((refPos-shrimpPos)/height)*180/3.14).toFixed(2)
}
function updateAngle2(){
   p = document.getElementById("angle2");
   p.innerHTML = "SECOND ANGLE OF REFLECTION: " +
   Math.abs(Math.atan((ref3Pos-shrimpPos)/height)*180/3.14).toFixed(2)
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
  // p = document.getElementById("direct");
  // p.innerHTML = "DIRECT PATH LENGTH: " + dista.toFixed(2) + "m";

  //p = document.getElementById("directtime");
  // p.innerHTML = "DIRECT TIME LENGTH: " + (time * 1000).toFixed(2) + "ms";
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
/*
function updateDepth(){
  p = document.getElementById("depth");
  p.innerHTML = "DEPTH: " + depth.value() + "m";

} */

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

function change(){

  showTime = !showTime;
  /*
  console.log(auePosX);
  auePosX = 400;
  auePosY = 10 * meterToPixel;
  refPos = 400;
  ref2Pos = 400;
  ref3Pos = 400;
  shrimpPos = 400; */
}
