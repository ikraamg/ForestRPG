const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const gameId = 'CDnCLHDcJCsfrdRyzYcI';

export const postScore = async (name, score) => {
  const response = await fetch(`${baseUrl}/games/${gameId}/scores`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: name, score: Number(score) }),
  });
  if (response.ok) {
    // console.log(response.json());
    return response.json();
  }
  throw new Error('Something went wrong!');
};

export const getScores = async () => {
  const response = await fetch(`${baseUrl}/games/${gameId}/scores`, {
    method: 'Get',
    mode: 'cors',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    // console.log(response.json());
    return response.json();
  }
  throw new Error('Something went wrong!');
};