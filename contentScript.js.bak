const ipDisplay = document.createElement('div');
ipDisplay.id = 'ip-display';
ipDisplay.style.cursor = 'pointer';
ipDisplay.title = 'Click to close';
ipDisplay.addEventListener('click', () => {
  ipDisplay.remove();
});
document.body.appendChild(ipDisplay);


/*async function fetchIPInfoIO() {
  const response = await fetch('https://ipinfo.io/json');
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  console.log('contentScript.js fetchIPInfoIO:', data);
  return {
    ip: data.ip,
    country: data.country,
    region: data.region
  };
}

async function fetchIPUserAgentInfo() {
  const response1 = await fetch('https://ip.useragentinfo.com/json');
  if (!response1.ok) {
    throw new Error(`HTTP error: ${response1.status}`);
  }
  const data1 = await response1.json();
  console.log('contentScript.js fetchIPUserAgentInfo:', data1);
  return {
    ip: data1.ip,
    country: data1.province,
    //region: data1.city
	region: "1111"
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
*/

chrome.runtime.sendMessage({ type: 'fetchIPInfo' }, (response) => {
	console.log('contentScript.js Sending message:', response.ipInfoIOData, response.ipUserAgentInfoData);
  displayIP(response.ipInfoIOData, response.ipUserAgentInfoData);
});

function displayIP(ipInfoIOData, ipUserAgentInfoData) {
  ipDisplay.innerHTML = `
    China: ${ipUserAgentInfoData.ip}, ${ipUserAgentInfoData.province}, ${ipUserAgentInfoData.city}<br>
    Oversea: ${ipInfoIOData.ip}, ${ipInfoIOData.country}, ${ipInfoIOData.region}
  `;

  // Add this code to remove the ip-display div after 5 seconds
  setTimeout(() => {
    ipDisplay.remove();
  }, 5000);
}

//fetchPublicIP();

