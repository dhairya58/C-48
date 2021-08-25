var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImage, zombieGroup
var bullets, bulletsImage, bulletsGroup
var score = 0;
var gameState = "play"
var heart = 3;


function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImage = loadImage("assets/zombie.png")

  bulletsImage = loadImage("assets/bullet.png")

  heart1 = loadImage("assets/heart_1.png")
  heart2 = loadImage("assets/heart_2.png")
  heart3 = loadImage("assets/heart_3.png")


}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1

  zombieGroup = new Group()
  bulletsGroup = new Group()

  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)


}

function draw() {
  background(0);

  if (gameState === "play") {
    text(heart, 200, 200)

    //moving the player up and down and making the game mobile compatible using touches
    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 30
    }

    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 30
    }

    //release bullets and change the image of shooter to shooting position when space is pressed
    if (keyWentDown("space")) {
      spawnBullets();
      bullets.y = player.y
      player.addImage(shooter_shooting)
    }

    //player goes back to original standing image once we stop pressing the space bar
    else if (keyWentUp("space")) {
      player.addImage(shooterImg)
    }

    if (bulletsGroup.isTouching(zombieGroup)) {
      bulletsGroup.destroyEach();
      zombieGroup.destroyEach();
      score = score + 1;
    }

    spawnZombie();

    if (player.isTouching(zombieGroup)) {
      heart = heart - 1
    }

    drawSprites();

    if (heart === 3) {
      image(heart3, displayWidth - 100, 80, 70, 30)
    }
    else if (heart === 2) {
      image(heart2, displayWidth - 100, 80, 70, 30)
    }
    else if (heart === 1) {
      image(heart1, displayWidth - 100, 80, 70, 30)
    }

    textSize(15)
    fill("red");
    text("score:" + score, displayWidth - 100, 50);

  }

  else if (heart === 0) {
    background("black");
    player.destroy();
    zombieGroup.destroyEach();
    bulletsGroup.destroyEach();
    gameState = "end"
    textSize(30)
    fill("yellow")
    text("Game Over", displayWidth / 2, displayHeight / 2)
  }





}

function spawnZombie() {
  if (frameCount % 150 === 0) {
    zombie = createSprite(displayWidth - 1200, displayHeight - 300, 50, 50)
    zombie.x = Math.round(random(displayWidth - 1000, displayWidth - 300))
    zombie.y = Math.round(random(displayHeight - 800, displayHeight - 300))
    zombie.addImage(zombieImage)
    zombie.scale = 0.2
    zombie.velocityX = -0.5
    zombieGroup.add(zombie)
    zombie.debug=true
    zombie.setCollider("rectangle",0,0,50,zombie.length)
  }
}

function spawnBullets() {
  bullets = createSprite(displayWidth - 1150, 200, 9, 9)
  bullets.addImage(bulletsImage)
  bullets.velocityX = 3
  bullets.scale = 0.05
  bulletsGroup.add(bullets)
}

