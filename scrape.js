const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Array to store network request URLs
  const networkRequests = [];

  // Event listener for network requests
  page.on('request', request => {
    networkRequests.push(request.url());
  });

  // Go to your YouTube channel page
  // this would be your site anime-site.fr
  await page.goto('https://www.youtube.com/@majesticcoding/videos');

  // Wait for the page to load and find the video thumbnail
  await page.waitForSelector('a#thumbnail');

  // Click the featured video
  await page.click('a#thumbnail');

  // Wait for 10 seconds to allow network activity (video loading, etc.)
  await new Promise(r => setTimeout(r, 10000));

  // Log all network requests captured
  console.log('Network Requests during video click:');
  networkRequests.forEach(url => console.log(url));

  // Optionally, you can save the list of URLs to a file
  const fs = require('fs');
  fs.writeFileSync('network_requests.txt', networkRequests.join('\n'));

  await browser.close();
})();
