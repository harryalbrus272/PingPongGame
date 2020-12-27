var mid = window.innerWidth/2;
var bar = document.getElementsByClassName('bar');
var ball = document.getElementById('ball');
var scorebox = document.querySelector('#score p');
var mainDim=document.querySelector('main');
var playDim = document.getElementById('playground');
var scr = 0;
var highScore = 0;
const moveBy= 10;
if(localStorage.getItem("highScore") == null){
  localStorage.setItem("highScore",scr);
}
localStorage.setItem("highScore",30);
console.log(localStorage.getItem("highScore"));
alignMiddle();
window.addEventListener('resize', alignMiddle);
function updateScore(currscore){
  scorebox.innerText=currscore;
}
updateScore(0);
function barPosition(){
  return bar[0].getBoundingClientRect();
}
function ballPosition(){
  return ball.getBoundingClientRect();
}
function alignMiddle(){
  playDim.style.width=window.innerWidth-6+"px";
  playDim.style.height=mainDim.getBoundingClientRect().height-34 +"px";
  mid = mainDim.getBoundingClientRect().width/2;
  let local1 = ball.getBoundingClientRect().width/2;
  let local2 = bar[0].getBoundingClientRect().width/2;
  ball.style.left = (mainDim.getBoundingClientRect().width-6)/2 - local1 +"px";
  bar[0].style.left = mid - local2 +"px";
  bar[1].style.left = mid  - local2 +"px";

}
function ballMoving(){
  
}
window.addEventListener('keydown',function(event){
  let key=event.key;
  if ((key == "d" || key == "D" || key=="ArrowRight") && barPosition().right <= playDim.getBoundingClientRect().width) {
    let n = parseInt(barPosition().left) + moveBy + "px";
    bar[0].style.left = n;
    bar[1].style.left = n;
  }  else if ((key == 'a' || key == 'A' || key=="ArrowLeft") && barPosition().left >= 0) {
    let n = parseInt(barPosition().left) - moveBy + "px";
    bar[0].style.left = n;
    bar[1].style.left = n;
  } else if ( key == 'Enter') {
    alert("Starting game");
    ballMoving();
  }
});
