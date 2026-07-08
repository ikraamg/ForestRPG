import Phaser from 'phaser';
import { bodyStyle } from '../ui/textStyles';

export default class GuideScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GuideScene' });
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, 'title-bg');
    this.add.image(400, 225, 'instructions').setScale(3.5);
    this.add.image(400, 525, 'enter').setScale(3);

    this.add.text(
      400,
      415,
      'Kill enemies quickly with as few arrows as you can.',
      bodyStyle,
    ).setOrigin(0.5);

    this.add.text(
      400,
      450,
      'Get 6 kills or more to open the mountain door.',
      bodyStyle,
    ).setOrigin(0.5);

    this.enterKey = this.input.keyboard.addKeys('enter');
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.enterKey.enter)) {
      this.scene.start('GameScene');
    }
  }
}
