export default class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadScene' });
  }

  preload() {
    // load title screen
    this.load.image('title-bg', './src/assets/sprites/title-screen-bg.png');
    this.load.image('title', './src/assets/sprites/title-screen.png');
    this.load.image('enter', './src/assets/sprites/press-enter-text.png');
    this.load.image('credits', './src/assets/sprites/credits-text.png');
    this.load.image('instructions', './src/assets/sprites/instructions.png');
    this.load.image('thisover', './src/assets/sprites/game-over.png');

    // tileset
    this.load.image('tileset', './src/assets/environment/tileset.png');
    this.load.image('objects', './src/assets/environment/objects.png');
    this.load.image('collisions', './src/assets/environment/collisions.png');

    this.load.tilemapTiledJSON('map', './src/assets/maps/map.json');

    this.load.atlas('atlas', './src/assets/atlas/atlas.png', './src/assets/atlas/atlas.json');
    this.load.atlas('atlas-props', './src/assets/atlas/atlas-props.png', './src/assets/atlas/atlas-props.json');

    // images
    this.load.image('exit', './src/assets/environment/exit-open.png');

    // audio
    this.load.audio('music', ['./src/assets/sound/ancient_path.ogg', './src/assets/sound/ancient_path.mp3']);
    this.load.audio('hurt', ['./src/assets/sound/hurt.ogg', './src/assets/sound/hurt.mp3']);
    this.load.audio('slash', ['./src/assets/sound/slash.ogg', './src/assets/sound/slash.mp3']);
    this.load.audio('item', ['./src/assets/sound/item.ogg', './src/assets/sound/item.mp3']);
    this.load.audio('enemy-death', ['./src/assets/sound/enemy-death.ogg', './src/assets/sound/enemy-death.mp3']);

    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    });
  }

  create() {
    this.scene.start('GameScene');
  }
}