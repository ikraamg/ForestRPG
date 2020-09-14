// eslint-disable-next-line no-undef
export default class Enemies extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, verticalMove, atlasSprite) {
    super(scene, x * 16, y * 16, 'atlas', atlasSprite);
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
