/* eslint-disable no-use-before-define */
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import LoadScene from './scenes/LoadScene';
import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';
import LeaderBoardScene from './scenes/LeaderBoardScene';
import GuideScene from './scenes/GuideScene';
import CreditsScene from './scenes/CreditsScene';


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
    MenuScene,
    CreditsScene,
    GuideScene,
    GameScene,
    GameOverScene,
    LeaderBoardScene,
  ],
};

const game = new Phaser.Game(config);
game.config.musicStatus = true;
