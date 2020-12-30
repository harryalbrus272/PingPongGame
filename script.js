var ball = document.getElementById('ball');
var bar = document.getElementsByClassName('bar');
var main = document.querySelector('main');
var playground = document.getElementById('playground');
var sd = document.querySelector('#score p');
var score = 0;
let gameOn = false;
var movement;
const upperBar = bar[0];
const lowerBar = bar[1];
let ballSpeedX = 2;
let ballSpeedY = 2;
const moveBy = 20;
const barOffsetWidth = upperBar.offsetWidth;
const barOffsetHeight = upperBar.offsetHeight;
const ballDim = ball.offsetWidth;
var hs = localStorage.getItem('highScore');
var lever = 1;

function updateScore() {
  sd.innerText = score;
  if (hs == null) {
    alert("You are the first one to play the game on your device");
  }
}
updateScore();

function alignMiddle() {
  upperBar.style.left = (window.innerWidth - barOffsetWidth) / 2 + "px";
  lowerBar.style.left = (window.innerWidth - barOffsetWidth) / 2 + "px";
  lowerBar.style.top = window.innerHeight - 18 + "px";
  ball.style.left = (window.innerWidth - ballDim) / 2 + "px";
  if(lever==2){
    ball.style.bottom = lowerBar.getBoundingClientRect().top-80+"px";
  } else if(lever==1){
    ball.style.top = 2+"px";
  }
  playground.style.height = lowerBar.getBoundingClientRect().top - upperBar.getBoundingClientRect().bottom + "px";
}

function exitCode() {
  if (movement != undefined) {
    clearInterval(movement);
    alert("Game ends with score" + score);
  }
  if (score > parseInt(hs)) {
    alert("You made a high score!");
    localStorage.setItem('highScore', score);
    hs = score;
  }
  localStorage.setItem('rodName',lever);
  gameOn = false;
  score = 0;
  alignMiddle();
}
alignMiddle();
window.addEventListener('resize', alignMiddle);
window.addEventListener('keydown', function(event) {
  let lft = upperBar.getBoundingClientRect();
  let key = event.key;
  if ((key == "d" || key == "D" || key == "ArrowRight") && lft.right <= window.innerWidth) {
    let n = parseInt(lft.left) + moveBy + "px";
    upperBar.style.left = n;
    lowerBar.style.left = n;
  } else if ((key == 'a' || key == 'A' || key == "ArrowLeft") && lft.left >= 0) {
    let n = parseInt(lft.left) - moveBy + "px";
    upperBar.style.left = n;
    lowerBar.style.left = n;
  } else if (key == 'Enter') {
    if (!gameOn) {
      gameOn = true;
      let ballRect = ball.getBoundingClientRect();
      let ballX = ballRect.x;
      let ballY = ballRect.y;
      ballY -= 80;                   //adjustment for the y-axis from the top
      movement = setInterval(function() {
        let rod1X = upperBar.getBoundingClientRect().x;
        let rod2X = lowerBar.getBoundingClientRect().x;
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
        if ((ballX + ballDim) > window.innerWidth || ballX < 0) {
          ballSpeedX = -ballSpeedX;
        }
        let ballPos = ballX + ballDim / 2;
        if ((ballY + ballDim) >= playground.offsetHeight) { // to stop the ball before it reaches the lower bar(3 execution before- mostly based on practical results)
          if(lever==1){
            ballSpeedY = -ballSpeedY;
          }
          lever = 2;
          if ((ballPos < rod1X) || (ballPos > (rod1X + barOffsetWidth))) {
            lever = 2;
            exitCode();
          } else {
            score++;
            updateScore();
          }

        } else if (ballY <= (playground.getBoundingClientRect().top - playground.getBoundingClientRect().y)) {
          if(lever==2){
            ballSpeedY = -ballSpeedY;
          }
            lever = 1;
          if ((ballPos < rod2X) || (ballPos > (rod2X + barOffsetWidth))) {
            exitCode();
          } else {
            score++;
            updateScore();
          }
        }

      }, 10);

    }
  }
});
