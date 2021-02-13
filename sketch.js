var player, //all main charachters
  player_left,
  player_right,
  zombieAnimation,
  bg,
  bulletGroup,
  bulletImg,
  button1,
  button2,
  zombie1,
  zombie2,
  zombie3,
  zombie4;
var kills,
  coins,
  deaths,
  reloadSpeed,
  bulletSpeed,
  zombieSpeed,
  playerCoolDown,
  gameTime; //all maths
var gun,
  button3,
  button4,
  button5,
  button6,
  sheild,
  sheildHealth,
  hearts,
  heart1,
  heart2,
  heart3,
  heartImg,
  concreteWallImg,
  wall,
  main_music,
  bullet_sounds,
  player_sounds,
  zombie_death; //miscellenaes

//to load all images
function preload() {
  player_left = loadImage("hunter_left.png");
  player_right = loadImage("hunter_right.png");

  zombieAnimation = loadAnimation("zombie1.png", "zombie2.png", "zombie3.png");

  concreteWallImg = loadImage("zombie_concrete.png");

  bulletImg = loadImage("bullet.png");
  heartImg = loadImage("heart.png");
  bg = loadImage("zombie_background.png");
}

function setup() {
  createCanvas(1536, 400);
  player = createSprite(200, 300, 20, 20); //player
  player.addImage("hunter_right", player_right);
  player.addImage("hunter_left", player_left);
  player.scale = 0.5;

  main_music = createAudio("zombie_music.mp3");
  bullet_sounds = createAudio("zombie_bullet.mp3");
  player_sounds = createAudio("zombie_player_death.mp3");
  zombie_death = createAudio("zombie_death.mp3");

  wall = createSprite(390, 200, 75, 400);
  wall.visible = false;

  zombie1 = createSprite(1536, 100, 20, 20); //enemies
  zombie1.addAnimation("zombie", zombieAnimation);
  zombie1.scale = 0.5;
  zombie2 = createSprite(1536, 300, 20, 20);
  zombie2.addAnimation("zombie", zombieAnimation);
  zombie2.scale = 0.5;
  zombie3 = createSprite(1536, 200, 20, 20);
  zombie3.addAnimation("zombie", zombieAnimation);
  zombie3.scale = 0.5;
  zombie4 = createSprite(1536, 250, 20, 20);
  zombie4.addAnimation("zombie", zombieAnimation);
  zombie4.scale = 0.5;

  heart1 = createSprite(130, 380, 20, 20); //to see how many lives are left
  heart1.addImage("heart", heartImg);
  heart1.scale = 0.1;
  heart2 = createSprite(180, 380, 20, 20);
  heart2.addImage("heart", heartImg);
  heart2.scale = 0.1;
  heart3 = createSprite(180 + 50, 380, 20, 20);
  heart3.addImage("heart", heartImg);
  heart3.scale = 0.1;

  bulletGroup = new Group(); //to use the bullets

  button1 = createButton("Bullet speed,20 coins"); //button to increase bullet speed
  button1.position(200, 10);
  button1.mousePressed(function () {
    if (coins >= 20 && bulletSpeed <= 25) {
      bulletSpeed += 1;
      coins -= 20;
    }
  });
  button2 = createButton("Reload time,10 coins"); //button to decrease reload time
  button2.position(200, 30);
  button2.mousePressed(function () {
    if (coins >= 10 && reloadSpeed <= 2) {
      reloadSpeed += 0.1;
      coins -= 10;
    }
  });
  button3 = createButton("Buy shotgun, 75 coins"); //button to get the shotgun
  button3.position(500, 10);
  button3.mousePressed(function () {
    if (coins >= 75) {
      gun = shotgun;
      coins -= 75;
    }
  });
  button4 = createButton("Buy AK47,200 coins"); //button to get ak47
  button4.position(500, 30);
  button4.mousePressed(function () {
    if (coins >= 200) {
      gun = ak47;
      coins -= 200;
    }
  });
  button5 = createButton("Extra hearts!,50 coins");
  button5.position(500, 50);
  button5.mousePressed(function () {
    if (coins >= 50 && hearts <= 3) {
      hearts += 1;
      coins -= 50;
    }
  });
  button6 = createButton("Temporary sheild,50 coins");
  button6.position(200, 50);
  button6.mousePressed(function () {
    if (coins >= 50 && sheild != on) {
      sheild = on;
      coins -= 50;
      sheildHealth = 100;
    }
  });

  playerCoolDown = 10; //imp maths
  zombieSpeed = 1.25;
  bulletSpeed = 10;
  reloadSpeed = 0.1;
  deaths = 0;
  kills = 0;
  coins = 10000;
  gameTime = 0;
  normal = 0;
  shotgun = 1;
  ak47 = 2;
  hearts = 3;
  gun = normal;
  off = 4;
  on = 5;
  sheild = off;
  sheildHealth = 0;
}

function draw() {
  background(bg);
  edges = createEdgeSprites(); //edges
  image(concreteWallImg, 350, 0, 70, 800);
  player.collide(wall);

  main_music.volume(0.1);
  main_music.play();

  //player controls
  if (keyDown("w")) {
    player.y -= 10;
  }
  if (keyDown("a")) {
    player.x -= 10;
    player.changeImage("hunter_left", player_left);
  }
  if (keyDown("s")) {
    player.y += 10;
  }
  if (keyDown("d")) {
    player.x += 10;
    player.changeImage("hunter_right", player_right);
  }
  if (keyDown(UP_ARROW)) {
    player.y -= 10;
  }
  if (keyDown(LEFT_ARROW)) {
    player.x -= 10;
    player.changeImage("hunter_left", player_left);
  }
  if (keyDown(DOWN_ARROW)) {
    player.y += 10;
  }
  if (keyDown(RIGHT_ARROW)) {
    player.x += 10;
    player.changeImage("hunter_right", player_right);
  }

  //zombie AI
  if (zombie1.x > player.x) {
    zombie1.x -= zombieSpeed;
  }
  if (zombie1.x < player.x) {
    zombie1.x += zombieSpeed;
  }
  if (zombie1.y > player.y) {
    zombie1.y -= zombieSpeed / 3;
  }
  if (zombie1.y < player.y) {
    zombie1.y += zombieSpeed / 3;
  }
  if (zombie2.x > player.x) {
    zombie2.x -= zombieSpeed;
  }
  if (zombie2.x < player.x) {
    zombie2.x += zombieSpeed;
  }
  if (zombie2.y > player.y) {
    zombie2.y -= zombieSpeed / 3;
  }
  if (zombie2.y < player.y) {
    zombie2.y += zombieSpeed / 3;
  }
  if (zombie3.x > player.x) {
    zombie3.x -= zombieSpeed;
  }
  if (zombie3.x < player.x) {
    zombie3.x += zombieSpeed;
  }
  if (zombie3.y > player.y) {
    zombie3.y -= zombieSpeed / 3;
  }
  if (zombie3.y < player.y) {
    zombie3.y += zombieSpeed / 3;
  }
  if (zombie4.x > player.x) {
    zombie4.x -= zombieSpeed;
  }
  if (zombie4.x < player.x) {
    zombie4.x += zombieSpeed;
  }
  if (zombie4.y > player.y) {
    zombie4.y -= zombieSpeed / 3;
  }
  if (zombie4.y < player.y) {
    zombie4.y += zombieSpeed / 3;
  }

  if (
    player.collide(zombie1) || //to reset if player dies;
    player.collide(zombie2) ||
    player.collide(zombie3) ||
    player.collide(zombie4)
  ) {
    if (sheild != on) {
      if (player.x < 500) {
        hearts -= 1;
      }
      zombie1.x = random(500, 500);
      zombie1.y = random(0, 400);
      zombie2.x = random(500, 500);
      zombie2.y = random(0, 400);
      zombie3.x = random(500, 500);
      zombie3.y = random(0, 400);
      zombie4.x = random(500, 500);
      zombie4.y = random(0, 400);

      if (hearts === 0) {
        zombie1.x = random(1550, 1560);
        zombie1.y = random(0, 400);
        zombie2.x = random(1550, 1560);
        zombie2.y = random(0, 400);
        zombie3.x = random(1550, 1560);
        zombie3.y = random(0, 400);
        zombie4.x = random(1550, 1560);
        zombie4.y = random(0, 400);
        bulletGroup.destroyEach();

        player_sounds.play();

        deaths += 1;

        player.x = 500;
        player.y = 200;

        playerCoolDown = 10;
        hearts = 3;
        zombieSpeed = 2;
        bulletSpeed = 10;
        reloadSpeed = 0.1;
        kills = 0;
        coins = 0;
        gameTime = 0;
        gun = normal;
      }
    }
    if (sheild === on) {
      sheildHealth -= 1;
      if (sheildHealth <= 0) {
        sheild = off;
      }
    }
  }

  if (hearts === 3) {
    heart1.visible = true; //to give each player three lives
    heart2.visible = true;
    heart3.visible = true;
  }
  if (hearts === 2) {
    heart1.visible = false;
    heart2.visible = true;
    heart3.visible = true;
  }
  if (hearts === 1) {
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = true;
  }
  if (hearts === 0) {
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = false;
  }

  //to shoot with a pistol
  if (mouseIsPressed && playerCoolDown <= 0 && gun === normal) {
    fill(0, 0, 0);
    bullet = createSprite(player.x, player.y + 10, 10, 10);
    bullet.addImage(bulletImg);
    bullet.scale = 0.2;
    bullet_sounds.play();
    bullet_sounds.volume(0.3);
    if (mouseX > player.x) {
      bullet.velocityX = bulletSpeed;
    }
    if (mouseX < player.x) {
      bullet.velocityX = -bulletSpeed;
      bullet.changeImage();
    }
    playerCoolDown = 10;
    bulletGroup.add(bullet);
    if (frameCount % 100 === 0) {
      bulletGroup.destroyEach();
    }
  } else if (mouseIsPressed && playerCoolDown <= 0 && gun === shotgun) {
    //to shoot with a shot gun
    bullet1 = createSprite(player.x, player.y + 10, 10, 10);
    bullet1.addImage(bulletImg);
    bullet1.scale = 0.2;
    bullet2 = createSprite(player.x, player.y + 10, 10, 10);
    bullet2.addImage(bulletImg);
    bullet2.scale = 0.2;
    bullet3 = createSprite(player.x, player.y + 10, 10, 10);
    bullet3.addImage(bulletImg);
    bullet3.scale = 0.2;
    bullet_sounds.play();
    bullet_sounds.volume(0.3);
    if (mouseX > player.x) {
      bullet1.velocityX = bulletSpeed;
      bullet2.velocityX = bulletSpeed;
      bullet2.velocityY = 2;
      bullet3.velocityX = bulletSpeed;
      bullet3.velocityY = -2;
    }
    if (mouseX < player.x) {
      bullet1.velocityX = -bulletSpeed;
      bullet2.velocityX = -bulletSpeed;
      bullet2.velocityY = 2;
      bullet3.velocityX = -bulletSpeed;
      bullet3.velocityY = -2;
    }
    playerCoolDown = 10;
    bulletGroup.add(bullet1);
    bulletGroup.add(bullet2);
    bulletGroup.add(bullet3);
    if (frameCount % 100 === 0) {
      bulletGroup.destroyEach();
    }
  } else if (mouseIsPressed && gun === ak47 && playerCoolDown <= 2) {
    //to shoot with an ak47
    fill(0, 0, 0);
    bullet = createSprite(player.x, player.y + 10, 10, 10);
    bullet.addImage(bulletImg);
    bullet.scale = 0.2;
    bullet_sounds.play();
    bullet_sounds.volume(0.3);
    if (mouseX > player.x) {
      bullet.velocityX = bulletSpeed;
    }
    if (mouseX < player.x) {
      bullet.velocityX = -bulletSpeed;
      bullet.changeImage();
    }
    playerCoolDown = 7;
    bulletGroup.add(bullet);
    if (frameCount % 100 === 0) {
      bulletGroup.destroyEach();
    }
  }

  fill(255); //to show the cool down
  textSize(10);
  text("Attack cool down: " + Math.round(playerCoolDown), 50, 20);

  //to kill the enimeis
  if (bulletGroup.isTouching(zombie1)) {
    zombie1.x = random(150, 1550);
    zombie1.y = random(50, 250);
    kills += 1;
    coins += 1;
    zombie_death.play();
    zombie_death.volume(0.1);
  }
  if (bulletGroup.isTouching(zombie2)) {
    zombie2.x = random(150, 1550);
    zombie2.y = random(50, 250);
    kills += 1;
    coins += 1;
    zombie_death.play();
    zombie_death.volume(0.1);
  }
  if (bulletGroup.isTouching(zombie3)) {
    zombie3.x = random(150, 1550);
    zombie3.y = random(50, 250);
    kills += 1;
    coins += 1;
    zombie_death.play();
  }
  if (bulletGroup.isTouching(zombie4)) {
    kills += 1;
    coins += 1;
    zombie_death.play();
    zombie_death.volume(0.1);
    rand = random(1, 4);
    if (rand === 4) {
      zombie4.x = random(150, 100);
      zombie4.y = random(10, 50);
    } else {
      zombie4.x = random(200, 1550);
      zombie4.y = random(50, 250);
    }
  }

  //to make the player escape after killing 10 zombies
  if (kills >= 10 && player.x > 500) {
    player.x = 200;
    player.y = 200;
  }

  //to decrease cool down if it is more than zero
  if (playerCoolDown > 0) {
    playerCoolDown -= reloadSpeed;
  }

  text("Kills: " + kills, 50, 40); //to show the kills and coins and deaths
  text("Coins: " + coins, 50, 60);
  text("Deaths: " + deaths, 20, 380);

  zombie1.bounceOff(zombie2); //to make sure they dont merge
  zombie1.bounceOff(zombie3);
  zombie1.bounceOff(zombie4);

  zombie2.bounceOff(zombie1);
  zombie2.bounceOff(zombie3);
  zombie2.bounceOff(zombie4);

  zombie3.bounceOff(zombie1);
  zombie3.bounceOff(zombie2);
  zombie3.bounceOff(zombie4);

  zombie4.bounceOff(zombie2);
  zombie4.bounceOff(zombie3);
  zombie4.bounceOff(zombie4);

  player.bounceOff(edges);

  gameTime += 1; //to make game harder as time goes one
  if (gameTime % 10 === 0 && zombieSpeed <= 20) {
    zombieSpeed = (zombieSpeed + 0.005) * (reloadSpeed + 1 / zombieSpeed - 0.5);
  }

  drawSprites();
}
