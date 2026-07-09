import Phaser from 'phaser';
import { postScore } from '../scores/scores';
import { bodyStyle, titleStyle } from '../ui/textStyles';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.score = data.score ?? 0;
    this.isSaving = false;
  }

  create() {
    this.addDisplayElements();
    this.endKeys = this.input.keyboard.addKeys('enter, space');
  }

  update() {
    if (this.isSaving) return;

    if (Phaser.Input.Keyboard.JustDown(this.endKeys.space)) {
      this.toLeaderBoard();
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.endKeys.enter)) {
      this.saveScoreAndContinue();
    }
  }

  addDisplayElements() {
    this.add.tileSprite(400, 300, 800, 600, 'title-bg');
    this.add.image(400, 400, 'enter').setScale(3);

    this.add.text(400, 50, 'Game Over', titleStyle).setOrigin(0.5);
    this.add.text(400, 110, `Your score is: ${this.score}`, bodyStyle).setOrigin(0.5);
    this.add.text(
      400,
      200,
      'Enter your name to save your score locally:',
      bodyStyle,
    ).setOrigin(0.5);
    this.add.text(400, 500, 'Press SPACE to skip this step', bodyStyle).setOrigin(0.5);

    this.inputText = this.add.dom(400, 300, 'input', {
      type: 'text',
      name: 'nameField',
      fontSize: '28px',
      backgroundColor: '#fff',
      maxLength: 16,
    });
  }

  async saveScoreAndContinue() {
    const name = this.inputText.node.value.trim();
    if (!name) return;

    this.isSaving = true;
    try {
      await postScore(name, this.score);
    } catch (error) {
      // Still continue to the board if storage fails.
      // eslint-disable-next-line no-console
      console.warn(error.message);
    }
    this.toLeaderBoard();
  }

  toLeaderBoard() {
    this.scene.start('LeaderBoardScene');
  }
}
