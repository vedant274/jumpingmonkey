var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
  createCanvas(600,200) 
  monkey = createSprite(50,200,40,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale= 0.1;
  
  ground = createSprite(200,200,600,10);
  ground.x = ground.width /2;
// create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  bananaGroup = new Group();
  score = 0;
  var survivalTime = 0;
}

function draw(){
          background(220 );
          textSize(20);
          stroke("blue");
          fill("red");
          text("Score:"+ score,500,50);

          stroke("yellow");
          textSize(20);
          fill("red");
          survivalTime = Math.ceil(frameCount/frameRate());
          text("Survival Time :"+ survivalTime,100,50);

          if(gameState === PLAY){
          score  = score + Math.round(frameCount/60);

          if(keyDown("space")&& monkey.y >= 90){
           monkey.velocityY = -10  
          }

          monkey.velocityY = monkey.velocityY + 1 

          if(ground.x<0){
            ground.x = ground.width/2 
             }

          monkey.collide (ground)

        //spawn banana
          spawnbanana();

        //spawn obstacles on the ground
          spawnObstacles();
          //   if(bananaGroup.isTouching(monkey)){
          //     bananaGroup.destroyEach  
          //   }
          // if(obstaclesGroup.isTouching(monkey)){
          //   gameState = END
          // }
        }
  drawSprites();
}

function spawnObstacles(){
  if(frameCount%300 === 0){
    var obstacles= createSprite(600,180,10,35);
    obstacles.velocityX = -6
    obstacles.scale = 0.1
    obstacles.addImage(obstacleImage)
    obstacles.depth = monkey.depth 
    monkey.depth = monkey.depth+1
    obstacles.lifeTime = 400
  }
}

function spawnbanana(){
  if(frameCount%80 === 0){
    var banana= createSprite(600,70,10,35);
    banana.velocityX = -6
    banana.scale = 0.1
    banana.addImage(bananaImage)
    banana.depth = monkey.depth 
    monkey.depth = monkey.depth+1
    banana.lifeTime = 400
  }
}