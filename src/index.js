import Phaser from 'phaser';
import { createGameConfig } from './config/gameConfig';

const game = new Phaser.Game(createGameConfig());

export default game;
