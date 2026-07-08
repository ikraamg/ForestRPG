import PlayerModel from '../objects/PlayerModel';

describe('PlayerModel', () => {
  let playerModel;

  beforeEach(() => {
    playerModel = new PlayerModel();
  });

  test('starts with default combat stats', () => {
    expect(playerModel).toMatchObject({
      health: 3,
      score: 0,
      hurtFlag: false,
      direction: 'down',
      kills: 0,
      shots: 0,
      scoreCalc: 0,
    });
  });

  test('stores score and health updates', () => {
    playerModel.score = 100;
    playerModel.health = 2;

    expect(playerModel.score).toBe(100);
    expect(playerModel.health).toBe(2);
  });

  test('tracks combat flags and counters', () => {
    playerModel.hurtFlag = true;
    playerModel.kills = 4;
    playerModel.shots = 7;
    playerModel.direction = 'left';

    expect(playerModel.hurtFlag).toBe(true);
    expect(playerModel.kills).toBe(4);
    expect(playerModel.shots).toBe(7);
    expect(playerModel.direction).toBe('left');
  });

  test('calculates score from health, kills, shots, and time', () => {
    playerModel.health = 3;
    playerModel.kills = 6;
    playerModel.shots = 10;

    const score = playerModel.calculateScore(20);

    // (3 * 200) + (6 * 100) - (10 * 10) - (20 * 2) = 1060
    expect(score).toBe(1060);
    expect(playerModel.scoreCalc).toBe(1060);
  });
});
