import Player from '../objects/player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.player = null;
    this.keyboard = null;
    this.map = null;
    this.colLayer = null;
  }

  // preload() {
  //   this.anims.add('walk-front', Phaser.Animation.generateFrameNames('walk/hero-walk-front/hero-walk-front-', 1, 6, '', 0), animVel, true);
  //   this.anims.create({
  //     key: 'walk-front',
  //     frameRate: 12,
  //     frames: this.anims.generateFrameNames('walk/hero-walk-front/hero-walk-front-', 1, 6, '', 0),
  //   });
  // }

  create() {
    this.startSoundtrack();
    this.map = this.createMap();
    this.createGroups();
    this.createExit(46, 27);
    this.createPlayer();
    this.bindKeys();
    this.createCamera();
    // this.createHud();
  }

  bindKeys() {
    // this.keyboard = this.input.keyboard.addKeys('W, A, S, D, SPACE');
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    this.physics.collide(this.player, this.colLayer);

    const velocity = 50;

    this.player.setVelocity(0);

    if (this.cursors.right.isDown) {
      this.player.setVelocity(velocity, 0);
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocity(-velocity, 0);
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocity(0, -velocity);
    }
    if (this.cursors.down.isDown) {
      this.player.setVelocity(0, velocity);
    }
    if (this.cursors.space.isDown) {
      this.player.setVelocity(0, 0);
    }
  }


  createCamera() {
    this.cameras.main.roundPixels = true;
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setZoom(3.5);
    this.cameras.main.startFollow(this.player);
  }

  createPlayer() {
    this.player = new Player(this, 48, 32, 'atlas', 'idle/hero-idle-back/hero-idle-back');
    this.player.setSize(6, 10, 13, 20);
    this.add.existing(this.player);
  }

  // createHud() {
  //   const hud1 = this.add.sprite(this.player.x - 10, this.player.y - 10, 'atlas', 'hearts/hearts-1');
  //   const hud2 = this.add.sprite(18, 5, 'atlas', 'hearts/hearts-1');
  //   const hud3 = this.add.sprite(26, 5, 'awtlas', 'hearts/hearts-1');
  //   hud1.fixedToCamera = true;
  //   hud1.cameraOffset = 10;

  //   // hud3.fixedToCamera = true;
  // }

  // populate() {
  //   // populate enemies from the tiled map from the objects layer
  //   this.createMoles();
  //   this.createTreants();
  // }

  createExit(x, y) {
    const exit = this.add.sprite(x * 16, y * 16, 'exit').setOrigin(0, 0);
    exit.alpha = 0;
  }

  createGroups() {
    const enemiesGroup = this.add.group();
    enemiesGroup.enableBody = true;
    //
    const lootGroup = this.add.group();
    lootGroup.enableBody = true;
    //
    const objectsGroup = this.add.group();
    objectsGroup.enableBody = true;
    //
    const projectilesGroup = this.add.group();
    projectilesGroup.enableBody = true;
  }

  createMap() {
    const map = this.make.tilemap({ key: 'map' });
    const terrainset = map.addTilesetImage('tileset');
    const objectsset = map.addTilesetImage('objects');
    const collisions = map.addTilesetImage('collisions');

    const botLayer = map.createStaticLayer('Tile Layer', [terrainset], 0, 0);
    const topLayer = map.createStaticLayer('Tile Layer 2', [objectsset], 0, 0);
    const colLayer = map.createStaticLayer('Collisions Layer', [collisions], 0, 0);

    map.setCollision([0, 1]);

    // colLayer.visible = false;
    colLayer.debug = true;

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.colLayer = colLayer;
    return map;
  }

  startSoundtrack() {
    const soundtrack = this.sound.add('music');
    const soundtrackConfig = {
      mute: false,
      volume: 0.5,
      loop: true,
    };
    soundtrack.play(soundtrackConfig);
  }
}