
var ball = createSprite (200,200,10,10);
ball.setAnimation("ball.png");
ball.scale = 0.1;




var nobita = createSprite(370,200,10,70);
nobita.setAnimation("nobita-removebg-preview.png")
var dorimon = createSprite(10,200,10,70);
dorimon.setAnimation("doraemon-removebg-preview.png");



var gameState = "serve";

//score
var dorimonScore = 0;
var nobitaScore = 0;


function draw() {
	createCanvas(400,400);
  //clear the screen
  background("white");
  

   if(keyWentDown("space"))
   {nobita.setAnimation("nobita3-removebg-preview.png");}
   
   if(keyWentUp("space"))
  {nobita.setAnimation("nobita-removebg-preview.png")}
  
   

  
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
   if(gameState ==="serve")
   {text("press space for change nobita",140,60)}

   if(dorimonScore === +1){
	   dorimon.setAnimation("Doraemon3-removebg-preview.png");
   }
 
  //display scores
  text(dorimonScore, 170,20);
  text(nobitaScore, 230,20);
  
  //make the nobita paddle move with the mouse y position
  nobita.y = World.mouseY;
  
  
  //make it move with the ball y position
  dorimon.y = ball.y;
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
  //create edge boundaries
  createEdgeSprites();
  

  
   
  
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  ball.bounceOff(nobita);
  ball.bounceOff(dorimon);
 
 
  //serve the ball when space is pressed
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
   //playSound("score.mp3");
    if(ball.x > 400) {
      dorimonScore = dorimonScore + 1;
      //nobita.setAnimation("nobita_fall");
    }
     
    if(ball.x < 0) {
      nobitaScore = nobitaScore + 1;
	  nobita.setAnimation("nobita-removebg-preview.png");
    }
     
    reset();
    gameState = "serve";
  }
   
  if (nobitaScore === 5 || dorimonScore === 5){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    dorimonScore = 0;
    nobitaScore = 0;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}
