import type { Config_Product } from "../types/configTypes";


export const ticket_parking: Config_Product = {
  productName: "Parking Enforcement - Certificate of Infraction",
  image: {
    path: "/images/ssm-ticket_parking.png",
    dimensionClass: "1by1"
  },
  productEjs: "ssm-ticket_parking.ejs",
  price: "form",
  formFieldsToSave: [{
    fieldName: "Tag Number",
    formFieldName: "tagNumber"
  }, {
    fieldName: "Offence Date",
    formFieldName: "offenceDate"
  }, {
    fieldName: "Licence Plate",
    formFieldName: "licencePlate"
  }],
  identifierFormFieldName: "tagNumber"
};


export const ticket_offenceNotice: Config_Product = {
  productName: "Provincial Offences - Offence Notice",
  image: {
    path: "/images/ssm-ticket_offenceNotice.png",
    dimensionClass: "1by1"
  },
  productEjs: "ssm-ticket_offenceNotice.ejs",
  price: "form",
  formFieldsToSave: [{
    fieldName: "Offence Number",
    formFieldName: "offenceNumber"
  }, {
    fieldName: "Offence Date",
    formFieldName: "offenceDate"
  }, {
    fieldName: "Name on Ticket",
    formFieldName: "nameOnTicket"
  }],
  identifierFormFieldName: "offenceNumber"
};


export const ticket_noticeOfFine: Config_Product = {
  productName: "Provincial Offences - Notice of Fine and Due Date",
  image: {
    path: "/images/ssm-ticket_noticeOfFine.png",
    dimensionClass: "1by1"
  },
  productEjs: "ssm-ticket_noticeOfFine.ejs",
  price: "form",
  formFieldsToSave: [{
    fieldName: "File Number",
    formFieldName: "fileNumber"
  }, {
    fieldName: "Offence Date",
    formFieldName: "offenceDate"
  }, {
    fieldName: "Name on Ticket",
    formFieldName: "nameOnTicket"
  }],
  identifierFormFieldName: "fileNumber"
};
