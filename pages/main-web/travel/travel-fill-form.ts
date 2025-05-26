import { Page, expect } from "@playwright/test";
import {
  TravelProductDetails,
  TravelFillForms,
} from "../../../types/travel.type";
import CommonTQM from "../../../utils/common-tqm";

export default class TravelFillForm {
  constructor(public page: Page) {}

  async getProductData(travelProductDetails: TravelProductDetails) {
    await expect(this.page.getByTestId("productData")).toBeVisible();
    const productData = await this.page
      .getByTestId("productData")
      .textContent();
    expect(productData?.trim()).not.toBe("");
    expect(travelProductDetails.checkProductData).toEqual(
      await CommonTQM.getProductData(this.page, "productData")
    );
  }

  async getInsurePrice(travelProductDetails: TravelProductDetails) {
    await expect(this.page.getByTestId("companyLogo")).toBeVisible();
    await expect(this.page.getByTestId("insurePrice")).toBeVisible();
    const insurePrice = await this.page
      .getByTestId("insurePrice")
      .textContent();
    expect(insurePrice?.trim()).not.toBe("");
    expect(travelProductDetails.checkInsurePrice).toEqual(
      await CommonTQM.getProductData(this.page, "insurePrice")
    );
  }

  async section1(travelFillForms: any) {
    const commonTQM = new CommonTQM(this.page);
    await expect(
      this.page.getByTestId("traveler1CitizenIdInput")
    ).toBeVisible();
    await expect(this.page.getByTestId("companyLogo")).toBeVisible();
    await expect(this.page.getByTestId("insureDetail")).toBeVisible();
    await expect(this.page.getByTestId("traveler1PrefixSelect")).toBeVisible();
    await this.page.getByTestId("traveler1PrefixSelect").click();
    await expect(
      this.page.getByTestId("traveler1PrefixValueนาย")
    ).toBeVisible();
    await this.page.getByTestId("traveler1PrefixValueนาย").click();

    await this.page.getByTestId("traveler1FirstNameInput").click();
    await this.page
      .getByTestId("traveler1FirstNameInput")
      .fill(travelFillForms.fName);
    await this.page.getByTestId("traveler1LastNameInput").click();
    await this.page
      .getByTestId("traveler1LastNameInput")
      .fill(travelFillForms.lName);

    await this.page
      .getByTestId("traveler1BirthdayInput")
      .getByRole("button")
      .click();

    await commonTQM.selectDatePicker(
      this.page,
      "traveler1BirthdayDialog",
      travelFillForms.birthDate,
      true
    );

    travelFillForms.citizenId = await CommonTQM.randomCitizenId();
    await this.page
      .getByTestId("traveler1CitizenIdInput")
      .fill(travelFillForms.citizenId);
    await this.page.getByTestId("traveler1PhoneNoInput").click();
    await this.page
      .getByTestId("traveler1PhoneNoInput")
      .fill(travelFillForms.phoneNumber);
    await this.page.getByTestId("traveler1EmailInput").click();
    await this.page
      .getByTestId("traveler1EmailInput")
      .fill(travelFillForms.email);
    await this.page
      .getByTestId("traveler1BeneficiarySelect")
      .getByText("ผู้รับผลประโยชน์")
      .click();

    await this.page.getByTestId("traveler1BeneficiaryValueสามี").click();
    await this.page.getByTestId("traveler1BeneficiaryFirstNameInput").click();
    await this.page
      .getByTestId("traveler1BeneficiaryFirstNameInput")
      .fill(travelFillForms.traveler1BeneficiaryFname);
    await expect(
      this.page.getByTestId("traveler1BeneficiaryFirstNameInput")
    ).toHaveValue(travelFillForms.traveler1BeneficiaryFname);

    await this.page.getByTestId("traveler1BeneficiaryLastNameInput").click();
    await this.page
      .getByTestId("traveler1BeneficiaryLastNameInput")
      .fill(travelFillForms.traveler1BeneficiaryLname);
    await expect(
      this.page.getByTestId("traveler1BeneficiaryLastNameInput")
    ).toHaveValue(travelFillForms.traveler1BeneficiaryLname);
    await this.page.getByTestId("nextStepButton").click();
  }

  async section2(travelFillForms: any) {
    const commonTQM = new CommonTQM(this.page);
    await expect(
      this.page.getByTestId("titleText-ที่อยู่บนกรมธรรม์")
    ).toBeVisible();
    await this.page.getByTestId("insuranceAddressNoInput").click();
    await this.page
      .getByTestId("insuranceAddressNoInput")
      .fill(travelFillForms.addressNo);
    await this.page.getByTestId("insuranceBuildingInput").click();
    await this.page
      .getByTestId("insuranceBuildingInput")
      .fill(travelFillForms.building);
    await this.page.getByTestId("insuranceAlleyInput").click();
    await this.page
      .getByTestId("insuranceAlleyInput")
      .fill(travelFillForms.alley);
    await this.page.getByTestId("insuranceRoadInput").click();
    await this.page
      .getByTestId("insuranceRoadInput")
      .fill(travelFillForms.road);
    await this.page.getByTestId("insuranceZipcodeInput").click();
    await this.page
      .getByTestId("insuranceZipcodeInput")
      .fill(travelFillForms.zipCode);

    await expect(
      this.page.locator('[data-testid="insuranceProvince"] input')
    ).toHaveValue(travelFillForms.province);
  }

  async section3(travelSearchWizard: any, travelFillForms: any) {
    const commonTQM = new CommonTQM(this.page);
    await expect(
      this.page.getByTestId("titleText-ข้อมูลเที่ยวบิน")
    ).toBeVisible();

    await this.page
      .getByTestId("flightDateFromIconButton")
      .getByRole("button")
      .click();

    await commonTQM.selectDatePicker(
      this.page,
      "flightDateFromDialog",
      travelSearchWizard.travelDateFrom,
      false
    );

    await this.page
      .getByTestId("flightDateToIconButton")
      .getByRole("button")
      .click();

    await commonTQM.selectDatePicker(
      this.page,
      "flightDateToDialog",
      travelSearchWizard.travelDateTo,
      false
    );

    await this.page
      .getByTestId("flightNumberFromInput")
      .fill(travelFillForms.flightNumberFrom);

    await this.page
      .getByTestId("flightNumberToInput")
      .fill(travelFillForms.flightNumberTo);

    await this.page.getByTestId("nextStepButton").click();
    await commonTQM.acceptConsent();
  }
}
