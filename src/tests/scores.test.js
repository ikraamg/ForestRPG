import {
  clearScores,
  getScores,
  getTopScores,
  postScore,
} from '../scores/scores';

describe('localStorage leaderboard', () => {
  beforeEach(() => {
    clearScores();
  });

  test('saves a score locally', async () => {
    const response = await postScore('Ikraam', 10);
    expect(response.result).toBe('Leaderboard score saved locally.');
  });

  test('returns scores as an object with a result array', async () => {
    await postScore('Ikraam', 10);
    const data = await getScores();
    expect(typeof data).toBe('object');
    expect(Array.isArray(data.result)).toBe(true);
  });

  test('includes the saved player name', async () => {
    await postScore('Ikraam', 10);
    const data = await getScores();
    expect(data.result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ user: 'Ikraam' }),
      ]),
    );
  });

  test('includes the saved score as a number', async () => {
    await postScore('Ikraam', 10);
    const data = await getScores();
    expect(data.result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ score: 10 }),
      ]),
    );
  });

  test('orders top scores from highest to lowest', async () => {
    await postScore('Low', 5);
    await postScore('High', 50);
    await postScore('Mid', 25);

    expect(getTopScores(3)).toEqual([
      { user: 'High', score: 50 },
      { user: 'Mid', score: 25 },
      { user: 'Low', score: 5 },
    ]);
  });

  test('rejects empty names', async () => {
    await expect(postScore('   ', 10)).rejects.toThrow('player name');
  });
});
