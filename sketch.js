var rocket, gameOver, obstacle, arena;
var rocketImg,gameOverImg, obstacleImg, backgroundImg, obsGroup;
var score= 0;
var END= 0;
var PLAY= 1;
var gameState=PLAY;
function preload()
{
    backgroundImg = loadImage("background.jpg");
    rocketImg= loadImage("rocket.jpg");
    obstacleImg= loadImage("obstacle.jpg")
    gameOverImg= loadImage("GameOver.jpg");
}

function setup()
{
    createCanvas(600,600);

    arena= createSprite(300,200);
    arena.addImage(backgroundImg);
    arena.scale= 2;
    arena.velocityY=5;
    
    rocket= createSprite(300,500);
    rocket.addImage(rocketImg);
    rocket.scale=0.2;
    //rocket.debug=true;
    rocket.setCollider("rectangle",0,0,450,650);

    gameOver= createSprite(300,300);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.5;
    
    obsGroup= new Group(); 
    obsGroup.debug=true;
    
}

function draw() 
{
    background(0);
    drawSprites();
    textSize(40)
    
    text("score: " + score,50,50);
 if(gameState == PLAY)
 {
    if(arena.y > 500)
    {
        arena.y = height/2;
    }

    rocket.x=World.mouseX;
    gameOver.visible= false;
    score = score+ Math.round(getFrameRate()/50);

    if(World.frameCount % 50 == 0)
    {
        obstacle= createSprite(Math.round(random(50,550)),50);
        obstacle.addImage(obstacleImg);
        obstacle.velocityY=5;
        obstacle.scale= 0.2;
        obsGroup.add(obstacle);
    }
 }

    if(obsGroup.isTouching(rocket)){
        gameState= END;
    }
    if(gameState == END)
    {
        gameOver.visible= true;
        obsGroup.destroyEach();
        rocket.destroy;
        arena.velocityX=0;
}
    }
    