import { api_route } from '@/utils/vars';

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



export async function fetchData(ouraAccessToken: string, dataType: string, start?: string, end?: string): Promise<any> {
  let url = `${api_route}/integrations/oura/`;

  switch (dataType) {
    case 'daily-sleep':
      url += `daily-sleep?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'daily-activity':
      url += `daily-activity?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'daily-readiness':
      url += `daily-readiness?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'daily-spo2':
      url += `daily-spo2?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'daily-stress':
      url += `daily-stress?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'enhanced-tag':
      url += `enhanced-tag?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'heartrate':
      url += `heartrate?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'personal-info':
      url += `personal-info?accessToken=${encodeURIComponent(ouraAccessToken)}`;
      break;
    case 'rest-mode-period':
      url += `rest-mode-period?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'ring-configuration':
      url += `ring-configuration?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'session':
      url += `session?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'sleep':
      url += `sleep?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'sleep-time':
      url += `sleep-time?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'tag':
      url += `tag?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    case 'workout':
      url += `workout?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start as string)}&end=${encodeURIComponent(end as string)}`;
      break;
    default:
      throw new Error('Invalid data type requested.');
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    console.log('Fetched data for:', dataType, data);
    return data;
  } catch (error) {
    console.error('Error fetching data for:', dataType, error);
    throw error;
  }
}
