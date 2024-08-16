const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Array to store network request URLs
  const networkRequests = [];

  // Event listener for network requests
  page.on('request', request => {
    networkRequests.push(request.url());
  });

  try {
    // Go to the YouTube channel page (replace with your site)
    await page.goto('https://www.youtube.com/@majesticcoding/videos', { waitUntil: 'networkidle2' });

    // Wait for the video thumbnail to appear
    await page.waitForSelector('a#thumbnail', { visible: true, timeout: 10000 });

    // Click the first video thumbnail
    await page.click('a#thumbnail');

    // Wait for 10 seconds using a Promise with setTimeout
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Log all network requests captured
    console.log('Network Requests during video click:');
    networkRequests.forEach(url => console.log(url));

    // Optionally, you can save the list of URLs to a file
    fs.writeFileSync('network_requests.txt', networkRequests.join('\n'));

  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    // Ensure the browser is closed even if an error occurs
    await browser.close();
  }
})();
