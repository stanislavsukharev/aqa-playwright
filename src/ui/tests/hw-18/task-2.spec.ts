import { test, expect } from "@playwright/test";

test.describe("[UI][Smoke] Registration form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://anatoly-karpovich.github.io/demo-registration-form/"
    );
  });

  test("register with valid data", async ({ page }) => {
    await page.locator("#firstName").fill("Stanislav");
    await page.locator("#lastName").fill("Stanislav");
    await page.locator("#address").fill("XYZ avenue 1010");
    await page.locator("#email").fill("ss@icloud.com");
    await page.locator("#phone").fill("555444333");
    await page.locator("#country").selectOption("USA");
    await page.locator("input[value='male']").click();
    await page.locator("input[value='Travelling']").click();
    await page.locator("input[value='Movies']").click();
    await page.locator("#language").fill("Russian");
    await page.locator("#skills").selectOption(["JavaScript", "Python"]);
    await page.locator("#year").selectOption("2010");
    await page.locator("#month").selectOption("May");
    await page.locator("#day").selectOption("10");
    await page.locator("#password").fill("12345678");
    await page.locator("#password-confirm").fill("12345678");
    await page.locator("button[type='submit']").click();

    await expect(page.locator("#fullName")).toContainText(
      "Stanislav Stanislav"
    );
    await expect(page.locator("#address")).toContainText("XYZ avenue 1010");
    await expect(page.locator("#email")).toContainText("ss@icloud.com");
    await expect(page.locator("#phone")).toContainText("555444333");
    await expect(page.locator("#country")).toContainText("USA");
    await expect(page.locator("#gender")).toContainText("male");
    await expect(page.locator("#language")).toContainText("Russian");
    await expect(page.locator("#skills")).toContainText("JavaScript, Python");
    await expect(page.locator("#hobbies")).toContainText("Travelling, Movies");
    await expect(page.locator("#dateOfBirth")).toContainText("10 May 2010");
    await expect(page.locator("#password")).toHaveText("********");
  });
});
