/* eslint-disable no-use-before-define */
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import LoadScene from './scenes/LoadScene';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 0 }, // TODO Just check this out is this correct?
      debug: true,
    },
  },
  scene: [
    BootScene,
    LoadScene,
    // MenuScene,
    GameScene,
  ],
};

const game = new Phaser.Game(config);
