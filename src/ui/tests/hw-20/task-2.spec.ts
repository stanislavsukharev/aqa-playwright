/* 
  Разработать тест со следующими шагами:
  https://anatoly-karpovich.github.io/demo-shopping-cart/
  - добавить продукты 2,4,6,8,10
  - завалидировать бейдж с количеством
  - открыть чекаут
  - завалидировать сумму и продукты
  - ввести все найденные вами промокоды (вспоминаем первую лекцию)
  - завалидировать конечную сумму
  - зачекаутиться
  - завалидировать сумму
*/

import { test, expect, Page, Locator } from '@playwright/test';

enum Promocodes {
  DISCOUNT20 = "HelloThere",
  DISCOUNT15 = "15-PERCENT-FOR-CSS",
  DISCOUNT10 = "HOT-COURSE",
  DISCOUNT10_BASIC = "10-PERCENT-FOR-REDEEM",
  DISCOUNT8 = "NO-PYTHON",
  DISCOUNT7 = "JAVA-FOR-BOOMERS",
  DISCOUNT5 = "5-PERCENT-FOR-UTILS",
}

test.describe('[UI] Demo Shopping Cart – E2E', () => {
  test('Successful checkout with 5 products and all valid promocodes', async ({ page }) => {
    await page.goto('https://anatoly-karpovich.github.io/demo-shopping-cart/');

    const selectedProducts = ['Product 2', 'Product 4', 'Product 6', 'Product 8', 'Product 10'];

    for (const product of selectedProducts) {
      await getAddToCartButton(product, page).click();
    }

    const prices = await Promise.all(
      selectedProducts.map(product => getProductPrice(product, page))
    );
    const initialTotal = prices.reduce((sum, p) => sum + p, 0);

    await expect(page.locator('#badge-number')).toHaveText(String(selectedProducts.length));
    await page.getByRole('button', { name: 'Shopping Cart' }).click();
    await expect(await getTotalPrice(page)).toBe(initialTotal);

    const finalPrice = await applyAllPromocodes(initialTotal, page);
    await expect(getTotalPrice(page)).resolves.toBe(finalPrice);

    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.getByText('Thanks for ordering!')).toBeVisible();

    const confirmedTotal = await getOrderTotal(page);
    expect(confirmedTotal).toBe(finalPrice);
  });
});

function getAddToCartButton(product: string, page: Page): Locator {
  return page
    .locator('div.card-body')
    .filter({ hasText: product })
    .getByRole('button', { name: 'Add to card' });
}

async function getProductPrice(product: string, page: Page): Promise<number> {
  const price = await page
    .locator('div.card-body')
    .filter({ hasText: product })
    .locator('span')
    .innerText();
  return parseFloat(price.replace('$', '').replace(',', '').trim());
}

async function getTotalPrice(page: Page): Promise<number> {
  const text = await page.locator('#total-price').innerText();
  const dollarIndex = text.indexOf('$');
  const amountText = text.slice(dollarIndex + 1).split(' ')[0];
  return parseFloat(amountText.replace(',', '').trim());
}

async function applyAllPromocodes(currentTotal: number, page: Page): Promise<number> {
  let total = currentTotal;
  for (const code of Object.values(Promocodes)) {
    total = await applyPromocode(total, code, page);
  }
  return total;
}

async function applyPromocode(total: number, code: string, page: Page): Promise<number> {
  const spinner = page.locator('.spinner-border');
  await page.locator('#rebate-input').fill(code);
  await page.getByRole('button', { name: 'Redeem' }).click();
  await expect(spinner).toBeHidden();

  const price = await page.locator('#total-price').innerText();
  const clean = price.replace('$', '').split(' ')[0];
  return parseFloat(clean.replace(',', '').trim());
}

async function getOrderTotal(page: Page): Promise<number> {
  const order = await page.locator('.text-muted').last().innerText();
  return parseFloat(order.replace('$', '').replace(',', '').trim());
}
