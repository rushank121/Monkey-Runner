var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score;
var ground;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png")

}

function setup() {
  createCanvas(650, 400);
  
  monkey=createSprite(60,370,20,20);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(325,402,650,5);
  ground.visible=false;
  
  foodGroup=new Group();
  obstacleGroup= new Group();


score=0;
}

function draw() {
  background("lightblue");
  
  if(keyDown("space") && monkey.y >= 360){
    monkey.velocityY=-10;
  }
  
  if(gameState===END){
    //monkey.destroy();
    obstacle.destroyEach();
    banana.destroyEach();
  }
  
  if(monkey.isTouching(foodGroup)){
    score=score+1;
    foodGroup.destroyEach();
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
  
  monkey.velocityY = monkey.velocityY + 0.3;
  monkey.collide(ground);
  
  if(World.frameCount%200===0){
    food();
 }
  
  if(World.frameCount%300===0){
    stone();
 }
  
drawSprites();
  fill("black");
  text("Score->"+score,50,600);
}

function food(){
  banana=createSprite(650,Math.round(random(170,230)),10,10);
  banana.velocityX=-5;
  banana.addImage(bananaImage);
  banana.scale=0.1;
  foodGroup.add(banana);
}

function stone(){
  obstacle=createSprite(600,390,10,10);
  obstacle.velocityX=-5;
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  obstacleGroup.add(obstacle);
}
