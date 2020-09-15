import Phaser from 'phaser';
import { getScores } from '../api/api';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderBoardScene' });
  }

  create() {
    this.add.text(400, 100, 'LeaderBoard', {
      color: 'white',
      fontSize: '32px ',
    }).setOrigin(0.5, 0.5);

    this.loading = this.add.text(400, 150, 'Loading...', {
      color: 'white',
      fontSize: '16px ',
    }).setOrigin(0.5, 0.5);

    getScores().then((scores) => {
      this.enterDisplay();
      const scoreStyle = {
        color: 'white',
        fontSize: '38px ',
      };
      const { result } = scores;
      const resultsCount = 5;
      result.sort((x, y) => y.score - x.score);
      result.slice(0, resultsCount).forEach((topscore, index) => {
        if (topscore) {
          this.add.text(60, 200 + (40 * index),
            `${index + 1}. Name: ${topscore.user} -- Score: ${topscore.score}`,
            scoreStyle);
        }
      });
    });

    this.endKeys = this.input.keyboard.addKeys('enter');
  }


  update() {
    if (Phaser.Input.Keyboard.JustDown(this.endKeys.enter)) {
      this.scene.start('GuideScene');
    }
  }

  enterDisplay() {
    this.loading.destroy();
    this.add.image(400, 500, 'enter').setScale(3);
  }
}