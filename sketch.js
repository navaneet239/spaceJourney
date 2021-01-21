var SET = 0,
  PLAY = 1,
  END = 2;
var gameState = SET;

var bk, bkk;

var astro, astrobk;

var stone, stonebk, stoneGroup;

var score = 0;

var hold1, hold2;

var o2, o2bk, o2Group;

var packItem = 0

function preload() {

  bkk = loadImage("space floatbk.jpg")

  astrobk = loadImage("astronaut.png");

  stonebk = loadImage("astroid.png");

  o2bk = loadImage("o2.png");



}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background("black");

  bk = createSprite(200, 200, 400, 400);
  bk.addImage(bkk);
  bk.scale = 3;
  //bk.velocityX = -5;

  astro = createSprite(50, bk.y/2 + 100, 50, 50);
  astro.addImage(astrobk);
  astro.scale = 0.30;
  astro.setCollider("rectangle", 0, 0, 150, 150, 0)
  //astro.debug = true

  stoneGroup = createGroup();

  o2Group    = createGroup();
  
    
  hold1 = createSprite(width/2, 60,width,10);
  hold1.visible = false

  hold2 = createSprite(width/2, height/2 + 150 ,width,10);
  hold2.visible = false



}

function draw() {

  drawSprites();
  
  text("Score: " + score, width/2 + 100, 30, fill("white"),textSize(20));

  text("your oxygen boosting level = " + packItem, 100, 30, fill("white"),textSize(20))


  if (gameState === SET) {
    bk.velocityX = 0;

    text("Press space to start.", width/2 - 100, bk.y/2 + 100, fill("white"),textSize(25))
    
    if (keyWentDown("SPACE")) {
      gameState = PLAY;
      
    }


  }

  if (gameState === PLAY) {
    
    score = score + Math.round(setFrameRate() / 60);
    
    bk.velocityX = -(8 + 3 * score / 100);

    if (bk.x < 0) {
      bk.x = bk.width / 2;
    }

    if (keyWentDown("UP_ARROW")) {
      astro.velocityY = -10;
    }

    if(keyWentDown("DOWN_ARROW")){
      astro.velocityY = 10;
    }

    astroid();

    oxygen();

    if(stoneGroup.isTouching(astro)){
      gameState = END;
      astro.velocityY = 0;
    }


    if (o2Group.isTouching(astro)) {
      packItem = packItem + 1
    }
    
    astro.collide(hold1)
  

    astro.collide(hold2)

  }

  if (gameState === END){
    bk.velocityX = 0;
    
    stoneGroup.setVelocityXEach(0);
    stoneGroup.destroyEach();
    
    o2Group.setVelocityXEach(0);
    o2Group.destroyEach();
    
    stoneGroup.setLifetimeEach(-1);
    o2Group.setLifetimeEach(-1);

    
    text("Press Space to restart",width/2 - 150,200, textSize(30));
    
    if (keyWentDown("SPACE")){
      replay();
    }
  }
  
}

function astroid() {

  if (frameCount % 80 === 0) {
    stone = createSprite(width, 200, 20, 20);
    stone.addImage(stonebk);
    stone.scale = 0.5;
    stone.velocityX = -(8 + 3 * score / 100);
    stone.y = random(90, 275);
    
    stone.setCollider("rectangle",0,0,100,100,0);
    //  stone.debug = true;
    
    stone.lifetime = width/-(8 + 3 * score / 100);
    
    stoneGroup.add(stone);
    

  }
}

function oxygen() {

  if (frameCount % 150 === 0) {
    o2 = createSprite(width, 150, 20, 20);
    o2.addImage(o2bk);
    o2.scale = 0.25;
    o2.velocityX = -(8 + 3 * score / 100);
    o2.y = random(90, 275);

   // o2.setCollider("circle", 0, 0, 40);
   //o2.debug = true;

    o2.lifeItem = width/-(8 + 3 * score / 100);
    
    o2Group.add(o2);
  }

}

function replay (){
  
  gameState = PLAY;
  
  score = 0;

  packItem = 0;
  
  astro.y = bk.y/2 + 100;

  
}
