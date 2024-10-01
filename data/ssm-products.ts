// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */

import type { ConfigProduct } from '../types/configTypes'

export const ticket_parking: ConfigProduct = {
  productName: {
    en: 'Parking Enforcement - Certificate of Infraction',
    fr: "Contrôle du stationnement - Procès-verbal d'infraction"
  },
  image: {
    path: '/images/ssm-ticket_parking.jpg',
    dimensionClass: '1by1'
  },
  productEjs: 'ssm-ticket_parking.ejs',
  price: 'form',
  formFieldsToSave: [
    {
      fieldName: {
        en: 'Tag Number',
        fr: 'Numéro Tag'
      },
      formFieldName: 'tagNumber'
    },
    {
      fieldName: {
        en: 'Offence Date',
        fr: "Date d'infraction"
      },
      formFieldName: 'offenceDate'
    },
    {
      fieldName: {
        en: 'Licence Plate',
        fr: "Plaque d'immatriculation"
      },
      formFieldName: 'licencePlate'
    }
  ],
  identifierFormFieldName: 'tagNumber'
}

export const ticket_offenceNotice: ConfigProduct = {
  productName: {
    en: 'Provincial Offences - Offence Notice',
    fr: "Infractions provinciales - Avis d'infraction"
  },
  image: {
    path: '/images/ssm-ticket_offenceNotice.jpg',
    dimensionClass: '1by1'
  },
  productEjs: 'ssm-ticket_offenceNotice.ejs',
  price: 'form',
  formFieldsToSave: [
    {
      fieldName: {
        en: 'Offence Number',
        fr: "Numéro d'infraction"
      },
      formFieldName: 'offenceNumber'
    },
    {
      fieldName: {
        en: 'Offence Date',
        fr: "Date d'infraction"
      },
      formFieldName: 'offenceDate'
    },
    {
      fieldName: {
        en: 'Name on Ticket',
        fr: 'Nom sur la contravention'
      },
      formFieldName: 'nameOnTicket'
    }
  ],
  identifierFormFieldName: 'offenceNumber'
}

export const ticket_noticeOfFine: ConfigProduct = {
  productName: {
    en: 'Provincial Offences - Notice of Fine and Due Date',
    fr: "Infractions provinciales - Avis d'amende et d'échéance"
  },
  image: {
    path: '/images/ssm-ticket_noticeOfFine.jpg',
    dimensionClass: '1by1'
  },
  productEjs: 'ssm-ticket_noticeOfFine.ejs',
  price: 'form',
  formFieldsToSave: [
    {
      fieldName: {
        en: 'File Number',
        fr: 'Numéro de dossier'
      },
      formFieldName: 'fileNumber'
    },
    {
      fieldName: {
        en: 'Offence Date',
        fr: "Date d'infraction"
      },
      formFieldName: 'offenceDate'
    },
    {
      fieldName: {
        en: 'Name on Ticket',
        fr: 'Nom sur la contravention'
      },
      formFieldName: 'nameOnTicket'
    }
  ],
  identifierFormFieldName: 'fileNumber'
}
