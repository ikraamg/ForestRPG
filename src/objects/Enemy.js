import Phaser from 'phaser';
import { ENEMY_SPEED, TILE_SIZE } from '../config/constants';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, tileX, tileY, verticalMove, atlasSprite) {
    super(scene, tileX * TILE_SIZE, tileY * TILE_SIZE, 'atlas', atlasSprite);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setCollideWorldBounds(true);
    this.body.bounce.set(1);

    if (verticalMove) {
      this.body.velocity.y = ENEMY_SPEED;
    } else {
      this.body.velocity.x = ENEMY_SPEED;
    }
  }
}
