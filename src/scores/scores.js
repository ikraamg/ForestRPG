const STORAGE_KEY = 'forestrpg-leaderboard';
const MAX_STORED_SCORES = 50;

/**
 * Read all saved scores from localStorage.
 * @returns {{ user: string, score: number }[]}
 */
function readScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((entry) => entry
        && typeof entry.user === 'string'
        && Number.isFinite(Number(entry.score)))
      .map((entry) => ({
        user: entry.user.trim(),
        score: Number(entry.score),
      }));
  } catch {
    return [];
  }
}

/**
 * Persist scores to localStorage.
 * @param {{ user: string, score: number }[]} scores
 */
function writeScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

/**
 * Save a player score locally.
 * Mirrors the old API shape so callers stay simple.
 * @param {string} name
 * @param {number|string} score
 * @returns {Promise<{ result: string }>}
 */
export async function postScore(name, score) {
  const user = String(name || '').trim();
  const numericScore = Number(score);

  if (!user) {
    throw new Error('A player name is required to save a score.');
  }

  if (!Number.isFinite(numericScore)) {
    throw new Error('Score must be a valid number.');
  }

  const scores = readScores();
  scores.push({ user, score: numericScore });
  scores.sort((a, b) => b.score - a.score);
  writeScores(scores.slice(0, MAX_STORED_SCORES));

  return { result: 'Leaderboard score saved locally.' };
}

/**
 * Load leaderboard scores from localStorage.
 * @returns {Promise<{ result: { user: string, score: number }[] }>}
 */
export async function getScores() {
  return { result: readScores() };
}

/**
 * Convenience helper for top N scores (already sorted descending).
 * @param {number} [limit=5]
 * @returns {{ user: string, score: number }[]}
 */
export function getTopScores(limit = 5) {
  return readScores()
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Clear all stored scores (useful for tests).
 */
export function clearScores() {
  localStorage.removeItem(STORAGE_KEY);
}
