/* eslint-disable no-underscore-dangle */
export default class PlayerModel {
  constructor() {
    this._health = 3;
    this._score = 0;
    this._hurtFlag = false;
    this._direction = 'down';
    this._kills = 0;
    this._shots = 0;
    this._scoreCalc = 0;
  }

  set health(value) {
    this._health = value;
  }

  get health() {
    return this._health;
  }

  set score(value) {
    this._score = value;
  }

  get score() {
    return this._score;
  }

  set hurtFlag(value) {
    this._hurtFlag = value;
  }

  get hurtFlag() {
    return this._hurtFlag;
  }

  set direction(value) {
    this._direction = value;
  }

  get direction() {
    return this._direction;
  }

  set kills(value) {
    this._kills = value;
  }

  get kills() {
    return this._kills;
  }

  set scoreCalc(value) {
    this._scoreCalc = value;
  }

  get scoreCalc() {
    return this._scoreCalc;
  }

  set shots(value) {
    this._shots = value;
  }

  get shots() {
    return this._shots;
  }
}