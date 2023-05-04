const ipDisplayPopup = document.getElementById('ip-display-popup');

chrome.runtime.sendMessage({ type: 'fetchIPInfo' }, (response) => {
  console.log('============ popup.js Received message:', response.ipInfoIOData, response.ipUserAgentInfoData);
  displayIP(response.ipInfoIOData, response.ipUserAgentInfoData);
});

function displayIP(ipInfoIOData, ipUserAgentInfoData) {
  ipDisplayPopup.innerHTML = `
    CHINA: ${ipUserAgentInfoData.ip}, ${ipUserAgentInfoData.province}, ${ipUserAgentInfoData.city}<br>
    Oversea: ${ipInfoIOData.ip}, ${ipInfoIOData.country}, ${ipInfoIOData.region}
  `;
}

