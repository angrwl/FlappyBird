
const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// load images and audio
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeDown = new Image();
let fly = new Audio();
let scor = new Audio();
let die = new Audio();

bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
fg.src = 'images/base.png';
pipeUp.src = 'images/pipeUp.png';
pipeDown.src = 'images/pipeDown.png';
fly.src = 'audio/wing.wav';
scor.src = 'audio/point.wav';
die.src = 'audio/hit.wav';


// some variables
let gap = 100; //gap between 2 pipes

const constant = canvas.height-(pipeUp.height+gap);  //for the distance between two pipes
let pipe = []; //this is for random pipes
pipe[0] = {pX: 150, pY: Math.floor(Math.random()*-230) }  //first entry randoming generated

// starting coordinates for the birds
let bX = 20;
let bY = 250;
const gravity = 1.5;  //rate at which the bird drops every animation

let score = 0;   //way of keeping track of score
function drawScore() {
    ctx.font = "20px Verdana";  //font
    ctx.fillStyle = "black"; //colour
    ctx.fillText("Score: " + score, 8, canvas.height - 20); //position
}

// press key
document.addEventListener('keydown',keyDownHandler);


function keyDownHandler() {  //if you press any key, the bird moves

  bY -= 40;
  fly.play();

}


const eps = 5; //for some boundary, bird died even if it was too close to the pipe so I added some esp

function draw() {
  ctx.drawImage(bg,0,0);
  for (let i = 0; i<pipe.length;i++) {
    ctx.drawImage(pipeUp, pipe[i].pX, pipe[i].pY);
    ctx.drawImage(pipeDown, pipe[i].pX, pipe[i].pY+constant);
    pipe[i].pX--;  //to make pipe move to the left


    if (pipe[i].pX == 90) {   //add new pipes every few inches
      pipe.push({pX: canvas.width, pY: Math.floor(Math.random()*-230)})

    }
    //all the conditions for collision detection
    if ((pipe[i].pX <= bX + bird.width && bX<= pipe[i].pX + pipeUp.width - eps &&
      (bY <= pipe[i].pY + pipeUp.height - eps || bY + bird.height>= pipe[i].pY+constant+eps)) || (bY+bird.height>= canvas.height-fg.height)) {
      die.play();
      alert('Game Over, you have scored '+ score + ' points ');
      document.location.reload();
    } else {
      ctx.drawImage(bird,bX,bY);
    }
    if (pipe[i].pX ==5) {
      score++;
      scor.play();
    }
  }

  bY += gravity;
  ctx.drawImage(fg,0,canvas.height-fg.height);

  drawScore();
  window.requestAnimationFrame(draw);

}

window.requestAnimationFrame(draw);
