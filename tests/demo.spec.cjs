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

test('visual viewports and horizontal overflow', async ({page}, testInfo) => {
 for (const [label,width,height] of [['mobile',390,844],['tablet',768,1024],['desktop',1440,900]]) {
  await page.setViewportSize({width,height});
  await page.reload();
  await expect(page.locator('.property-card')).toHaveCount(6);
  await expect(page.locator('h1')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, label + ' horizontal overflow').toBeLessThanOrEqual(2);
  await page.screenshot({path: 'test-results/'+label+'-full.png',fullPage:true,animations:'disabled'});
 }
});
test('keyboard focus and dialog return', async ({page}) => {
 await page.locator('.property-card__link').first().focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#propertyModal')).toHaveClass(/is-open/);
 await expect(page.locator('.property-modal__close')).toBeFocused();
 await page.keyboard.press('Escape');
 await expect(page.locator('.property-card__link').first()).toBeFocused();
 await page.locator('.gallery__item').first().focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#lightbox')).toHaveClass(/is-open/);
 await page.keyboard.press('Escape');
 await expect(page.locator('.gallery__item').first()).toBeFocused();
});
test('all local image resources including galleries', async ({page,request}) => {
 const sources = await page.evaluate(() => [...document.querySelectorAll('img[src]')].map(x=>x.getAttribute('src')));
 const gallerySources = await page.locator('.gallery__item img').evaluateAll(els=>els.map(x=>x.getAttribute('src')));
 const propertySources = ['images/casa-1.png','images/casa-1-sala.jpeg','images/casa-1-cocina.jpeg','images/casa-1-habitacion.jpeg','images/casa-2.png','images/casa-2-sala.jpg','images/casa-2-cocina.jpeg'];
 for(const src of [...new Set([...sources,...gallerySources,...propertySources])].filter(x=>x&&!x.startsWith('http')&&!x.startsWith('data:'))) {
  const response=await request.get('/'+src.replace(/^\\//,''));
  expect(response.status(),src).toBe(200);
  expect(Number(response.headers()['content-length']||0),src).toBeGreaterThan(0);
 }
});
test('no personal outbound contact links', async ({page}) => {
 const urls=await page.locator('a[href]').evaluateAll(els=>els.map(x=>x.getAttribute('href')));
 expect(urls.filter(x=>/wa\\.me|api\\.whatsapp|mailto:|instagram\\.com|facebook\\.com|tiktok\\.com/.test(x))).toEqual([]);
});
