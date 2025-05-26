import { Page, expect } from "@playwright/test";
import {
  TravelSearchWizard,
  TravelProductDetails,
  TravelFillForms,
} from "../../../types/travel.type";
import CommonTQM from "../../../utils/common-tqm";

const dayjs = require("dayjs");
export default class TravelSummary {
  constructor(public page: Page) {}

  async checkAssuredDetail(travelFillForms: TravelFillForms) {
    const commonTQM = new CommonTQM(this.page);

    await expect(this.page.getByTestId("title")).toBeVisible();
    await expect(
      this.page.getByTestId("rowContenttraveler1Fullname")
    ).toBeVisible();

    await expect(
      this.page.getByTestId("rowContenttraveler1Fullname")
    ).toHaveText(
      `${travelFillForms.tName} ${travelFillForms.fName} ${travelFillForms.lName}`
    );

    const birthDate = await this.page
      .getByTestId("rowContenttraveler1Birthday")
      .innerText();
    expect(dayjs(travelFillForms.birthDate).format("DD/MM/YYYY")).toBe(
      birthDate
    );

    expect(dayjs(travelFillForms.birthDate).format("DD/MM/YYYY")).toBe(
      birthDate
    );

    await expect(
      this.page.getByTestId("rowContenttraveler1CitizenId")
    ).toHaveText(
      await CommonTQM.formatCitizenId(this.page, travelFillForms.citizenId)
    );

    await expect(
      this.page.getByTestId("rowContenttraveler1PhoneNo")
    ).toHaveText(
      await CommonTQM.formatPhone(this.page, travelFillForms.phoneNumber)
    );

    await expect(this.page.getByTestId("rowContenttraveler1Email")).toHaveText(
      travelFillForms.email
    );

    await expect(
      this.page.getByTestId("rowContenttraveler1Beneficiary")
    ).toHaveText(
      travelFillForms.traveler1BeneficiaryFname +
        " " +
        travelFillForms.traveler1BeneficiaryLname
    );
  }

  async checkContactAddress(travelFillForms: TravelFillForms) {
    await expect(this.page.getByTestId("rowContentaddressNo")).toBeVisible();

    await expect(this.page.getByTestId("rowContentaddressNo")).toHaveText(
      travelFillForms.addressNo
    );

    await expect(this.page.getByTestId("rowContentbuilding")).toHaveText(
      travelFillForms.building
    );

    await expect(this.page.getByTestId("rowContentalley")).toHaveText(
      travelFillForms.alley
    );

    await expect(this.page.getByTestId("rowContentroad")).toHaveText(
      travelFillForms.road
    );

    await expect(this.page.getByTestId("rowContentsubDistrict")).toHaveText(
      travelFillForms.subDistrict
    );

    await expect(this.page.getByTestId("rowContentdistrict")).toHaveText(
      travelFillForms.district
    );

    await expect(this.page.getByTestId("rowContentprovince")).toHaveText(
      travelFillForms.province
    );

    await expect(this.page.getByTestId("rowContentzipcode")).toHaveText(
      travelFillForms.zipCode
    );
  }

  async checkFlightDetail(
    travelSearchWizard: TravelSearchWizard,
    travelFillForms: TravelFillForms
  ) {
    await this.page.locator('[data-testid="ExpandMoreIcon"]').nth(2).click();

    await expect(
      this.page.getByTestId("rowContentflightDateFrom")
    ).toBeVisible();

    await expect(this.page.getByTestId("rowContentflightDateFrom")).toHaveText(
      dayjs(travelSearchWizard.travelDateFrom).format("DD/MM/YYYY")
    );

    await expect(
      this.page.getByTestId("rowContentflightNumberFrom")
    ).toHaveText(travelFillForms.flightNumberFrom);

    await expect(this.page.getByTestId("rowContentflightDateTo")).toHaveText(
      dayjs(travelSearchWizard.travelDateTo).format("DD/MM/YYYY")
    );

    await expect(
      this.page.getByTestId("rowContentflightNumberFrom")
    ).toHaveText(travelFillForms.flightNumberFrom);
  }

  async checkPrice(
    travelSearchWizard: TravelSearchWizard,
    travelProductDetails: TravelProductDetails
  ) {
    await expect(
      this.page.getByTestId("rowContenttravelFromProvince")
    ).toBeVisible();

    await expect(
      this.page.getByTestId("rowContenttravelFromProvince")
    ).toHaveText(travelSearchWizard.travelFromProvince);

    await expect(
      this.page.getByTestId("rowContenttravelToProvince")
    ).toHaveText(travelSearchWizard.travelToProvince);

    await expect(this.page.getByTestId("rowContenttravelDateFrom")).toHaveText(
      dayjs(travelSearchWizard.travelDateFrom).format("DD/MM/YYYY")
    );

    await expect(this.page.getByTestId("rowContenttravelDateTo")).toHaveText(
      dayjs(travelSearchWizard.travelDateTo).format("DD/MM/YYYY")
    );

    const start = dayjs(travelSearchWizard.travelDateFrom, "DD/MM/YYYY");
    const end = dayjs(travelSearchWizard.travelDateTo, "DD/MM/YYYY");
    const coverageDays = end.diff(start, "day") + 1;
    await expect(this.page.getByTestId("rowContenttravelAmountDay")).toHaveText(
      coverageDays + " วัน"
    );

    await expect(this.page.getByTestId("rowContenttotalTraveler")).toHaveText(
      travelSearchWizard.totalTraveler
    );

    await expect(this.page.getByTestId("netAmountTotal")).toHaveText(
      `${travelProductDetails.checkInsurePrice.toFixed(2)} บาท`
    );

    await this.page.getByTestId("nextStep").click();
  }
}
