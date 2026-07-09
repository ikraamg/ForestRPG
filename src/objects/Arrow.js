import Phaser from 'phaser';
import { ARROW_SPEED, DIRECTIONS } from '../config/constants';

export default class Arrow extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    const { player } = scene;
    super(scene, player.x, player.y, 'atlas', 'arrow');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    switch (player.playerModel.direction) {
      case DIRECTIONS.UP:
        this.body.velocity.y = -ARROW_SPEED;
        break;
      case DIRECTIONS.DOWN:
        this.body.velocity.y = ARROW_SPEED;
        break;
      case DIRECTIONS.LEFT:
        this.body.velocity.x = -ARROW_SPEED;
        this.angle = 90;
        break;
      case DIRECTIONS.RIGHT:
        this.body.velocity.x = ARROW_SPEED;
        this.angle = 270;
        break;
      default:
        break;
    }
  }
}
