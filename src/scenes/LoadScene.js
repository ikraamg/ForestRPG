import Phaser from 'phaser';

export default class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadScene' });
  }

  preload() {
    this.loadImages();
    this.loadMaps();
    this.loadAudio();
    this.loadBar();
  }

  create() {
    this.scene.start('GameScene');
  }

  // Preload Methods

  loadBar() {
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    });
  }

  loadImages() {
    this.load.image('title-bg', './src/assets/sprites/title-screen-bg.png');
    this.load.image('enter', './src/assets/sprites/press-enter-text.png');
    this.load.image('instructions', './src/assets/sprites/instructions.png');
    this.load.image('exit', './src/assets/environment/exit-open.png');
  }

  loadAudio() {
    this.load.audio('music', ['./src/assets/sound/ancient_path.ogg', './src/assets/sound/ancient_path.mp3']);
    this.load.audio('hurt', ['./src/assets/sound/hurt.ogg', './src/assets/sound/hurt.mp3']);
    this.load.audio('slash', ['./src/assets/sound/slash.ogg', './src/assets/sound/slash.mp3']);
    this.load.audio('item', ['./src/assets/sound/item.ogg', './src/assets/sound/item.mp3']);
    this.load.audio('enemy-death', ['./src/assets/sound/enemy-death.ogg', './src/assets/sound/enemy-death.mp3']);
  }

  loadMaps() {
    this.load.image('tileset', './src/assets/environment/tileset.png');
    this.load.image('objects', './src/assets/environment/objects.png');
    this.load.image('collisions', './src/assets/environment/collisions.png');
    this.load.tilemapTiledJSON('map', './src/assets/maps/map.json');
    this.load.atlas('atlas', './src/assets/atlas/atlas.png', './src/assets/atlas/atlas.json');
    this.load.atlas('atlas-props', './src/assets/atlas/atlas-props.png', './src/assets/atlas/atlas-props.json');
  }
}