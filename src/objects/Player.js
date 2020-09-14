
// eslint-disable-next-line no-undef
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x * 16, y * 16, texture, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);

    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.health = 3;
    this.setCollideWorldBounds(true);
    this.hurtFlag = false;
    this.direction = 'down';
    this.kills = 0;
    this.shots = 0;
    this.scoreCalc = 0;
  }
}
