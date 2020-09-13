/* eslint-disable max-classes-per-file */
export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x * 16, y * 16, texture, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);

    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.health = 3;
    this.setCollideWorldBounds(true);
    // const animVel = 12;
    // this.state = walking_down;
    // this.animations.add('idle-front', ['idle/hero-idle-front/hero-idle-front'], 0, true);
  }
}


// class Player2 {
//   constructor(game, x, y) {
//     // x *= 16;
//     // y *= 16;
//     this.initX = x;
//     this.initY = y;
//     // this.health = 3;
//     // Phaser.Sprite.call(this, game, x, y, 'atlas', 'idle/hero-idle-back/hero-idle-back');
//     this.anchor.setTo(0.5);
//     // game.physics.arcade.enable(this);
//     // this.body.setSize(6, 10, 13, 20);
//     // add animations
//     const animVel = 12;
//     this.animations.add('idle-front', ['idle/hero-idle-front/hero-idle-front'], 0, true);
//     this.animations.add('idle-back', ['idle/hero-idle-back/hero-idle-back'], 0, true);
//     this.animations.add('idle-side', ['idle/hero-idle-side/hero-idle-side'], 0, true);
//     //
//     this.animations.add('walk-front', Phaser.Animation.generateFrameNames('walk/hero-walk-front/hero-walk-front-', 1, 6, '', 0), animVel, true);
//     this.animations.add('walk-back', Phaser.Animation.generateFrameNames('walk/hero-walk-back/hero-walk-back-', 1, 6, '', 0), animVel, true);
//     this.animations.add('walk-side', Phaser.Animation.generateFrameNames('walk/hero-walk-side/hero-walk-side-', 1, 6, '', 0), animVel, true);
//     //
//     const attack_front = this.animations.add('attack-front', Phaser.Animation.generateFrameNames('attack-weapon/hero-attack-front/hero-attack-front-weapon-', 1, 3, '', 0), animVel, false);
//     const attack_back = this.animations.add('attack-back', Phaser.Animation.generateFrameNames('attack-weapon/hero-attack-back/hero-attack-back-weapon-', 1, 3, '', 0), animVel, false);
//     const attack_side = this.animations.add('attack-side', Phaser.Animation.generateFrameNames('attack-weapon/hero-attack-side/hero-attack-side-weapon-', 1, 3, '', 0), animVel, false);
//     // set flag to false on complete
//     attack_front.onComplete.add(resetAttackFlag, this);
//     attack_back.onComplete.add(resetAttackFlag, this);
//     attack_side.onComplete.add(resetAttackFlag, this);

//     function resetAttackFlag() {
//       attackFlag = 2;
//     }

//     this.animations.play('coin');
//     this.type = 'player';
//     player = this;
//   }
// }
// Player2.prototype = Object.create(Phaser.Sprite.prototype);
// Player2.prototype.constructor = Player;
// // Player.prototype.update = function () {
// //   // player attack animation
// //   // if (attackFlag == 2) {
// //   //   return;
// //   // }

// //   // player attack animation
// //   // if (attackFlag == 1) {
// //   //   if (player_state == PLAYER_STATE.WALKING_DOWN || player_state == PLAYER_STATE.DOWN) {
// //   //     this.animations.play('attack-front');
// //   //   } else if (player_state == PLAYER_STATE.WALKING_UP || player_state == PLAYER_STATE.UP) {
// //   //     this.animations.play('attack-back');
// //   //   } else if (player_state == PLAYER_STATE.WALKING_LEFT || player_state == PLAYER_STATE.LEFT) {
// //   //     this.animations.play('attack-side');
// //   //   } else if (player_state == PLAYER_STATE.WALKING_RIGHT || player_state == PLAYER_STATE.RIGHT) {
// //   //     this.animations.play('attack-side');
// //   //   }
// //   //   return;
// //   // }

// //   // player walk animation
// //   // if (player_state == PLAYER_STATE.WALKING_DOWN) {
// //   //   this.animations.play('walk-front');
// //   //   this.scale.x = 1;
// //   // } else if (player_state == PLAYER_STATE.WALKING_UP) {
// //   //   this.animations.play('walk-back');
// //   //   this.scale.x = 1;
// //   // } else if (player_state == PLAYER_STATE.WALKING_LEFT) {
// //   //   this.animations.play('walk-side');
// //   //   this.scale.x = -1;
// //   // } else if (player_state == PLAYER_STATE.WALKING_RIGHT) {
// //   //   this.animations.play('walk-side');
// //   //   this.scale.x = 1;
// //   // } else if (player_state == PLAYER_STATE.DOWN) {
// //   //   this.animations.play('idle-front');
// //   //   this.scale.x = 1;
// //   // } else if (player_state == PLAYER_STATE.UP) {
// //   //   this.animations.play('idle-back');
// //   //   this.scale.x = 1;
// //   // } else if (player_state == PLAYER_STATE.LEFT) {
// //   //   this.animations.play('idle-side');
// //   // } else if (player_state == PLAYER_STATE.RIGHT) {
// //   //   this.animations.play('idle-side');
// //   // }
// // };