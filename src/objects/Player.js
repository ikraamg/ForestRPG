import Phaser from 'phaser';
import PlayerModel from './PlayerModel';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x * 16, y * 16, texture, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.setCollideWorldBounds(true);
    this.playerModel = new PlayerModel();
    this.frameMap = {
      up: 'idle/hero-idle-back/hero-idle-back',
      down: 'idle/hero-idle-front/hero-idle-front',
      left: 'idle/hero-idle-side/hero-idle-side',
      right: 'idle/hero-idle-side/hero-idle-side',
    };
  }
}
