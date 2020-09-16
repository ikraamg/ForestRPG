import PlayerModel from '../objects/PlayerModel';

const playerModel = new PlayerModel();

describe('Create and read the score', () => {
  it('create the score', () => {
    playerModel.score = '100';
    expect(playerModel.score).toBe('100');
  });

  it('read the score', () => {
    expect(playerModel.score).toBe('100');
  });
});

describe('Create and read the health', () => {
  it('create the health', () => {
    playerModel.health = '3';
    expect(playerModel.health).toBe('3');
  });

  it('read the health', () => {
    expect(playerModel.health).toBe('3');
  });
});

describe('Create and read the hurtFlag', () => {
  it('create the hurtFlag', () => {
    playerModel.hurtFlag = 'true';
    expect(playerModel.hurtFlag).toBe('true');
  });

  it('read the hurtFlag', () => {
    expect(playerModel.hurtFlag).toBe('true');
  });
});

describe('Create and read the kills', () => {
  it('create the kills', () => {
    playerModel.kills = '100';
    expect(playerModel.kills).toBe('100');
  });

  it('read the kills', () => {
    expect(playerModel.kills).toBe('100');
  });
});

describe('Create and read the scoreCalc', () => {
  it('create the scoreCalc', () => {
    playerModel.scoreCalc = '100';
    expect(playerModel.scoreCalc).toBe('100');
  });

  it('read the scoreCalc', () => {
    expect(playerModel.scoreCalc).toBe('100');
  });
});

describe('Create and read the shots', () => {
  it('create the shots', () => {
    playerModel.shots = '100';
    expect(playerModel.shots).toBe('100');
  });

  it('read the shots', () => {
    expect(playerModel.shots).toBe('100');
  });
});

describe('Create and read the direction', () => {
  it('create the direction', () => {
    playerModel.direction = 'left';
    expect(playerModel.direction).toBe('left');
  });

  it('read the direction', () => {
    expect(playerModel.direction).toBe('left');
  });
});
