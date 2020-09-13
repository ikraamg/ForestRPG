export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('loading', './src/assets/sprites/loading.png');
  }

  create() {
    this.scene.start('LoadScene');
  }
}