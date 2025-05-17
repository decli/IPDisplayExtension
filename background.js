chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'fetchIPInfo') {
    Promise.all([
      fetch('https://ipinfo.io/json')
        .then((response) => response.json())
        .catch((error) => {
          console.error('Error fetching IPInfoIO:', error);
          return {
            ip: 'Error: Unable to fetch IP',
            country: '',
            region: ''
          };
        }),
      fetch('https://ip.useragentinfo.com/json')
        .then((response) => response.json())
        .catch((error) => {
          console.error('Error fetching IPUserAgentInfo:', error);
          return {
            ip: 'Error: Unable to fetch IP',
            country: '',
            region: ''
          };
        })
    ]).then((results) => {
      sendResponse({ ipInfoIOData: results[0], ipUserAgentInfoData: results[1] });
    });
    return true;
  }
});

