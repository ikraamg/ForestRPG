import Player from '../objects/Player';
import Mole from '../objects/Mole';
import Treant from '../objects/Treant';
import Arrow from '../objects/Arrow';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.addAudios();
    this.startSoundtrack();
    this.createMap();
    this.createGroups();
    this.createExit(47.5, 28.5);
    this.populate();
    this.createPlayer();
    this.bindKeys();
    this.createHud();
    this.createCamera();
  }

  addAudios() {
    this.audioHurt = this.sound.add('hurt');
    this.audioItem = this.sound.add('item');
    this.audioEnemyDeath = this.sound.add('enemy-death');
    this.audioSlash = this.sound.add('slash');
  }

  bindKeys() {
    // this.keyboard = this.input.keyboard.addKeys('W, A, S, D, SPACE');
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  shotImpact(enemy, shot) {
    enemy.destroy();
    shot.destroy();
    this.player.kills += 1;
    this.audioEnemyDeath.play();

    if (this.player.kills > 5) {
      this.physics.world.enableBody(this.exit);
      this.exit.alpha = 1;
    }
    this.killDisplay.setText(`KILLS: ${this.player.kills}`);
  }

  update(time) {
    const timeCount = Math.round((time / 1000) - 8);
    const scoreCalc = this.player.health * 200 + this.player.kills * 100 - this.player.shots * 10 - timeCount * 2;
    this.timeDisplay.setText(`TIME: ${timeCount}`);
    this.scoreDisplay.setText(`SCORE: ${scoreCalc}`);

    this.physics.collide(this.player, this.colLayer);
    this.physics.collide(this.enemiesGroup, this.colLayer);

    this.physics.overlap(this.player, this.enemiesGroup, this.hurtPlayer, null, this);
    this.physics.overlap(this.player, this.exit, this.exitManager, null, this);
    this.physics.overlap(this.enemiesGroup, this.projectilesGroup, this.shotImpact, null, this);

    this.updateHud();
    const velocity = 50;

    this.player.setVelocity(0);
    if (this.cursors.right.isDown) {
      this.player.setVelocity(velocity, 0);
      this.player.direction = 'right';
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocity(-velocity, 0);
      this.player.direction = 'left';
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocity(0, -velocity);
      this.player.direction = 'up';
    }
    if (this.cursors.down.isDown) {
      this.player.setVelocity(0, velocity);
      this.player.direction = 'down';
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.player.setVelocity(0, 0);
      const shot = new Arrow(this);
      this.projectilesGroup.add(shot);
      this.audioSlash.play();
      this.player.shots += 1;
      this.shotDisplay.setText(`SHOTS: ${this.player.shots}`);
    }
    for (let i = 0; i < this.projectilesGroup.getChildren().length; i += 1) {
      const arrow = this.projectilesGroup.getChildren()[i];
      if (!this.cameras.main.worldView.contains(arrow.x, arrow.y)) {
        arrow.destroy();
      }
    }
  }

  exitManager(player, exit) {
    // this.game.state.start('GameOver');
    console.log('exit!');
    this.soundtrack.stop();
  }

  resetHurtTime() {
    this.player.hurtFlag = false;
    this.player.alpha = 1;
  }

  updateHealthDisplay() {
    switch (this.player.health) {
      case 2:
        this.hp3.setTexture('atlas', 'hearts/hearts-2', false);
        break;
      case 1:
        this.hp2.setTexture('atlas', 'hearts/hearts-2', false);
        break;
      case 0:
        this.hp1.setTexture('atlas', 'hearts/hearts-2', false);
        break;
      default:
    }
  }

  hurtPlayer(player, enemy) {
    if (this.player.hurtFlag) {
      return;
    }

    this.player.hurtFlag = true;
    this.time.addEvent({
      delay: 2000,
      callback: this.resetHurtTime,
      callbackScope: this,
    });

    this.player.alpha = 0.5;

    this.player.health -= 1;
    this.updateHealthDisplay();

    this.audioHurt.play();

    if (this.player.health < 1) {
      this.gameOver();
    }
  }

  gameOver() {
    console.log('gameover!');
    // this.scene.start('GameOverScene');
  }

  createCamera() {
    this.cameras.main.roundPixels = true;
    // this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setZoom(3.5);
    this.cameras.main.startFollow(this.player);
  }

  createPlayer() {
    this.player = new Player(this, 48, 32, 'atlas', 'idle/hero-idle-back/hero-idle-back');
    this.player.setSize(8, 13);
    this.add.existing(this.player);
  }

  updateHud() {
    this.hp1.setPosition(this.player.x - 8, this.player.y - 12);
    this.hp2.setPosition(this.player.x, this.player.y - 12);
    this.hp3.setPosition(this.player.x + 8, this.player.y - 12);
    this.killDisplay.setPosition(this.player.x - 110, this.player.y - 85);
    this.shotDisplay.setPosition(this.player.x - 55, this.player.y - 85);
    this.timeDisplay.setPosition(this.player.x - 5, this.player.y - 85);
    this.scoreDisplay.setPosition(this.player.x + 45, this.player.y - 85);
  }

  createHud() {
    // this.hp1 = this.add.sprite(this.player.x - 8, this.player.y - 12, 'atlas', 'hearts/hearts-1').setScrollFactor(0, 0);
    this.hp1 = this.add.sprite(this.player.x - 8, this.player.y - 12, 'atlas', 'hearts/hearts-1');
    this.hp2 = this.add.sprite(this.player.x, this.player.y - 12, 'atlas', 'hearts/hearts-1');
    this.hp3 = this.add.sprite(this.player.x + 8, this.player.y - 12, 'atlas', 'hearts/hearts-1');

    const fontConfig = {
      fontFamily: 'monospace',
      fontSize: 8,
      fontStyle: 'bold',
      color: '#00000',
      align: 'center',
    };

    this.killDisplay = this.add.text(this.player.x - 110, this.player.y - 85, 'KILLS:', fontConfig);

    this.shotDisplay = this.add.text(this.player.x - 50, this.player.y - 85, 'SHOTS:', fontConfig);

    this.timeDisplay = this.add.text(this.player.x - 50, this.player.y - 85, 'TIME:', fontConfig);

    this.scoreDisplay = this.add.text(this.player.x - 50, this.player.y - 85, 'SCORE:', fontConfig);


    // this.scoreLabel = this.add.bitmapText(10, 5, 'pixelFont', 'SCORE ', 40)
    // .setScrollFactor(0, 0);
    // this.healthLabel = this.add
    //   .bitmapText(10, 50, 'pixelFont', 'HEALTH ', 40)
    //   .setScrollFactor(0, 0);
  }

  createExit(x, y) {
    this.exit = this.add.sprite(x * 16, y * 16, 'exit');
    this.exit.alpha = 0;
  }


  createMoles() {
    const enemiesArray = this.map.createFromObjects('Object Layer', 6, { key: 'atlas' }, this);
    for (let i = 0; i < enemiesArray.length; i++) {
      const sprite = new Mole(this, enemiesArray[i].x / 16, enemiesArray[i].y / 16, true);
      sprite.setSize(10, 10, 7, 12);
      this.enemiesGroup.add(sprite).setDepth(1);
    }
  }

  createTreants() {
    const enemiesArray = this.map.createFromObjects('Object Layer', 5, { key: 'atlas' }, this);
    for (let i = 0; i < enemiesArray.length; i++) {
      const sprite = new Treant(this, enemiesArray[i].x / 16, enemiesArray[i].y / 16, false);
      sprite.setSize(10, 10, 7, 12);
      this.enemiesGroup.add(sprite);
    }
  }

  populate() {
    this.createMoles();
    this.createTreants();
  }

  createGroups() {
    this.enemiesGroup = this.add.group();
    this.projectilesGroup = this.add.group();
  }

  createMap() {
    const map = this.make.tilemap({ key: 'map' });
    const terrainset = map.addTilesetImage('tileset');
    const objectsset = map.addTilesetImage('objects');
    const collisions = map.addTilesetImage('collisions');
    const botLayer = map.createStaticLayer('Tile Layer', [objectsset, terrainset]);
    const topLayer = map.createStaticLayer('Tile Layer 2', [objectsset, terrainset]);
    const colLayer = map.createStaticLayer('Collisions Layer', [collisions]);

    map.setCollision([0, 1]);
    colLayer.visible = false;

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.colLayer = colLayer;
    this.map = map;
  }

  startSoundtrack() {
    this.soundtrack = this.sound.add('music');
    const soundtrackConfig = {
      mute: false,
      volume: 0.5,
      loop: true,
    };
    this.soundtrack.play(soundtrackConfig);
  }
}