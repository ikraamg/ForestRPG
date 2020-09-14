export default class Mole extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, verticalMove) {
    super(scene, x * 16, y * 16, 'atlas', 'idle/mole-idle-front');
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);

    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.setCollideWorldBounds(true);
    this.body.bounce.x = 1;
    this.body.bounce.y = 1;
    this.speed = 60;
    if (verticalMove) {
      this.body.velocity.y = this.speed;
    } else {
      this.body.velocity.x = this.speed;
    }
  }
}
