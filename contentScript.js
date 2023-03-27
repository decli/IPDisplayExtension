const ipDisplay = document.createElement('div');
ipDisplay.id = 'ip-display';
ipDisplay.style.cursor = 'pointer';
ipDisplay.title = 'Click to close';
ipDisplay.addEventListener('click', () => {
  ipDisplay.remove();
});
document.body.appendChild(ipDisplay);

async function fetchIPInfoIO() {
  const response = await fetch('https://ipinfo.io/json');
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return {
    ip: data.ip,
    country: data.country,
    region: data.region
  };
}

async function fetchIPUserAgentInfo() {
  const response = await fetch('https://ip.useragentinfo.com/json');
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return {
    ip: data.ip,
    country: data.province,
    region: data.city
  };
}

async function fetchPublicIP() {
  try {
    const [ipInfoIOData, ipUserAgentInfoData] = await Promise.all([
      fetchIPInfoIO(),
      fetchIPUserAgentInfo(),
    ]);
    displayIP(ipInfoIOData, ipUserAgentInfoData);
  } catch (error) {
    console.error('Error fetching public IP:', error);
    displayIP({ ip: 'Error: Unable to fetch IP', country: '', region: '' }, { ip: 'Error: Unable to fetch IP', country: '', region: '' });
  }
}

chrome.runtime.sendMessage({ type: 'fetchIPInfo' }, (response) => {
  displayIP(response.ipInfoIOData, response.ipUserAgentInfoData);
});

function displayIP(ipInfoIOData, ipUserAgentInfoData) {
  ipDisplay.innerHTML = `
    China: ${ipUserAgentInfoData.ip}, ${ipUserAgentInfoData.country}, ${ipUserAgentInfoData.region}<br>
    Oversea: ${ipInfoIOData.ip}, ${ipInfoIOData.country}, ${ipInfoIOData.region}
  `;
}

fetchPublicIP();

