async function fetchPublicIP() {
  try {
    const response = await fetch('https://ipinfo.io/json', {
      mode: 'cors',
      credentials: 'omit'
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    displayIP(data.ip);
  } catch (error) {
    console.error('Error fetching public IP:', error);
    displayIP('Error: Unable to fetch IP');
  }
}

function displayIP(ip) {
  document.getElementById('publicIP').textContent = ip;
}

document.addEventListener('DOMContentLoaded', fetchPublicIP);
