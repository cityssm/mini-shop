import type { ConfigProduct } from "../types/configTypes";


export const ticket_parking: ConfigProduct = {
  productName: "Parking Enforcement - Certificate of Infraction",
  image: {
    path: "/images/ssm-ticket_parking.jpg",
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


export const ticket_offenceNotice: ConfigProduct = {
  productName: "Provincial Offences - Offence Notice",
  image: {
    path: "/images/ssm-ticket_offenceNotice.jpg",
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


export const ticket_noticeOfFine: ConfigProduct = {
  productName: "Provincial Offences - Notice of Fine and Due Date",
  image: {
    path: "/images/ssm-ticket_noticeOfFine.jpg",
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
