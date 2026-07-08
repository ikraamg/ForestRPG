import Phaser from 'phaser';
import PlayerModel from './PlayerModel';
import { IDLE_FRAMES, TILE_SIZE } from '../config/constants';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, tileX, tileY, texture, frame) {
    super(scene, tileX * TILE_SIZE, tileY * TILE_SIZE, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setCollideWorldBounds(true);

    this.playerModel = new PlayerModel();
    this.walking = false;
    this.frameMap = { ...IDLE_FRAMES };
  }
}
