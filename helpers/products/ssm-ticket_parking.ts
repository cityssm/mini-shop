import * as sqlPool from '@cityssm/mssql-multi-pool'
import * as configFunctions from '../configFunctions.js'

import type * as sqlTypes from 'mssql'

let tagNumberCache: Set<string>
let tagNumberCacheExpiryMillis = 0

const refreshTagNumberCache = async () => {
  const pool: sqlTypes.ConnectionPool = await sqlPool.connect(
    configFunctions.getProperty('mssqlConfig')
  )

  const result: sqlTypes.IResult<{ tagNumber: string }> = await pool
    .request()
    .query(
      'select tagNumber from MiniShop.Products_SSMTicketParking_Ineligible'
    )

  const temporaryCache: Set<string> = new Set()

  if (result.recordset) {
    for (const record of result.recordset) {
      temporaryCache.add(record.tagNumber.toLowerCase())
    }
  }

  tagNumberCache = temporaryCache
  tagNumberCacheExpiryMillis = Date.now() + 3 * 60 * 60 * 1000
}

export const isTagNumberEligible = async (
  tagNumber: string
): Promise<boolean> => {
  if (tagNumberCacheExpiryMillis < Date.now()) {
    await refreshTagNumberCache()
  }

  if (tagNumberCache.has(tagNumber.toLowerCase())) {
    return false
  }

  return true
}
