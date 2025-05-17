const ipDisplay = document.createElement('div');
ipDisplay.id = 'ip-display';
ipDisplay.style.cursor = 'pointer';
ipDisplay.title = 'Click to close';
ipDisplay.addEventListener('click', () => {
  ipDisplay.remove();
});
document.body.appendChild(ipDisplay);

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
