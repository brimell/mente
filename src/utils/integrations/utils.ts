import localforage from 'localforage';

export async function getStoredAccessToken(integrationName: string) {
    try {
      const accessToken = await localforage.getItem(`${integrationName}AccessToken`);
      if (accessToken) {
        console.log(`${integrationName} access token retrieved:`, accessToken);
        return accessToken;
      } else {
        console.log(`No access token found for ${integrationName}.`);
        return null;
      }
    } catch (error) {
      console.error(`Error retrieving ${integrationName} access token:`, error);
      return null;
    }
  }
  