import Phaser from 'phaser';
import { getTopScores } from '../scores/scores';
import { LEADERBOARD_DISPLAY_COUNT } from '../config/constants';
import {
  bodyStyle,
  captionStyle,
  headingStyle,
  leaderboardRowStyle,
} from '../ui/textStyles';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderBoardScene' });
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, 'title-bg');

    this.add.text(400, 80, 'Leaderboard', headingStyle).setOrigin(0.5);
    this.add.text(400, 120, 'Top scores saved on this device', captionStyle).setOrigin(0.5);

    this.renderScores();
    this.add.image(400, 520, 'enter').setScale(3);
    this.add.text(400, 560, 'Press ENTER to return to the menu', bodyStyle).setOrigin(0.5);

    this.endKeys = this.input.keyboard.addKeys('enter');
  }

  renderScores() {
    const scores = getTopScores(LEADERBOARD_DISPLAY_COUNT);

    if (scores.length === 0) {
      this.add.text(400, 280, 'No scores yet — go make history!', bodyStyle).setOrigin(0.5);
      return;
    }

    scores.forEach((entry, index) => {
      this.add.text(
        400,
        190 + (index * 48),
        `${index + 1}. ${entry.user}  —  ${entry.score}`,
        leaderboardRowStyle,
      ).setOrigin(0.5);
    });
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.endKeys.enter)) {
      this.scene.start('MenuScene');
    }
  }
}
