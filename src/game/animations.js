/**
 * Register walk-cycle animations used by the player and enemies.
 * @param {Phaser.Scene} scene
 */
export function createGameAnimations(scene) {
  const definitions = [
    { key: 'walk-back', prefix: 'walk/hero-walk-back/hero-walk-back-' },
    { key: 'walk-front', prefix: 'walk/hero-walk-front/hero-walk-front-' },
    { key: 'walk-side', prefix: 'walk/hero-walk-side/hero-walk-side-' },
    { key: 'mole-back', prefix: 'walk/mole-walk-back/mole-walk-back-' },
    { key: 'mole-front', prefix: 'walk/mole-walk-front/mole-walk-front-' },
    { key: 'mole-side', prefix: 'walk/mole-walk-side/mole-walk-side-' },
    { key: 'tree-back', prefix: 'walk/treant-walk-back/treant-walk-back-' },
    { key: 'tree-front', prefix: 'walk/treant-walk-front/treant-walk-front-' },
    { key: 'tree-side', prefix: 'walk/treant-walk-side/treant-walk-side-' },
  ];

  definitions.forEach(({ key, prefix }) => {
    if (scene.anims.exists(key)) return;

    scene.anims.create({
      key,
      frames: scene.anims.generateFrameNames('atlas', {
        prefix,
        start: 1,
        end: 6,
      }),
      frameRate: 6,
      repeat: -1,
    });
  });
}
