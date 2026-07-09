import { DIRECTIONS } from '../config/constants';

export default class PlayerModel {
  constructor({
    health = 3,
    score = 0,
    hurtFlag = false,
    direction = DIRECTIONS.DOWN,
    kills = 0,
    shots = 0,
    scoreCalc = 0,
  } = {}) {
    this.health = health;
    this.score = score;
    this.hurtFlag = hurtFlag;
    this.direction = direction;
    this.kills = kills;
    this.shots = shots;
    this.scoreCalc = scoreCalc;
  }

  /**
   * Score formula: health & kills reward, shots & time penalize.
   * @param {number} elapsedSeconds
   * @returns {number}
   */
  calculateScore(elapsedSeconds) {
    this.scoreCalc = (this.health * 200)
      + (this.kills * 100)
      - (this.shots * 10)
      - (elapsedSeconds * 2);
    return this.scoreCalc;
  }
}
