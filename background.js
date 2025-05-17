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
      fetch('https://whois.pconline.com.cn/ipJson.jsp?ip=&json=true')
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          const decoder = new TextDecoder('gbk');
          const text = decoder.decode(buffer);
          return JSON.parse(text);
        })
        .then((data) => ({
          ip: data.ip,
          province: data.pro,
          city: data.city
        }))
        .catch((error) => {
          console.error('Error fetching PConlineIPInfo:', error);
          return {
            ip: 'Error: Unable to fetch IP',
            province: '',
            city: ''
          };
        })
    ]).then((results) => {
      sendResponse({ ipInfoIOData: results[0], ipUserAgentInfoData: results[1] });
    });
    return true;
  }
});

