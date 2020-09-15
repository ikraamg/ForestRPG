import { postScore, getScores } from '../api/api';

describe('Post and Get scores from API', () => {
  it('Post score', () => {
    postScore('Ikraam', 20).then((data) => {
      expect(data).toBe('Leaderboard score created correctly.');
    });
  });
  it('Gets scores', () => {
    getScores().then((data) => {
      expect(typeof data).toBe('object');
      expect(data.result).toContainEqual('Ikraam');
    });
  });
});