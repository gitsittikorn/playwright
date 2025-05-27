import { test, expect } from "../../../fixtures/main-web/main-web-fixtures";
import * as data from "../../../data/travel.data";
const dayjs = require("dayjs");

data.travelSearchWizard.travelDateFrom = dayjs().add(5, "day");
data.travelSearchWizard.travelDateTo = dayjs().add(10, "day");
data.travelFillForms.birthDate = dayjs().subtract(10, "year");

test(
  "travel-normal-flow",
  { tag: ["@e2e", "@regression"] },
  async ({
    page,
    travelIndex,
    travelSearchResult,
    travelProductDetail,
    travelFillForm,
    travelSummary,
    commonTQM,
  }) => {
    await travelIndex.goto(data.travelSearchWizard);
    //101
    // await travelIndex.searchTravel(data.travelSearchWizard);
    // await expect(page).toHaveURL(
    //   process.env.MAIN_WEB_URL + "/travel-insurance/filter"
    // );
    // await travelSearchResult.filterByInsurrer(data.travelFilterSearchResult);
    // await travelSearchResult.selectProduct();
    // await travelProductDetail.getProductData(data.travelProductDetails);
    // await travelProductDetail.getInsurePrice(data.travelProductDetails);
    // await travelProductDetail.getInsureName(data.travelProductDetails);

    // await travelFillForm.getProductData(data.travelProductDetails);
    // await travelFillForm.getInsurePrice(data.travelProductDetails);
    // await travelFillForm.section1(data.travelFillForms);
    // await travelFillForm.section2(data.travelFillForms);
    // await travelFillForm.section3(
    //   data.travelSearchWizard,
    //   data.travelFillForms
    // );
    // await travelSummary.checkAssuredDetail(data.travelFillForms);
    // await travelSummary.checkContactAddress(data.travelFillForms);
    // await travelSummary.checkFlightDetail(
    //   data.travelSearchWizard,
    //   data.travelFillForms
    // );
    // await travelSummary.checkPrice(
    //   data.travelSearchWizard,
    //   data.travelProductDetails
    // );
    // await commonTQM.init();
    // await commonTQM.paymentCreditCard(page, data.travelFillForms);
  }
);
