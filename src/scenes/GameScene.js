import Phaser from 'phaser';
import Arrow from '../objects/Arrow';
import Player from '../objects/Player';
import Enemy from '../objects/Enemy';
import { createGameAnimations } from '../game/animations';
import {
  DIRECTIONS,
  HURT_INVULN_MS,
  KILLS_TO_OPEN_EXIT,
  PLAYER_SPEED,
  SCORE_TIME_OFFSET_SEC,
  TILE_SIZE,
} from '../config/constants';
import { hudStyle } from '../ui/textStyles';

const MOLE_GID = 6;
const TREANT_GID = 5;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.addAudios();
    this.createMap();
    this.createGroups();
    this.createExit();
    this.populateEnemies();
    this.createPlayer();
    this.bindKeys();
    this.createHud();
    this.createCamera();
    createGameAnimations(this);
    this.startTime = this.time.now;
  }

  update(time) {
    this.handlePlayerInput();
    this.handleCollisions();
    this.updateScore(time);
    this.updateHud();
    this.cullOffscreenArrows();
    this.animateEnemies();
  }

  // --- Setup ---------------------------------------------------------------

  addAudios() {
    this.audioHurt = this.sound.add('hurt');
    this.audioItem = this.sound.add('item');
    this.audioEnemyDeath = this.sound.add('enemy-death');
    this.audioSlash = this.sound.add('slash');
  }

  createMap() {
    const map = this.make.tilemap({ key: 'map' });
    const terrain = map.addTilesetImage('tileset');
    const objects = map.addTilesetImage('objects');
    const collisions = map.addTilesetImage('collisions');

    map.createLayer('Tile Layer', [objects, terrain]);
    map.createLayer('Tile Layer 2', [objects, terrain]);

    this.colLayer = map.createLayer('Collisions Layer', [collisions]);
    this.colLayer.setVisible(false);
    map.setCollision([0, 1]);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.map = map;
  }

  createGroups() {
    this.enemiesGroup = this.add.group();
    this.projectilesGroup = this.add.group();
  }

  createExit() {
    this.exit = this.add.sprite(47.5 * TILE_SIZE, 28.5 * TILE_SIZE, 'exit');
    this.exit.setAlpha(0);
  }

  populateEnemies() {
    this.spawnEnemiesByGid(MOLE_GID, true, 'idle/mole-idle-front');
    this.spawnEnemiesByGid(TREANT_GID, false, 'idle/treant-idle-front');
  }

  spawnEnemiesByGid(gid, verticalMove, idleFrame) {
    const objectLayer = this.map.getObjectLayer('Object Layer');
    if (!objectLayer) return;

    objectLayer.objects
      .filter((obj) => obj.gid === gid)
      .forEach((obj) => {
        // Match legacy placement: Tiled object x/y → tile coords → world pixels.
        const enemy = new Enemy(
          this,
          obj.x / TILE_SIZE,
          obj.y / TILE_SIZE,
          verticalMove,
          idleFrame,
        );
        enemy.setSize(10, 10);
        enemy.setDepth(1);
        this.enemiesGroup.add(enemy);
      });
  }

  createPlayer() {
    this.player = new Player(this, 48, 32, 'atlas', 'idle/hero-idle-back/hero-idle-back');
    this.player.setSize(8, 13);
  }

  bindKeys() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createHud() {
    const { x, y } = this.player;

    this.hp1 = this.add.sprite(x - 8, y - 12, 'atlas', 'hearts/hearts-1');
    this.hp2 = this.add.sprite(x, y - 12, 'atlas', 'hearts/hearts-1');
    this.hp3 = this.add.sprite(x + 8, y - 12, 'atlas', 'hearts/hearts-1');

    this.killDisplay = this.add.text(x - 110, y - 85, 'KILLS: 0', hudStyle);
    this.shotDisplay = this.add.text(x - 50, y - 85, 'SHOTS: 0', hudStyle);
    this.timeDisplay = this.add.text(x - 50, y - 85, 'TIME: 0', hudStyle);
    this.scoreDisplay = this.add.text(x - 50, y - 85, 'SCORE: 0', hudStyle);
  }

  createCamera() {
    this.cameras.main.setRoundPixels(true);
    this.cameras.main.setZoom(3.5);
    this.cameras.main.startFollow(this.player);
  }

  // --- Update loops --------------------------------------------------------

  handlePlayerInput() {
    const { player, cursors } = this;
    const model = player.playerModel;
    player.walking = false;

    if (cursors.right.isDown) {
      this.movePlayer(PLAYER_SPEED, 0, DIRECTIONS.RIGHT, 'walk-side', false);
    } else if (cursors.left.isDown) {
      this.movePlayer(-PLAYER_SPEED, 0, DIRECTIONS.LEFT, 'walk-side', true);
    } else if (cursors.up.isDown) {
      this.movePlayer(0, -PLAYER_SPEED, DIRECTIONS.UP, 'walk-back', false);
    } else if (cursors.down.isDown) {
      this.movePlayer(0, PLAYER_SPEED, DIRECTIONS.DOWN, 'walk-front', false);
    } else {
      player.setVelocity(0);
      player.setFrame(player.frameMap[model.direction]);
      player.setFlipX(model.direction === DIRECTIONS.LEFT);
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      player.setVelocity(0);
      const shot = new Arrow(this);
      this.projectilesGroup.add(shot);
      this.audioSlash.play();
      model.shots += 1;
      this.shotDisplay.setText(`SHOTS: ${model.shots}`);
    }
  }

  movePlayer(vx, vy, direction, animKey, flipX) {
    const { player } = this;
    player.walking = true;
    player.setVelocity(vx, vy);
    player.playerModel.direction = direction;
    player.play(animKey, true);
    player.setFlipX(flipX);
  }

  updateScore(time) {
    const elapsed = Math.round(((time - this.startTime) / 1000) - SCORE_TIME_OFFSET_SEC);
    const score = this.player.playerModel.calculateScore(elapsed);
    this.timeDisplay.setText(`TIME: ${elapsed}`);
    this.scoreDisplay.setText(`SCORE: ${score}`);
  }

  handleCollisions() {
    this.physics.collide(this.player, this.colLayer);
    this.physics.collide(this.enemiesGroup, this.colLayer);
    this.physics.overlap(this.player, this.enemiesGroup, this.hurtPlayer, null, this);
    this.physics.overlap(this.player, this.exit, this.gameOver, null, this);
    this.physics.overlap(this.enemiesGroup, this.projectilesGroup, this.onEnemyHit, null, this);
  }

  onEnemyHit(enemy, shot) {
    enemy.destroy();
    shot.destroy();

    const { playerModel } = this.player;
    playerModel.kills += 1;
    this.audioEnemyDeath.play();
    this.killDisplay.setText(`KILLS: ${playerModel.kills}`);

    if (playerModel.kills >= KILLS_TO_OPEN_EXIT) {
      this.physics.world.enableBody(this.exit);
      this.exit.setAlpha(1);
    }
  }

  hurtPlayer(player) {
    const { playerModel } = player;
    if (playerModel.hurtFlag) return;

    playerModel.hurtFlag = true;
    this.time.delayedCall(HURT_INVULN_MS, () => {
      playerModel.hurtFlag = false;
      player.setAlpha(1);
    });

    player.setAlpha(0.5);
    playerModel.health -= 1;
    this.updateHealthDisplay();
    this.audioHurt.play();

    if (playerModel.health < 1) {
      playerModel.scoreCalc -= 200;
      this.gameOver();
    }
  }

  updateHealthDisplay() {
    const frames = {
      2: this.hp3,
      1: this.hp2,
      0: this.hp1,
    };
    const heart = frames[this.player.playerModel.health];
    if (heart) {
      heart.setTexture('atlas', 'hearts/hearts-2');
    }
  }

  gameOver() {
    this.scene.start('GameOverScene', { score: this.player.playerModel.scoreCalc });
  }

  updateHud() {
    const { x, y } = this.player;
    this.hp1.setPosition(x - 8, y - 12);
    this.hp2.setPosition(x, y - 12);
    this.hp3.setPosition(x + 8, y - 12);
    this.killDisplay.setPosition(x - 110, y - 85);
    this.shotDisplay.setPosition(x - 55, y - 85);
    this.timeDisplay.setPosition(x - 5, y - 85);
    this.scoreDisplay.setPosition(x + 45, y - 85);
  }

  animateEnemies() {
    this.enemiesGroup.getChildren().forEach((enemy) => {
      const { velocity } = enemy.body;
      if (velocity.x > 0) {
        enemy.play('tree-side', true);
        enemy.setFlipX(false);
      } else if (velocity.x < 0) {
        enemy.play('tree-side', true);
        enemy.setFlipX(true);
      } else if (velocity.y < 0) {
        enemy.play('mole-back', true);
      } else if (velocity.y > 0) {
        enemy.play('mole-front', true);
      }
    });
  }

  cullOffscreenArrows() {
    this.projectilesGroup.getChildren().forEach((arrow) => {
      if (!this.cameras.main.worldView.contains(arrow.x, arrow.y)) {
        arrow.destroy();
      }
    });
  }
}
