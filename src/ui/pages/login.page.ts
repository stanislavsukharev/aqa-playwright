import { Page, Locator } from "@playwright/test";
import { credentials } from "data/credentials";


export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("#emailinput");
    this.passwordInput = page.locator("#passwordinput");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async fillCredentials(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email = credentials.email, password = credentials.password) {
    await this.page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
    await this.fillCredentials(email, password);
    await this.clickLoginButton();
  }
  
  
}
