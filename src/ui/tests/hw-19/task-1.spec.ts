import { test, expect } from "@playwright/test";

test.describe("[UI] Dynamic Controls", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com");
    await page.getByRole("link", { name: "Dynamic Controls" }).click();
  });

  test("Checkbox can be removed and added again", async ({ page }) => {
    const removeButton = page.getByRole("button", { name: "Remove" });
    const checkbox = page.locator('#checkbox-example input[type="checkbox"]');
    const message = page.locator("p#message");

    await expect(removeButton).toBeVisible();
    await expect(page.locator('h4').nth(0)).toHaveText('Dynamic Controls');
    await expect(checkbox).toBeVisible();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await removeButton.click();
    await expect(checkbox).toBeHidden();
    const addButton = page.getByRole("button", { name: "Add" });
    await expect(addButton).toBeVisible();
    await expect(message).toHaveText("It's gone!");
    await addButton.click();
    await expect(checkbox).toBeVisible();
    await expect(message).toHaveText("It's back!");
  });
});
