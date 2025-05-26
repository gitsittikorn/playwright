import {
  TravelSearchWizard,
  TravelFilterSearchResult,
  TravelProductDetails,
  TravelFillForms,
} from "../types/travel.type";

export const travelSearchWizard: TravelSearchWizard = {
  travelRouteSelect: "domestic", //ในประเทศ
  travelTypeSelect: "daily", //รายเที่ยว
  travelVehicleType: "vehicleRadioเครื่องบิน",
  destinationCountry: "destinationCountryValue173",
  travelDateFrom: "",
  travelDateTo: "",
  travelFromProvince: "กระบี่",
  travelToProvince: "กาญจนบุรี",
  totalTraveler: "1 คน",
};

export const travelFilterSearchResult: TravelFilterSearchResult = {
  companyCheckbox: "companyCheckboxMTI",
};

export const travelProductDetails: TravelProductDetails = {
  checkInsureName: "",
  checkInsurePrice: 0,
  checkProductData: "",
};

export const travelFillForms: TravelFillForms = {
  tName: "Mr. / นาย",
  fName: "test",
  lName: "test",
  birthDate: "",
  citizenId: "",
  phoneNumber: "0988888888",
  email: "test@gmail.com",
  addressNo: "123",
  building: "home",
  alley: "alley",
  road: "road",
  zipCode: "10550",
  district: "บางบ่อ",
  subDistrict: "คลองด่าน",
  province: "สมุทรปราการ",
  traveler1BeneficiaryFname: "สามี",
  traveler1BeneficiaryLname: "สามี",
  traveler1BeneficiaryRelationship: "สามี",
  flightNumberFrom: "TG1234",
  flightNumberTo: "TG5678",
};
