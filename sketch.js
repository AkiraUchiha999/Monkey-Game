
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0
var score=0
var END=0,gameState

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300)
ground=createSprite(200,280,998,8)
  ground.x=-4
  if(ground.x>0){
  ground.x=ground.width/2
  }
  monkey=createSprite(150,250,50,50)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1

FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
}


function draw() {
background("azure")
   monkey.collide(ground)
  if(keyDown("space")&& monkey.y >= 190) {
        monkey.velocityY = -12;
        
    }
    monkey.velocityY = monkey.velocityY + 0.9
  stroke("black")
  textSize(15)
  fill("black")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time : "+survivalTime,200,50)
  
  text("Score : "+score,100,50)
  
 if (frameCount % 300 === 0) {
     obstacle= createSprite(600,255,40,10);
obstacleGroup.add(obstacle);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.08;
    obstacle.velocityX = -10;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    obstacle.depth = monkey.depth;
   obstacle.depth=monkey.depth+1
  }

  if (monkey.isTouching(FoodGroup)){
    score=score+1
    FoodGroup.destroyEach();
  }
  
  
 
  if (frameCount % 80 === 0) {
     banana= createSprite(600,255,40,10);

    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -4;
    banana.y=Math.round(random(120,200))
     //assign lifetime to the variable
    banana.lifetime = 200;
    banana.depth = monkey.depth;
   banana.depth=monkey.depth+1
FoodGroup.add(banana)
  }

if (gameState===END){
  text("Game Over",150,70)
  stroke("black")
  fill("black")
  ground.x=0
  score=0
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.x=200
  monkey.velocityX=0
  monkey.velocityY=0
  ground.x=0
  survivalime=Math.ceil(frameCount/frameRate())-0
}  
  if (monkey.isTouching(obstacleGroup)){
    gameState=END
  }
  
  drawSprites();
}
