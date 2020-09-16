import Phaser from 'phaser';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CreditsScene' });
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, 'title-bg');
    this.add.image(400, 200, 'logo');
    this.add.image(400, 525, 'enter').setScale(3);


    const textConfig = {
      fontFamily: 'monospace',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    };

    this.add.text(170, 260,
      'A Phaser 3 Game by Ikraam Ghoor', textConfig);
    this.add.text(60, 360,
      'Art Pack by Asimuz and Music by Pascal Belisle', textConfig);
    this.menuKeys = this.input.keyboard.addKeys('enter, m , s, c');
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.menuKeys.enter)) {
      this.scene.start('MenuScene');
    }
  }
}