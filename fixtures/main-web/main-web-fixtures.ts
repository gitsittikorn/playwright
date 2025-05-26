import { test as baseTest } from "@playwright/test";
import CommonTQM from "../../utils/common-tqm";
import TravelIndex from "../../pages/main-web/travel/travel-index";
import TravelSearchResult from "../../pages/main-web/travel/travel-search-result";
import TravelProductDetail from "../../pages/main-web/travel/travel-product-detail";
import TravelFillForm from "../../pages/main-web/travel/travel-fill-form";
import TravelSummary from "../../pages/main-web/travel/travel-summary";

type pages = {
  commonTQM: CommonTQM;
  travelIndex: TravelIndex;
  travelSearchResult: TravelSearchResult;
  travelProductDetail: TravelProductDetail;
  travelFillForm: TravelFillForm;
  travelSummary: TravelSummary;
};

const testPages = baseTest.extend<pages>({
  commonTQM: async ({ page }, use) => {
    const commonTQM = new CommonTQM(page);
    await use(commonTQM);
  },

  travelIndex: async ({ page }, use) => {
    const travelIndex = new TravelIndex(page);
    await use(travelIndex);
  },

  travelSearchResult: async ({ page }, use) => {
    const travelSearchResult = new TravelSearchResult(page);
    await use(travelSearchResult);
  },

  travelProductDetail: async ({ page }, use) => {
    const travelProductDetail = new TravelProductDetail(page);
    await use(travelProductDetail);
  },

  travelFillForm: async ({ page }, use) => {
    const travelFillForm = new TravelFillForm(page);
    await use(travelFillForm);
  },

  travelSummary: async ({ page }, use) => {
    const travelSummary = new TravelSummary(page);
    await use(travelSummary);
  },
});

export const test = testPages;
export const expect = testPages.expect;
