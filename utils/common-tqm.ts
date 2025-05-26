import { Page, expect } from "@playwright/test";
import { ViewObjective } from "../types/common.type";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/th";

dayjs.extend(localizedFormat);
dayjs.locale("th");

export default class CommonTQM {
  constructor(public page: Page, private isMobile: boolean = false) {}

  async init() {
    this.isMobile = await this.detectIsMobile();
  }

  private async detectIsMobile(): Promise<boolean> {
    return await this.page.evaluate(() => window.innerWidth <= 768);
  }

  public isDeviceMobile(): boolean {
    return this.isMobile;
  }

  async waitUntil(objective: ViewObjective, locator: any) {
    const startTime = performance.now();
    console.debug(`Start time: "${startTime}"`);
    for (let i = 0; i < 20; i++) {
      const element = locator;
      try {
        if (objective == ViewObjective.Visible && (await element.isVisible())) {
          const endTime = performance.now();
          console.debug(
            `Wait for visible is success found locator "${locator}" at ${endTime} ms.`
          );
          return true;
        } else if (
          objective == ViewObjective.Hidden &&
          !(await element.isVisible())
        ) {
          const endTime = performance.now();
          console.debug(
            `Wait for invisible is success NOT found locator "${locator}" at ${endTime} ms.`
          );
          return true;
        }
      } catch (error) {
        console.debug(`Catch error: locator "${locator}" - ${error}`);
        return false;
      }
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 0.5 second before checking again
    }
    return false; // Return false if the element is out of scope within the timeout
  }

  async acceptCookies() {
    await this.page.waitForTimeout(1000);
    if (this.isDeviceMobile()) {
      await this.page.evaluate(() => {
        window.scrollBy(0, 350);
      });
      await this.page.waitForTimeout(500);
      await this.page.evaluate(() => {
        window.scrollBy(0, 350);
      });
    } else {
      await this.page.mouse.wheel(0, 400);
      await this.page.waitForTimeout(500);
      await this.page.mouse.wheel(0, 400);
    }
    await expect(this.page.getByTestId("acceptCookieButton")).toBeVisible();
    await this.page.getByTestId("acceptCookieButton").click();
    await expect(this.page.getByTestId("acceptCookieButton")).toBeHidden();
  }

  async acceptConsent() {
    await expect(this.page.getByTestId("acceptPrivacyCheckbox")).toBeVisible();
    await this.page.getByTestId("acceptPrivacyCheckbox").click();
    await this.page.getByTestId("agreeConsentButton").click();
    await expect(this.page.getByTestId("agreeConsentButton")).toBeHidden();
  }

  async selectDatePicker(
    page: Page,
    dataTestId: string,
    date: string | Date,
    isBirthday: boolean
  ) {
    const day = dayjs(date).date();
    const month = dayjs(date).month();
    const year = dayjs(date).year();

    const newDate = dayjs(new Date(year, month, day));
    const yearEN = newDate.format("YYYY"); // "2025"
    const monthTH = newDate.format("MMM"); // "เม.ย."

    if (isBirthday) {
      await page
        .getByTestId(dataTestId)
        .locator("button")
        .filter({
          hasText: new RegExp(`^${yearEN}$`),
        })
        .click();
      await this.page.waitForTimeout(500);

      await page
        .getByTestId(dataTestId)
        .locator("button")
        .filter({
          hasText: new RegExp(`^${monthTH}$`),
        })
        .click();
      await this.page.waitForTimeout(500);

      await page
        .getByTestId(dataTestId)
        .locator("button")
        .filter({
          hasText: new RegExp(`^${day}$`),
        })
        .click();
      await this.page.waitForTimeout(500);
    } else {
      const currentMonth = dayjs().month();
      const nextMonth = Math.abs(currentMonth - month);
      await expect(this.page.getByTestId("ArrowRightIcon")).toBeVisible();

      for (let i = 0; i < nextMonth; i++) {
        await this.page.getByTestId("ArrowRightIcon").click();
        await this.page.waitForTimeout(500);
      }

      await page
        .getByTestId(dataTestId)
        .locator("button")
        .filter({
          hasText: new RegExp(`^${day}$`),
        })
        .click();
      await this.page.waitForTimeout(500);
    }

    await this.page
      .getByTestId(dataTestId)
      .locator("button", { hasText: "OK" })
      .click();
  }

  static async getProductData(page: Page, dataTestId: string): Promise<string> {
    const productData: string | null = await page
      .getByTestId(dataTestId)
      .evaluate((el: Element) => el.textContent);

    // ถ้า textContent เป็น null ให้ fallback เป็น empty string
    return productData ?? "";
  }

  static async getInsureName(page: Page, dataTestId: string): Promise<string> {
    const insureName: string | null = await page
      .getByTestId(dataTestId)
      .evaluate((el: Element) => el.textContent);

    // ถ้า textContent เป็น null ให้ fallback เป็น empty string
    return insureName ?? "";
  }

  static async getInsurePrice(page: Page, dataTestId: string): Promise<number> {
    const insurePriceText: string = await page
      .getByTestId(dataTestId)
      .evaluate((el: Element) => (el as HTMLElement).innerText);

    const splitInsurePrice = insurePriceText.match(/\d+/);
    const insurePrice = splitInsurePrice
      ? parseInt(splitInsurePrice[0], 10)
      : 0;
    return insurePrice;
  }

  // สร้างเลขบัตรประชาชนไทย 13 หลัก
  static async randomCitizenId(): Promise<string> {
    let id12 = "";
    for (let i = 0; i < 12; i++) {
      id12 += Math.floor(Math.random() * 10).toString();
    }
    const checkDigit = await CommonTQM.finddigit(undefined as any, id12);
    return id12 + checkDigit.toString();
  }

  // คำนวณ check digit จากเลข 12 หลัก (string)
  static async finddigit(page: Page, id: string): Promise<number> {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(id.charAt(i));
      sum += digit * (13 - i);
    }
    const checkDigit = (11 - (sum % 11)) % 10;
    return checkDigit;
  }

  static async formatCitizenId(page: Page, citizenId: String): Promise<string> {
    let formatCitizenId =
      citizenId.substring(0, 1) +
      "-" +
      citizenId.substring(1, 5) +
      "-" +
      citizenId.substring(5, 10) +
      "-" +
      citizenId.substring(10, 12) +
      "-" +
      citizenId.substring(12);
    return formatCitizenId;
  }

  static async formatPhone(page: Page, phone: String): Promise<string> {
    {
      var formatPhone =
        phone.substring(0, 3) +
        "-" +
        phone.substring(3, 6) +
        "-" +
        phone.substring(6, 10);
      return formatPhone;
    }
  }

  async paymentCreditCard(page: Page, travelFillForms: any) {
    const expireDate = "12/" + dayjs().add(1, "year").format("YY");
    await expect(
      this.page.getByTestId("paymentChannelCreditCard")
    ).toBeVisible();
    await this.page.getByTestId("paymentChannelCreditCard").click();

    await this.page.waitForTimeout(1000);
    if (this.isDeviceMobile()) {
      await this.page.getByTestId("mobileNextStepButton").click();
    } else {
      await this.page.getByTestId("nextStepButton").click();
    }
    await expect(this.page.getByTestId("creditCardInput")).toBeVisible();
    await this.page.getByTestId("creditCardInput").fill("4111111111111111");
    await this.page.getByTestId("cardHolderNameInput").fill("TQM Credit Card");
    await this.page.getByTestId("cardExpiryInput").fill(expireDate);
    await this.page.getByTestId("cardCVVInput").fill("123");

    if (this.isDeviceMobile()) {
      await this.page.getByTestId("paymentSubmitButton").nth(1).click();
    } else {
      await this.page.getByTestId("paymentSubmitButton").nth(0).click();
    }

    //-- 2C2P
    await this.page.getByText("Secure Cardholder Verification").waitFor();
    await this.page.locator('input[name="challengeDataEntry"]').waitFor();
    await this.page.locator('input[name="challengeDataEntry"]').fill("123456");
    await this.page
      .locator("button.acs-challenge-btn.proceed", { hasText: "Submit" })
      .click();
    await this.page.waitForURL(/\/payment\/success/);
    await expect(this.page.getByTestId("title")).toBeVisible();
    await expect(this.page.getByTestId("title")).toHaveText("ชำระเงินสำเร็จ!");
    await expect(this.page.getByTestId("customerEmailText")).toHaveText(
      travelFillForms.email
    );
  }
}
