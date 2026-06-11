// Example: connect to a Workday tenant and call a Workday API endpoint.
// Replace the tenant, credentials, and endpoint path with your own values.

const WORKDAY_TENANT = process.env.WORKDAY_TENANT || 'yourtenant';
const WORKDAY_USERNAME = process.env.WORKDAY_USERNAME || 'your.username@company.com';
const WORKDAY_PASSWORD = process.env.WORKDAY_PASSWORD || 'yourPassword';
const API_PATH = '/ccx/api/v1/workers';

async function callWorkdayApi(tenant, apiPath, username, password) {
  const url = `https://${tenant}.workday.com${apiPath}`;
  const auth = Buffer.from(`${username}:${password}`).toString('base64');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Workday API error ${response.status}: ${text}`);
  }

  return response.json();
}

(async () => {
  try {
    const data = await callWorkdayApi(WORKDAY_TENANT, API_PATH, WORKDAY_USERNAME, WORKDAY_PASSWORD);
    console.log('Workday API response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to connect to Workday:', error.message);
  }
})();
