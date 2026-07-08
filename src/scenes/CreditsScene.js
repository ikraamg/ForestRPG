import Phaser from 'phaser';
import { bodyStyle, menuStyle } from '../ui/textStyles';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CreditsScene' });
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, 'title-bg');
    this.add.image(400, 200, 'logo');
    this.add.image(400, 525, 'enter').setScale(3);

    this.add.text(400, 275, 'A Phaser 3 Game by Ikraam Ghoor', menuStyle).setOrigin(0.5);
    this.add.text(400, 360, 'Art pack by Ansimuz', bodyStyle).setOrigin(0.5);
    this.add.text(400, 395, 'Music by Pascal Belisle', bodyStyle).setOrigin(0.5);

    this.menuKeys = this.input.keyboard.addKeys('enter');
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.menuKeys.enter)) {
      this.scene.start('MenuScene');
    }
  }
}
