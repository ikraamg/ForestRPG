/* eslint-disable no-use-before-define */
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import LoadScene from './scenes/LoadScene';
import MenuScene from './scenes/MenuScene';


const config = {
  type: Phaser.AUTO,
  // parent: 'game',
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // TODO Just check this out is this correct?
    },
  },
  scene: [
    BootScene,
    LoadScene,
    MenuScene,
  ],
};

const game = new Phaser.Game(config);
