import Phaser from 'phaser';
// import { saveScore } from '../api/api';
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.background = this.add.tileSprite(400, 300, 800, 600, 'title-bg');
    this.pressEnter = this.add.image(400, 400, 'enter').setScale(3);

    this.add.text(290, 30,
      'Game Over', {
        fontFamily: 'monospace',
        fontSize: 40,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });
    this.add.text(290, 100,
      `Your score is: ${this.score}`, {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });
    this.add.text(150, 200,
      'Please enter your name to save your score:', {
        fontFamily: 'monospace',
        fontSize: 20,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      });
    // postScore(this.model.user, this.model.score);
    // this.gameButton = new Button(this, 400, (config.height / 2) + 170,
    // 'blueButton1', 'blueButton2', 'Submit Score', 'Leaderboard');
  }
}