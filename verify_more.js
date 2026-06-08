const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');

  // Wait for boot screen to finish
  await page.waitForTimeout(5000);

  // Go to Leaderboard
  await page.click('text=LEADERBOARD');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'leaderboard_view.png', fullPage: true });

  // Go to AI Chat (assuming it's in Play Grid or elsewhere, let's look at the sidebar)
  // Actually, I'll just check if there's a chat component.
  // Based on the prompt, it's the AI Chat interface.
  // I'll try to find it.

  await browser.close();
})();
