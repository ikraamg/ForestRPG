import Phaser from 'phaser';
import { postScore } from '../api/api';

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

    this.inputText = this.add.dom(400, 300, 'input', {
      type: 'text',
      name: 'nameField',
      fontSize: '28px',
      backgroundColor: '#fff',
    });

    this.enter = this.input.keyboard.addKeys('enter');
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.enter.enter) && this.inputText.node.value !== '') {
      console.log(this.inputText.node.value);
      postScore(this.inputText.node.value, this.score);
      console.log('update -> postScore(this.inputText.node.value, this.score);', postScore(this.inputText.node.value, this.score));
    }
  }
}