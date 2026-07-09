import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from './constants';
import BootScene from '../scenes/BootScene';
import LoadScene from '../scenes/LoadScene';
import MenuScene from '../scenes/MenuScene';
import CreditsScene from '../scenes/CreditsScene';
import GuideScene from '../scenes/GuideScene';
import GameScene from '../scenes/GameScene';
import GameOverScene from '../scenes/GameOverScene';
import LeaderBoardScene from '../scenes/LeaderBoardScene';

export function createGameConfig() {
  return {
    type: Phaser.AUTO,
    parent: 'game',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#0b1a12',
    pixelArt: true,
    roundPixels: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
      createContainer: true,
    },
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
}
