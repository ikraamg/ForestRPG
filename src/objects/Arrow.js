
export default class Arrow extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, scene.player.x, scene.player.y, 'atlas', 'arrow');
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);

    scene.physics.world.enableBody(this);
    const vel = 270;
    switch (scene.player.direction) {
      case 'up':
        this.body.velocity.y = -vel;
        break;
      case 'down':
        this.body.velocity.y = vel;
        break;
      case 'left':
        this.body.velocity.x = -vel;
        this.angle = 90;
        break;
      case 'right':
        this.body.velocity.x = vel;
        this.angle = 270;
        break;
      default:
    }
  }

  update() {
    if (this.x < 32) {
      this.destroy();
    }
  }
}
