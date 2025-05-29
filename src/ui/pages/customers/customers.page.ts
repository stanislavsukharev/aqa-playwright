import { Locator } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";

export class CustomersPage extends SalesPortalPage {
  addNewCustomerButton = this.page.getByRole("button", { name: "Add Customer" });

  uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }
}
