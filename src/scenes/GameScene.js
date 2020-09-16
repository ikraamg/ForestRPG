import Phaser from 'phaser';
import Arrow from '../objects/Arrow';
import Player from '../objects/Player';
import Enemy from '../objects/Enemy';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.addAudios();
    this.createMap();
    this.createGroups();
    this.createExit();
    this.populate();
    this.createPlayer();
    this.bindKeys();
    this.createHud();
    this.createCamera();
    this.createAnims();
    this.startTime = this.time.now;
  }

  update(time) {
    this.inputManager();
    this.interactionManager();
    this.scoreManager(time);
    this.updateHud();
    this.destroyArrows();
    this.animateEnemies();
  }

  // CREATE FUNCTIONS
  addAudios() {
    this.audioHurt = this.sound.add('hurt');
    this.audioItem = this.sound.add('item');
    this.audioEnemyDeath = this.sound.add('enemy-death');
    this.audioSlash = this.sound.add('slash');
  }

  createMap() {
    const map = this.make.tilemap({ key: 'map' });
    const terrainset = map.addTilesetImage('tileset');
    const objectsset = map.addTilesetImage('objects');
    const collisions = map.addTilesetImage('collisions');
    map.createStaticLayer('Tile Layer', [objectsset, terrainset]);
    map.createStaticLayer('Tile Layer 2', [objectsset, terrainset]);
    this.colLayer = map.createStaticLayer('Collisions Layer', [collisions]);
    this.colLayer.visible = false;
    map.setCollision([0, 1]);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.map = map;
  }

  createGroups() {
    this.enemiesGroup = this.add.group();
    this.projectilesGroup = this.add.group();
  }

  createExit() {
    this.exit = this.add.sprite(47.5 * 16, 28.5 * 16, 'exit');
    this.exit.alpha = 0;
  }

  populate() {
    this.createMoles();
    this.createTreants();
  }

  createPlayer() {
    this.player = new Player(this, 48, 32, 'atlas', 'idle/hero-idle-back/hero-idle-back');
    this.player.setSize(8, 13);
    this.add.existing(this.player);
  }

  bindKeys() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createHud() {
    this.hp1 = this.add.sprite(this.player.x - 8, this.player.y - 12, 'atlas', 'hearts/hearts-1');
    this.hp2 = this.add.sprite(this.player.x, this.player.y - 12, 'atlas', 'hearts/hearts-1');
    this.hp3 = this.add.sprite(this.player.x + 8, this.player.y - 12, 'atlas', 'hearts/hearts-1');

    const fontConfig = {
      fontFamily: 'monospace',
      fontSize: 8,
      fontStyle: 'bold',
      color: '#FFFFFF',
      align: 'center',
    };

    this.killDisplay = this.add.text(this.player.x - 110, this.player.y - 85, 'KILLS:', fontConfig);
    this.shotDisplay = this.add.text(this.player.x - 50, this.player.y - 85, 'SHOTS:', fontConfig);
    this.timeDisplay = this.add.text(this.player.x - 50, this.player.y - 85, 'TIME:', fontConfig);
    this.scoreDisplay = this.add.text(this.player.x - 50, this.player.y - 85, 'SCORE:', fontConfig);
  }

  createCamera() {
    this.cameras.main.roundPixels = true;
    this.cameras.main.setZoom(3.5);
    this.cameras.main.startFollow(this.player);
  }

  createAnims() {
    this.anims.create({
      key: 'walk-back',
      frames: this.anims.generateFrameNames('atlas', {
        prefix: 'walk/hero-walk-back/hero-walk-back-',
        suffix: '',
        start: 1,
        end: 6,
      }),
      frameRate: 6,
      repeat: true,
    });

    this.anims.create({
      key: 'walk-front',
      frames: this.anims.generateFrameNames('atlas', {
        prefix: 'walk/hero-walk-front/hero-walk-front-',
        suffix: '',
        start: 1,
        end: 6,
      }),
      frameRate: 6,
      repeat: true,
    });

    this.anims.create({
      key: 'walk-side',
      frames: this.anims.generateFrameNames('atlas', {
        prefix: 'walk/hero-walk-side/hero-walk-side-',
        suffix: '',
        start: 1,
        end: 6,
      }),
      frameRate: 6,
      repeat: true,
    });

    this.anims.create({
      key: 'mole-back',
      frames: this.anims.generateFrameNames('atlas', {
        prefix: 'walk/mole-walk-back/mole-walk-back-',
        suffix: '',
        start: 1,
        end: 6,
      }),
      frameRate: 6,
      repeat: true,
    });

    this.anims.create({
      key: 'mole-front',
      frames: this.anims.generateFrameNames('atlas', {
        prefix: 'walk/mole-walk-front/mole-walk-front-',
        suffix: '',
        start: 1,
        end: 6,
      }),
      frameRate: 6,
      repeat: true,
    });

    this.anims.create({
      key: 'mole-side',
      frames: this.anims.generateFrameNames('atlas', {
        prefix: 'walk/mole-walk-side/mole-walk-side-',
        suffix: '',
        start: 1,
        end: 6,
      }),
      frameRate: 6,
      repeat: true,
    });

    this.anims.create({
      key: 'tree-back',
      frames: this.anims.generateFrameNames('atlas', {
        prefix: 'walk/treant-walk-back/treant-walk-back-',
        suffix: '',
        start: 1,
        end: 6,
      }),
      frameRate: 6,
      repeat: true,
    });

    this.anims.create({
      key: 'tree-front',
      frames: this.anims.generateFrameNames('atlas', {
        prefix: 'walk/treant-walk-front/treant-walk-front-',
        suffix: '',
        start: 1,
        end: 6,
      }),
      frameRate: 6,
      repeat: true,
    });

    this.anims.create({
      key: 'tree-side',
      frames: this.anims.generateFrameNames('atlas', {
        prefix: 'walk/treant-walk-side/treant-walk-side-',
        suffix: '',
        start: 1,
        end: 6,
      }),
      frameRate: 6,
      repeat: true,
    });
  }

  // UPDATE FUNCTIONS
  inputManager() {
    const velocity = 50;
    this.player.walking = false;
    if (this.cursors.right.isDown) {
      this.player.walking = true;
      this.player.setVelocity(velocity, 0);
      this.player.playerModel.direction = 'right';
      this.player.play('walk-side', true);
      this.player.setFlipX(false);
    } else
    if (this.cursors.left.isDown) {
      this.player.walking = true;
      this.player.setVelocity(-velocity, 0);
      this.player.playerModel.direction = 'left';
      this.player.play('walk-side', true);
      this.player.setFlipX(true);
    } else
    if (this.cursors.up.isDown) {
      this.player.walking = true;
      this.player.setVelocity(0, -velocity);
      this.player.playerModel.direction = 'up';
      this.player.play('walk-back', true);
    } else
    if (this.cursors.down.isDown) {
      this.player.walking = true;
      this.player.setVelocity(0, velocity);
      this.player.playerModel.direction = 'down';
      this.player.play('walk-front', true);
    } else if (!this.player.walking) {
      this.player.setVelocity(0);
      this.player.setFrame(this.player.frameMap[this.player.playerModel.direction]);
      // eslint-disable-next-line no-unused-expressions
      this.player.playerModel.direction === 'left' ? this.player.setFlipX(true) : this.player.setFlipX(false);
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.player.setVelocity(0, 0);
      const shot = new Arrow(this);
      this.projectilesGroup.add(shot);
      this.audioSlash.play();
      this.player.playerModel.shots += 1;
      this.shotDisplay.setText(`SHOTS: ${this.player.playerModel.shots}`);
    }
  }

  scoreManager(time) {
    const timeCount = Math.round(((time - this.startTime) / 1000) - 5);
    this.player.playerModel.scoreCalc = (this.player.playerModel.health * 200
      + this.player.playerModel.kills * 100
      - this.player.playerModel.shots * 10 - timeCount * 2);
    this.timeDisplay.setText(`TIME: ${timeCount}`);
    this.scoreDisplay.setText(`SCORE: ${this.player.playerModel.scoreCalc}`);
  }

  interactionManager() {
    this.physics.collide(this.player, this.colLayer);
    this.physics.collide(this.enemiesGroup, this.colLayer);
    this.physics.overlap(this.player, this.enemiesGroup, this.hurtPlayer, null, this);
    this.physics.overlap(this.player, this.exit, this.gameOver, null, this);
    this.physics.overlap(this.enemiesGroup, this.projectilesGroup, this.shotImpact, null, this);
  }

  shotImpact(enemy, shot) {
    enemy.destroy();
    shot.destroy();
    this.player.playerModel.kills += 1;
    this.audioEnemyDeath.play();

    if (this.player.playerModel.kills > 5) {
      this.physics.world.enableBody(this.exit);
      this.exit.alpha = 1;
    }
    this.killDisplay.setText(`KILLS: ${this.player.playerModel.kills}`);
  }

  resetHurtTime() {
    this.player.playerModel.hurtFlag = false;
    this.player.alpha = 1;
  }

  updateHealthDisplay() {
    switch (this.player.playerModel.health) {
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

  hurtPlayer(player) {
    if (player.playerModel.hurtFlag) {
      return;
    }

    player.playerModel.hurtFlag = true;
    this.time.addEvent({
      delay: 2000,
      callback: this.resetHurtTime,
      callbackScope: this,
    });

    player.alpha = 0.5;
    player.playerModel.health -= 1;
    this.updateHealthDisplay();
    this.audioHurt.play();

    if (player.playerModel.health < 1) {
      this.player.playerModel.scoreCalc -= 200;
      this.gameOver();
    }
  }

  gameOver() {
    this.scene.start('GameOverScene', { score: this.player.playerModel.scoreCalc });
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

  createMoles() {
    const enemiesArray = this.map.createFromObjects('Object Layer', 6, { key: 'atlas' }, this);
    enemiesArray.forEach((enemy) => {
      const mole = new Enemy(this, enemy.x / 16, enemy.y / 16, true, 'idle/mole-idle-front');
      mole.setSize(10, 10, 7, 12);
      this.enemiesGroup.add(mole).setDepth(1);
    });
  }

  createTreants() {
    const enemiesArray = this.map.createFromObjects('Object Layer', 5, { key: 'atlas' }, this);
    enemiesArray.forEach((enemy) => {
      const treant = new Enemy(this, enemy.x / 16, enemy.y / 16, false, 'idle/treant-idle-front');
      treant.setSize(10, 10, 7, 12);
      this.enemiesGroup.add(treant).setDepth(1);
    });
  }

  animateEnemies() {
    for (let i = 0; i < this.enemiesGroup.getChildren().length; i += 1) {
      const enemy = this.enemiesGroup.getChildren()[i];
      if (enemy.body.velocity.x > 0) {
        enemy.play('tree-side', true);
        enemy.setFlipX(false);
      } else if (enemy.body.velocity.x < 0) {
        enemy.play('tree-side', true);
        enemy.setFlipX(true);
      } else if (enemy.body.velocity.y < 0) {
        enemy.play('mole-back', true);
      } else if (enemy.body.velocity.y > 0) {
        enemy.play('mole-front', true);
      }
    }
  }

  destroyArrows() {
    for (let i = 0; i < this.projectilesGroup.getChildren().length; i += 1) {
      const arrow = this.projectilesGroup.getChildren()[i];
      if (!this.cameras.main.worldView.contains(arrow.x, arrow.y)) {
        arrow.destroy();
      }
    }
  }
}