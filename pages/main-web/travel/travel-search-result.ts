import { Page, expect } from "@playwright/test";
import { TravelFilterSearchResult } from "../../../types/travel.type";
import CommonTQM from "../../../utils/common-tqm";

export default class TravelSearchResult {
  constructor(public page: Page) {}

  async filterByInsurrer(travelFilter: TravelFilterSearchResult) {
    const commonTQM = new CommonTQM(this.page);
    await commonTQM.init();
    if (commonTQM.isDeviceMobile()) {
      await this.page
        .locator(
          ".relative.mr-2.inline-flex.px-4.py-2.text-center.bg-white.flex.cursor-pointer.rounded-3xl.border.border-solid.border-black-10.laptop\\:hidden"
        )
        .click(); //TODO Change to use data-testid
      await expect(
        this.page.getByTestId("companyCheckboxMTI").nth(1)
      ).toBeVisible();
      await this.page.getByTestId(travelFilter.companyCheckbox).nth(1).click();
      await this.page.getByTestId("submitFilterButton").nth(1).click();
    } else {
      await this.page.getByTestId(travelFilter.companyCheckbox).click();
      await this.page.getByTestId("submitFilterButton").click();
    }
  }

  async selectProduct() {
    await this.page.getByTestId("insureSelectProductButton").first().click();
  }
}
