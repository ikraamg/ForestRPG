import Phaser from 'phaser';
import { menuStyle } from '../ui/textStyles';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    this.soundtrack = this.game.registry.get('soundtrack');

    this.add.tileSprite(400, 300, 800, 600, 'title-bg');
    this.add.image(400, 200, 'logo');
    this.add.image(400, 400, 'enter').setScale(3);

    this.muteIcon = this.add.image(40, 40, 'mute').setScale(0.1).setAlpha(0);
    this.syncMuteIcon();

    this.add.text(400, 275, 'A Phaser 3 Game by Ikraam Ghoor', menuStyle).setOrigin(0.5);
    this.add.text(400, 500, "Press 'L' for the local leaderboard", menuStyle).setOrigin(0.5);
    this.add.text(400, 540, "Press 'M' to mute · 'C' for credits", menuStyle).setOrigin(0.5);

    this.menuKeys = this.input.keyboard.addKeys('enter, m, c, l');
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.menuKeys.c)) {
      this.scene.start('CreditsScene');
    }

    if (Phaser.Input.Keyboard.JustDown(this.menuKeys.m)) {
      this.toggleMusic();
    }

    if (Phaser.Input.Keyboard.JustDown(this.menuKeys.l)) {
      this.scene.start('LeaderBoardScene');
    }

    if (Phaser.Input.Keyboard.JustDown(this.menuKeys.enter)) {
      this.scene.start('GuideScene');
    }
  }

  toggleMusic() {
    this.game.registry.set('musicEnabled', !this.isMusicEnabled());
    this.syncMuteIcon();

    if (!this.soundtrack) return;

    if (this.isMusicEnabled()) {
      if (!this.soundtrack.isPlaying) this.soundtrack.play();
    } else {
      this.soundtrack.stop();
    }
  }

  isMusicEnabled() {
    return this.game.registry.get('musicEnabled') !== false;
  }

  syncMuteIcon() {
    this.muteIcon.setAlpha(this.isMusicEnabled() ? 0 : 1);
  }
}
