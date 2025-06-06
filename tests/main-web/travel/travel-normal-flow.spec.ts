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
    //test 04
  }
);
