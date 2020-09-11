export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
    console.log('BootScene#constructor');
  }

  preload() {
    this.load.image('loading', './src/assets/sprites/loading.png');
  }

  create() {
    // this.game.scale.pageAlignHorizontally = true;
    // this.game.scale.pageAlignVertically = true;
    // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    console.log('About to start loadscene:');
    this.scene.start('LoadScene');
  }
}