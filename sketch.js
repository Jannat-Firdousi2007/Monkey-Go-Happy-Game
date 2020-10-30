// Hungry monkey 
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survivalTime;
var ground;

// GameStates
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){

  // Monkey
  monkey_running=            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  // Banana 
  bananaImage = loadImage("banana.png");
  
  // Obstacle
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  // Canvas
  createCanvas(400, 400);
  
 // Groups
 FoodGroup=createGroup();
 obstacleGroup=createGroup();
 TimeGroup=createGroup();

  
  // Monkey
   monkey=createSprite(50,250,10,10);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
  // Ground
  ground=createSprite(70,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
   
  // Score
  score=0;
  // SurvivalTime
  survivalTime=0;
  
}
  
function draw() {

  // Background
  background(255);
  
  // Displaying survival time
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time :"+ survivalTime,100,50);
  
  // Displaying score
  stroke("black");
  fill("black");
  textSize(20);
  text("Score :"+ score,300,100);
  
  // Monkey
  monkey.collide(ground);
  
  // PLAY
  if(gameState === PLAY) {
    monkey.changeAnimation("running", monkey_running);
    
    survivalTime = Math.ceil(frameCount/frameRate());
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  // Jump when space key is pressed
    if(keyDown("space")) {
      monkey.velocityY=-12;
    }
  
  if(FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score=score+1;
  }
  
  // Gravity
    monkey.velocityY=monkey.velocityY + 0.8;
  
  // Groups life time
  obstacleGroup.setLifetimeEach(-1);
  
  // Adding functions
  food();
  obstacles();
  
  if(obstacleGroup.isTouching(monkey)) {
    gameState=END;
  }
}
  
  // END
  if(gameState === END) {
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    survivalTime.visible=false;
  
  // Displaying game over
  stroke("red");
  fill("red");
  textSize(30);
  text("Game Over :", 110,200);  
  
  // Displaying monkey is dead
  stroke("black");
  fill("black");
  textSize(30);
  text("Monkey is dead ", 100,240);  

}
  
  drawSprites();
  
}

function food() {
  if (frameCount % 80 === 0) {
    banana=createSprite(600,250,40,10);
    banana.addImage(bananaImage);
    banana.y=random(120,200);    
    banana.scale=0.1;
    banana.velocityX=-3;
    banana.lifetime=200;
    
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount % 300 === 0) {
    obstacle=createSprite(800,320,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-6;
    obstacle.lifetime=200;
    
    obstacleGroup.add(obstacle);
  }
}
