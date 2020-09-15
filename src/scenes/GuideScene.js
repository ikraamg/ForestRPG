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
    this.add.image(400, 225, 'instructions').setScale(3.5);
    this.add.image(400, 525, 'enter').setScale(3);

    this.add.text(120, 450,
      'Get 6 kills or more to open the mountain door.', {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });

    this.add.text(20, 415,
      'Try to quickly kill the most enemies, with the the least arrows.', {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });
  }
}