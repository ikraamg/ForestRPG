/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  init(data) {
    this.soundtrack = data.soundtrack;
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, 'title-bg');
    this.add.image(400, 200, 'logo');
    this.add.image(400, 400, 'enter').setScale(3);
    this.mute = this.add.image(40, 40, 'mute').setScale(0.1).setAlpha(0);
    const textConfig = {
      fontFamily: 'monospace',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    };

    this.add.text(170, 260,
      'A Phaser 3 Game by Ikraam Ghoor', textConfig);
    this.add.text(80, 544,
      "Press 'M' to toggle mute and 'C' for credits", textConfig);
    this.add.text(150, 500,
      "Press 'L' to access the leaderboard", textConfig);
    this.menuKeys = this.input.keyboard.addKeys('enter, m, c, l');
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.menuKeys.c)) {
      this.scene.start('CreditsScene');
    }

    if (Phaser.Input.Keyboard.JustDown(this.menuKeys.m)) {
      this.game.config.musicStatus = !this.game.config.musicStatus;
      this.game.config.musicStatus ? this.mute.setAlpha(0) : this.mute.setAlpha(1);
      this.game.config.musicStatus ? this.soundtrack.play() : this.soundtrack.stop();
    }

    if (Phaser.Input.Keyboard.JustDown(this.menuKeys.l)) {
      this.scene.start('LeaderBoardScene');
    }

    if (Phaser.Input.Keyboard.JustDown(this.menuKeys.enter)) {
      this.scene.start('GuideScene');
    }
  }
}