import { Page, expect } from "@playwright/test";
import { TravelProductDetails } from "../../../types/travel.type";
import CommonTQM from "../../../utils/common-tqm";

export default class TravelProductDetail {
  constructor(public page: Page) {}

  async getProductData(travelProductDetails: TravelProductDetails) {
    await expect(this.page.getByTestId("productData")).toBeVisible();
    const productData = await this.page
      .getByTestId("productData")
      .textContent();
    expect(productData?.trim()).not.toBe("");
    travelProductDetails.checkProductData = await CommonTQM.getProductData(
      this.page,
      "productData"
    );
  }

  async getInsurePrice(travelProductDetails: TravelProductDetails) {
    const commonTQM = new CommonTQM(this.page);
    await commonTQM.init();

    if (commonTQM.isDeviceMobile()) {
      await expect(this.page.getByTestId("companyLogo")).toBeVisible();
      await expect(this.page.getByTestId("insureNetAmount")).toBeVisible();
      const insureNetAmount = await this.page
        .getByTestId("insureNetAmount")
        .textContent();
      expect(insureNetAmount?.trim()).not.toBe("");
      travelProductDetails.checkInsurePrice = await CommonTQM.getInsurePrice(
        this.page,
        "insureNetAmount"
      );
    } else {
      await expect(this.page.getByTestId("companyLogo")).toBeVisible();
      await expect(this.page.getByTestId("insurePrice")).toBeVisible();
      const insurePrice = await this.page
        .getByTestId("insurePrice")
        .textContent();
      expect(insurePrice?.trim()).not.toBe("");
      travelProductDetails.checkInsurePrice = await CommonTQM.getInsurePrice(
        this.page,
        "insurePrice"
      );
    }
  }

  async getInsureName(travelProductDetails: TravelProductDetails) {
    await expect(this.page.getByTestId("companyNameText")).toBeVisible();
    const companyNameText = await this.page
      .getByTestId("companyNameText")
      .textContent();
    expect(companyNameText?.trim()).not.toBe("0");
    travelProductDetails.checkInsureName = await CommonTQM.getInsureName(
      this.page,
      "companyNameText"
    );
    await this.page.getByTestId("nextStepButton").click();
  }
}
