export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const PLAYER_SPEED = 50;
export const ARROW_SPEED = 270;
export const ENEMY_SPEED = 60;

export const TILE_SIZE = 16;
export const KILLS_TO_OPEN_EXIT = 6;
export const HURT_INVULN_MS = 2000;
export const SCORE_TIME_OFFSET_SEC = 5;

export const LEADERBOARD_DISPLAY_COUNT = 5;

export const DIRECTIONS = Object.freeze({
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
});

export const IDLE_FRAMES = Object.freeze({
  [DIRECTIONS.UP]: 'idle/hero-idle-back/hero-idle-back',
  [DIRECTIONS.DOWN]: 'idle/hero-idle-front/hero-idle-front',
  [DIRECTIONS.LEFT]: 'idle/hero-idle-side/hero-idle-side',
  [DIRECTIONS.RIGHT]: 'idle/hero-idle-side/hero-idle-side',
});
