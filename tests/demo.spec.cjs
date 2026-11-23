const { test, expect } = require('@playwright/test');
test.beforeEach(async ({ page }) => { await page.goto('/'); });
test('catalog and filters', async ({page}) => {
 await expect(page.locator('.property-card')).toHaveCount(6);
 await page.locator('#filterType').selectOption('casa');
 await expect(page.locator('.property-card')).toHaveCount(3);
 await page.locator('#filterLocation').selectOption('Asunción');
 await expect(page.locator('.property-card')).toHaveCount(2);
 await page.locator('#filtersReset').click();
 await expect(page.locator('.property-card')).toHaveCount(6);
 await page.locator('#filterPrice').selectOption('hasta-150000');
 await expect(page.locator('.property-card')).toHaveCount(2);
});
test('property modal and lightbox', async ({page}) => {
 await page.locator('.property-card__link').first().click();
 await expect(page.locator('#propertyModal')).toHaveClass(/is-open/);
 await expect(page.locator('#propertyModalTitle')).toContainText('Laureles');
 await page.locator('#propertyModalMainButton').click();
 await expect(page.locator('#lightbox')).toHaveClass(/is-open/);
 await page.keyboard.press('ArrowRight');
 await page.keyboard.press('Escape');
 await expect(page.locator('#lightbox')).not.toHaveClass(/is-open/);
 await page.keyboard.press('Escape');
 await expect(page.locator('#propertyModal')).not.toHaveClass(/is-open/);
});
test('contact demo and validation', async ({page}) => {
 await page.locator('#contactForm button[type=submit]').click();
 await expect(page.locator('.form-field.has-error')).toHaveCount(4);
 await page.locator('#name').fill('Cliente Demo');
 await page.locator('#email').fill('demo@example.test');
 await page.locator('#phone').fill('0981123456');
 await page.locator('#message').fill('Consulta ficticia');
 await page.locator('#contactForm button[type=submit]').click();
 await expect(page.locator('#formSuccess')).toBeVisible();
 page.once('dialog', d => d.accept());
 await page.locator('#contactWhatsapp').click();
});
test('navigation and resources', async ({page, request}) => {
 await expect(page.locator('#navbar')).toBeVisible();
 const images = await page.locator('img[src]:not([src=""])').evaluateAll(els=>els.map(x=>x.getAttribute('src')));
 for(const src of images.filter(x=>!x.startsWith('http'))) {
  const response = await request.get('/'+src.replace(/^\//,''));
  expect(response.ok(), src).toBeTruthy();
 }
 const og = await page.locator('meta[property="og:image"]').getAttribute('content');
 expect(og).toMatch(/^https:\/\//);
 const ogPath = new URL(og).pathname;
 const ogResponse = await request.get(ogPath);
 expect(ogResponse.ok()).toBeTruthy();
});
test('mobile menu and keyboard', async ({page}) => {
 await page.setViewportSize({width:390,height:844});
 await page.locator('#navbarToggle').click();
 await expect(page.locator('#navbarNav')).toHaveAttribute('data-open','true');
 await page.keyboard.press('Escape');
 await expect(page.locator('#navbarNav')).toHaveAttribute('data-open','false');
 await expect(page.locator('body')).toHaveJSProperty('scrollWidth',390);
});
