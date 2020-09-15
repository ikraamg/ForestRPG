/* eslint-disable no-use-before-define */
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import LoadScene from './scenes/LoadScene';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';


const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  pixelArt: true,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [
    BootScene,
    LoadScene,
    // MenuScene,
    GameScene,
    GameOverScene,
  ],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
