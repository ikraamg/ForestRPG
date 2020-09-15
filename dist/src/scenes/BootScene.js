import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('logo', './src/assets/sprites/logo.png');
  }

  create() {
    this.scene.start('LoadScene');
  }
}