/*
  Shreeya Champaneri
  January 15, 2021
  Summative Game
  This page contains all of the code for my video game.
*/

/************* 
 * The following are all of the variable declations
*************/

let mario;//variable for the Mario sprite facing forward
let marioRun;//variable for the Mario sprite running
let shell;
let lakitu;
let bowser;
let bg;//variable for the background sprite
let endBg;//variable for the endScene background sprite
let title;

//speed variables
let marioSpeed;
let lakituSpeed;
let bowserSpeed;
let shellSpeed;

//variables to store the keys we will be pressing in the game
let leftKey;
let rightKey;
let spaceBarKey;

//variables to store sound effects and music
let point;
let losePoint;
let themeSong;
let ending;

//variables to store all text objects
let txtPoints;
let txtLevelUp;
let txtGameOver;

//game logic variables
let numberOfPoints;
let numberOfLaunches;
let numberOfHits;
let numberOfMisses;
let jumping = false;

class startGame extends Phaser.Scene {

  constructor(config) {
    super(config);
  }
  preload() {
    this.load.image("title", "assets/sprites/title.png");
  }
  create() {
    title = this.physics.add.image(700, 180, "title");
    title.displayWidth = 1200;
    title.displayHeight = 115;
  }//end of create
  update() {

  }
}//end of startGame screen


class mainGame extends Phaser.Scene {
  constructor(config) {
    super(config);
    //this=this;
  }

  //The preload function is where we write code to load all game resources into memory.
  //https://itch.io/game-assets
  preload() {
    //load sprites into memory
    this.load.image("mario", "assets/sprites/mario.png");
    this.load.image("marioRun", "assets/sprites/marioRun.png");
    this.load.image("lakitu", "assets/sprites/lakitu.png");
    this.load.image("bowser", "assets/sprites/bowser.png");
    this.load.image("bg", "assets/sprites/background.jpg");
    this.load.image("shell", "assets/sprites/shell.png");

    //load sound files into memory
    this.load.audio("point", ["assets/effects/point.m4a"]);
    this.load.audio("losePoint", ["assets/effects/losePoint.m4a"]);
    this.load.audio("themeSong", ["assets/music/themeSong.m4a"]);
    this.load.audio("ending", ["assets/effects/ending.m4a"]);
  }//end of preload

  //The create is where we will create the game objects in code.
  create(data) {
    bg = this.physics.add.image(0, 55, "bg");
    bg.displayWidth = 3000;
    bg.displayHeight = 1500;
    mario = this.physics.add.image(400, 540, "mario");
    mario.displayWidth = 100;//resizes the sprite
    mario.displayHeight = 150;//resizes the sprite

    marioRun = this.physics.add.image(600, 540, "marioRun");
    marioRun.displayWidth = 150;
    marioRun.displayHeight = 135;

    lakitu = this.physics.add.image(400, 120, "lakitu");
    lakitu.displayWidth = 100;
    lakitu.displayHeight = 120;

    bowser = this.physics.add.image(400, 120, "bowser");
    bowser.displayWidth = 100;
    bowser.displayHeight = 120;

    shell = this.physics.add.image(400, 560, "shell");
    shell.displayWidth = 60;
    shell.displayHeight = 50;

    //assign sound to variable
    point = this.sound.add("point");
    losePoint = this.sound.add("losePoint");
    themeSong = this.sound.add("themeSong");
    ending = this.sound.add("ending");

    //initalize the key variables
    leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    spaceBarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //create the text objects 
    txtPoints = this.add.text(10, 10, 'Points: 0', { fontFamily: 'Arial', fontSize: 22, color: "#FFFFFF" });
    txtLevelUp = this.add.text(600, 350, '', { fontFamily: 'Arial', fontSize: 60, color: "#FFFFFF" });

    //game logic variables
    numberOfPoints = 0;
    numberOfLaunches = 0;
    numberOfHits = 0;
    numberOfMisses = 0;

    lakituSpeed = Math.round(Math.random() * 9) + 6;
    bowserSpeed = Math.round(Math.random() * 16) + 12;
    shellSpeed = 8;
    marioSpeed = 8;

  }//end of create

  update() {
    /************* 
      * The following are conditional statements that are used to determine what happens when the right, left, and space bar keys are pressed, what happens when various sprites overlap each other, and all of the actions each sprite is supposed to perform. (Selection and Repetition)
    *************/

    //check and respond to key presses
    setInterval(function () { seconds += console.log("Hello") }, 1000);

    if (leftKey.isDown) {
      marioRun.visible = true;
      mario.visible = false;
      marioRun.x = marioRun.x - marioSpeed;
      marioRun.flipX = false;
    }
    else if (rightKey.isDown) {
      marioRun.visible = true;
      mario.visible = false;
      marioRun.x = marioRun.x + marioSpeed;
      marioRun.flipX = true;
    }
    else {
      marioRun.visible = false;
      mario.visible = true;
    }

    if (spaceBarKey.isDown && shell.x == mario.x || spaceBarKey.isDown && shell.x == marioRun.x) {
      shellSpeed = 7;
      shell.y = shell.y - shellSpeed;
    }

    //mario and marioRun act as one sprite
    mario.x = marioRun.x;
    mario.y = marioRun.y;

    //shell movements
    if (spaceBarKey.isDown && jumping == false) {
      jumping = true;
    }
    else if (jumping == true && shell.y > 15) {
      shell.y = shell.y - shellSpeed;
    }

    //code for 'lakitu' to fly back and forth
    if (lakitu.x >= 1390) {
      lakitu.flipX = false;
      lakituSpeed = lakituSpeed * -1;
    }
    else if (lakitu.x <= 50) {
      lakitu.flipX = true;
      lakituSpeed = lakituSpeed * -1;
    }

    lakitu.x = lakitu.x + lakituSpeed;

    //game collision code
    if (this.physics.world.overlap(shell, mario)) {
      shell.x = mario.x;
      shell.x = marioRun.x;
    }

    if (this.physics.world.overlap(shell, lakitu)) {
      point.play();
      shell.y = 550;
      shell.x = mario.x;
      shell.x = marioRun.x;
      shellSpeed = 0;
      numberOfPoints = numberOfPoints + 10;
      lakituSpeed = Math.round(Math.random() * 9) + 6;
      numberOfLaunches++;
      numberOfHits++;
    }
    else if (shell.y < 20 && lakitu.visible == true) {
      losePoint.play();
      shell.y = 550;
      shellSpeed = 0;
      shell.x = mario.x;
      shell.x = marioRun.x;
      numberOfPoints = numberOfPoints - 5;
      numberOfLaunches++;
      numberOfMisses++;
    }

    if (this.physics.world.overlap(shell, bowser)) {
      point.play();
      shell.y = 550;
      shellSpeed = 0;
      shell.x = Math.round(Math.random() * 1400) + 20;
      shell.x = Math.round(Math.random() * 1400) + 20;
      numberOfPoints = numberOfPoints + 15;
      bowserSpeed = Math.round(Math.random() * 16) + 12;
      shell.displayHeight = shell.displayHeight - 2;
      shell.displayWidth = shell.displayWidth - 2;
      txtLevelUp.x = -1000;
      numberOfLaunches++;
      numberOfHits++;
    }
    else if (shell.y < 20 && lakitu.visible == false) {
      losePoint.play();
      shell.y = 550;
      shellSpeed = 0;
      shell.displayHeight = shell.displayHeight + 1.5;
      shell.displayWidth = shell.displayWidth + 1.5;
      shell.x = Math.round(Math.random() * 1400) + 20;
      shell.x = Math.round(Math.random() * 1400) + 20;
      numberOfPoints = numberOfPoints - 10;
      txtLevelUp.x = -1000;
      bowserSpeed = bowserSpeed;
      numberOfLaunches++;
      numberOfMisses++;
    }

    txtPoints.text = "Points: " + numberOfPoints;//update the text to show the new number of points

    //lakitu leaves and bowser enters
    if (numberOfPoints >= 100 && lakitu.visible == true) {
      bowser.x = lakitu.x;
      lakitu.visible = false;
      bowserSpeed = Math.round(Math.random() * 16) + 12;
      txtLevelUp.visible = false;
      lakitu.displayWidth = 0;
      lakitu.displayHeight = 0;
    }
    if (lakitu.visible == false) {
      bowser.visible = true;
      txtLevelUp.text = "Level Up!";
      txtLevelUp.visible = true;
    }
    else if (lakitu.visible == true) {
      bowser.visible = false;
      bowser.x = -1000;
      bowserSpeed = 0;
      txtLevelUp.visible = false;
    }

    //code for 'bowser' to fly back and forth
    if (bowser.x >= 1390) {
      bowser.flipX = true;
      bowserSpeed = bowserSpeed * -1;
    }
    else if (bowser.x <= 50) {
      bowser.flipX = false;
      bowserSpeed = bowserSpeed * -1;
    }
    bowser.x = bowser.x + bowserSpeed;

    //if the player gets more than 300 points, the game will be over
    if (numberOfPoints >= 300) {
      game.scene.start("endScene");
      game.scene.remove("game");
      myMusic.pause();
      ending.play();
      document.getElementById("icon").style.display = "none";
    }

  }//end of update

}
//end of mainGame screen


class endScene extends Phaser.Scene {

  constructor(config) {
    super(config);
  }

  preload() {
    this.load.image("endBg", "assets/sprites/endBg.png");
  }
  create() {
    endBg = this.physics.add.image(710, 370, "endBg");
    endBg.displayWidth = 1430;
    endBg.displayHeight = 740;
    txtGameOver = this.add.text(75, 75, 'Congratulations, you have won with a score of ' + numberOfPoints + ' points! \n \n Number of Launches: ' + numberOfLaunches + '\n Number of Hits: ' + numberOfHits + '\n Number of Misses: ' + numberOfMisses, { fontFamily: 'Arial', fontSize: 50, color: "#FFFFFF" });
  }//end of create
  update() {

  }

}//end of endScene screen


var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1425,
  height: 730,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false

    }
  }
};

var game = new Phaser.Game(config);

game.scene.add("startGame", startGame);
game.scene.add("game", mainGame);
game.scene.add("endScene", endScene);
//game.scene.start("endScene");
game.scene.start("startGame");
//game.scene.setVisible("endScene");