import Phaser from 'phaser';

export default class GuideScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GuideScene' });
  }

  create() {
    this.addDisplayElements();
    this.enterKey = this.input.keyboard.addKeys('enter');
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.enterKey.enter)) {
      this.scene.start('GameScene');
    }
  }

  addDisplayElements() {
    this.add.tileSprite(400, 300, 800, 600, 'title-bg');
    this.add.image(400, 250, 'instructions').setScale(3.5);
    this.add.image(400, 500, 'enter').setScale(3);
  }
}