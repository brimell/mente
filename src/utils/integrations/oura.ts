import { api_route } from '@/utils/vars';
import { SleepData } from '@store/integrationTypes';

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

export async function getDailySleepData(
  ouraAccessToken: string,
  start: string,
  end: string
): Promise<SleepData[]> {
  try {
    // Construct the URL with query parameters
    const url = `${api_route}/integrations/oura/daily-sleep?accessToken=${encodeURIComponent(
      ouraAccessToken
    )}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;

    // Make the GET request
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    // Parse the response JSON
    const data = await response.json()

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Throw the error to handle it outside of this function
  }
}

export async function getDailyActivityData(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/daily-activity?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getDailyReadinessData(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/daily-readiness?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getDailySpo2Data(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/daily-spo2?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Repeat this pattern for each of the other endpoints defined in the `Client` class

export async function getDailyStressData(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/daily-stress?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export async function getEnhancedTagData(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/enhanced-tag?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getHeartRateData(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/heartrate?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getPersonalInfoData(ouraAccessToken: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/personal-info?accessToken=${encodeURIComponent(ouraAccessToken)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getRestModePeriodData(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/rest-mode-period?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getRingConfigurationData(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/ring-configuration?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getSessionData(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/session?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getSleepTimeData(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/sleep-time?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getTagData(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/tag?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getWorkoutData(ouraAccessToken: string, start: string, end: string): Promise<any> {
  try {
    const url = `${api_route}/integrations/oura/workout?accessToken=${encodeURIComponent(ouraAccessToken)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
