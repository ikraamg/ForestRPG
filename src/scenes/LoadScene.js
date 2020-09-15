import Phaser from 'phaser';

export default class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadScene' });
  }

  preload() {
    this.add.image(400, 200, 'logo');
    this.loadBar();
    this.loadImages();
    this.loadMaps();
    this.loadAudio();
  }

  create() {
    this.soundtrack = this.sound.add('music');
    const soundtrackConfig = {
      mute: false,
      volume: 0.5,
      loop: true,
    };
    this.soundtrack.play(soundtrackConfig);
    this.scene.start('MenuScene', { soundtrack: this.soundtrack });
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
    this.load.image('title-bg', './assets/sprites/title-screen-bg.png');
    this.load.image('enter', './assets/sprites/press-enter-text.png');
    this.load.image('instructions', './assets/sprites/instructions.png');
    this.load.image('mute', './assets/sprites/mute.png');
    this.load.image('sound', './assets/sprites/sound.png');
    this.load.image('exit', './assets/environment/exit-open.png');
  }

  loadAudio() {
    this.load.audio('music', ['./assets/sound/ancient_path.ogg', './assets/sound/ancient_path.mp3']);
    this.load.audio('hurt', ['./assets/sound/hurt.ogg', './assets/sound/hurt.mp3']);
    this.load.audio('slash', ['./assets/sound/slash.ogg', './assets/sound/slash.mp3']);
    this.load.audio('item', ['./assets/sound/item.ogg', './assets/sound/item.mp3']);
    this.load.audio('enemy-death', ['./assets/sound/enemy-death.ogg', './assets/sound/enemy-death.mp3']);
  }

  loadMaps() {
    this.load.image('tileset', './assets/environment/tileset.png');
    this.load.image('objects', './assets/environment/objects.png');
    this.load.image('collisions', './assets/environment/collisions.png');
    this.load.tilemapTiledJSON('map', './assets/maps/map.json');
    this.load.atlas('atlas', './assets/atlas/atlas.png', './assets/atlas/atlas.json');
    this.load.atlas('atlas-props', './assets/atlas/atlas-props.png', './assets/atlas/atlas-props.json');
  }
}