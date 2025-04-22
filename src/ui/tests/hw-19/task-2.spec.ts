import { test, expect } from "@playwright/test";

test.describe("[UI] Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
  });

  test("successful login and sidebar visual check", async ({ page }) => {
    await page.locator("#emailinput").fill("test@gmail.com");
    await page.locator("#passwordinput").fill("12345678");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".spinner-border")).toHaveCount(0);
    await expect(page.locator("a.dropdown-toggle >> strong")).toHaveText("Anatoly");
    const sidebar = page.locator("#sidebar");
    await expect(sidebar).toHaveScreenshot("sidebar-after-login.png");
  });
});
