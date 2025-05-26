import { Page, expect } from "@playwright/test";
import { TravelSearchWizard } from "../../../types/travel.type";
import CommonTQM from "../../../utils/common-tqm";
const url = process.env.MAIN_WEB_URL;

export default class TravelIndex {
  constructor(public page: Page) {}
  async goto(searchTravel: TravelSearchWizard) {
    if (!url) {
      throw new Error(
        "MAIN_WEB_URL is not defined in the environment variables."
      );
    }
    await this.page.goto(url + "/travel-insurance");
    await expect(this.page.getByTestId("totalTravelerInput5555")).toHaveValue(
      searchTravel.totalTraveler
    );

    // await expect(
    //   this.page.getByTestId("destinationCountrySelect")
    // ).toBeVisible();
    // await expect(
    //   this.page.locator('[data-testid="destinationCountrySelect"] div > span')
    // ).toHaveText("เลือกประเทศปลายทาง");
  }

  async searchTravel(searchTravel: TravelSearchWizard) {
    const commonTQM = new CommonTQM(this.page);

    await commonTQM.init();
    await commonTQM.acceptCookies();
    await this.page.getByTestId(searchTravel.travelRouteSelect).click();
    await expect(this.page.getByTestId("travelFromProvince")).toBeVisible();

    await this.page.getByTestId(searchTravel.travelTypeSelect).click();
    await this.page.getByTestId(searchTravel.travelVehicleType).click();
    await this.page
      .getByTestId("travelFromProvince")
      .getByRole("combobox")
      .click();
    await this.page
      .getByRole("option", { name: searchTravel.travelFromProvince })
      .click();

    await this.page
      .getByTestId("travelToProvince")
      .getByRole("combobox")
      .click();
    await this.page
      .getByRole("option", { name: searchTravel.travelToProvince })
      .click();

    await this.page
      .getByTestId("travelDateFromIconButton")
      .getByRole("button")
      .click();

    await commonTQM.selectDatePicker(
      this.page,
      "travelDateFromDialog",
      searchTravel.travelDateFrom,
      false
    );

    await this.page
      .getByTestId("travelDateToIconButton")
      .getByRole("button")
      .click();

    await commonTQM.selectDatePicker(
      this.page,
      "travelDateToDialog",
      searchTravel.travelDateTo,
      false
    );
    await this.page.getByTestId("nextStepButton").click();
  }
}
