chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    const cspHeaderIndex = details.responseHeaders.findIndex(
      (header) => header.name.toLowerCase() === 'content-security-policy'
    );

    if (cspHeaderIndex !== -1) {
      const cspHeader = details.responseHeaders[cspHeaderIndex];
      cspHeader.value = cspHeader.value.replace(
        /connect-src[^;]*;/i,
        (match) => `${match} https://ipinfo.io https://api.ipgeolocation.io`
      );
    }

    return { responseHeaders: details.responseHeaders };
  },
  { urls: ['*://*.google.com/*'] },
  ['blocking', 'responseHeaders', 'extraHeaders']
);

