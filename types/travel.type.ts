export type TravelSearchWizard = {
  travelRouteSelect: string;
  travelTypeSelect: string;
  travelVehicleType: string;
  destinationCountry: string;
  travelDateFrom: string;
  travelDateTo: string;
  travelFromProvince: string;
  travelToProvince: string;
  totalTraveler: string;
};

export type TravelFilterSearchResult = {
  companyCheckbox: string;
};

export type TravelProductDetails = {
  checkProductData: string;
  checkInsureName: string;
  checkInsurePrice: number;
};

export type TravelFillForms = {
  tName: string;
  fName: string;
  lName: string;
  birthDate: string;
  citizenId: string;
  phoneNumber: string;
  email: string;
  addressNo: string;
  building: string;
  alley: string;
  road: string;
  zipCode: string;
  district: string;
  subDistrict: string;
  province: string;
  traveler1BeneficiaryFname: string;
  traveler1BeneficiaryLname: string;
  traveler1BeneficiaryRelationship: string;
  flightNumberFrom: string;
  flightNumberTo: string;
};
