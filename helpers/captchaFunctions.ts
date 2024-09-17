import NodeCache from 'node-cache'
import { v4 as uuidv4 } from 'uuid'

const timeoutSeconds_initialLoad = 30 // 30 seconds
const timeoutSeconds_postLookup = 15 * 60 // 15 minutes

const delay = async (millis: number) => {
  return await new Promise((resolve) => setTimeout(resolve, millis))
}

const captchaCache = new NodeCache({
  stdTTL: timeoutSeconds_initialLoad,
  useClones: false,
  maxKeys: 100_000
})

export const generateNewCaptcha = async (): Promise<string> => {
  const captchaText = uuidv4().slice(0, 5).toUpperCase()

  let captchaKey = ''

  do {
    captchaKey = uuidv4()
  } while (captchaCache.has(captchaKey))

  try {
    captchaCache.set(captchaKey, captchaText)
  } catch {
    await delay(10_000)
    return await generateNewCaptcha()
  }

  return captchaKey
}

export const getCaptchaText = (captchaKey: string): string => {
  const captchaText = captchaCache.get(captchaKey) as string

  if (captchaText) {
    captchaCache.set(captchaKey, captchaText, timeoutSeconds_postLookup)
  }

  return captchaText
}

export const captchaIsMatch = (
  captchaKey: string,
  captchaText: string
): boolean => {
  // key not found
  if (!captchaCache.has(captchaKey)) {
    return false
  }

  // text doesn't match
  if (captchaText !== captchaCache.get(captchaKey)) {
    return false
  }

  return true
}

export const purgeCaptcha = (captchaKey: string): void => {
  captchaCache.del(captchaKey)
}
