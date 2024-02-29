import axios from 'axios';

export async function OuraConnect() {
  // Construct the authorization URL for Oura's OAuth2 flow
  const clientId = 'H6PFTDZMALWQSXSY';

  // const redirectUri = encodeURIComponent('https://mente.web.app/app/settings');
  const redirectUri = encodeURIComponent('https://localhost:3000/app/settings');

  const scope = encodeURIComponent('personal daily sleep activity readiness');

  const state = generateState();
  const responseType = 'code';

  const ouraAuthUrl = `https://cloud.ouraring.com/oauth/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

  // Redirect user to Oura's authorization page
  window.location.href = ouraAuthUrl;
}

function generateState(): string {
  return [...Array(30)].map(() => Math.random().toString(36)[2]).join('');
}

export async function getPersonalInfo(accessToken: string) {
  try {
    const response = await axios.get('https://api.ouraring.com/v2/usercollection/personal_info', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export function getSleepData(accessToken: string, start: string, end: string) {
  const res = fetch(
    `https://api.ouraring.com/v2/usercollection/daily_sleep?start_date=${start}&end_date=${end}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).catch((error) => console.error('Error:', error));

  return res;
}
