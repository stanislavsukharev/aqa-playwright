import { test, expect } from "@playwright/test";

test.describe("[UI][Smoke] Register", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.locator("#registerOnLogin").click();
  });

  test("should display registration form with required fields and register button", async ({
    page,
  }) => {
    await expect(page.locator("#userNameOnRegister")).toBeVisible();
    await expect(page.locator("#passwordOnRegister")).toBeVisible();
    await expect(page.locator("#register")).toBeVisible();
    await expect(page.locator("#register")).toContainText("Register");
  });

  test("register with min valid data", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill("Xyz");
    await page.locator("#passwordOnRegister").fill("Pa$$1010");
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toContainText(
      "Successfully registered! Please, click Back to return on login page"
    );
  });

  test("register with max valid data", async ({ page }) => {
    const username = "Stas".repeat(10);
    const password = "00securePa$$1010WXYZ";
    await page.locator("#userNameOnRegister").fill(username);
    await page.locator("#passwordOnRegister").fill(password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toContainText(
      "Successfully registered! Please, click Back to return on login page"
    );
  });
});
