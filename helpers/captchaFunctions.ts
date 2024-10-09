import NodeCache from 'node-cache'
import { v4 as uuidv4 } from 'uuid'

const timeoutSecondsInitialLoad = 30 // 30 seconds
const timeoutSecondsPostLookup = 15 * 60 // 15 minutes

async function delay(millis: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, millis))
}

const captchaCache = new NodeCache({
  stdTTL: timeoutSecondsInitialLoad,
  useClones: false,
  maxKeys: 100_000
})

export async function generateNewCaptcha(): Promise<string> {
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

export function getCaptchaText(captchaKey: string): string {
  const captchaText = captchaCache.get(captchaKey) as string | undefined

  if (captchaText !== undefined) {
    captchaCache.set(captchaKey, captchaText, timeoutSecondsPostLookup)
  }

  return captchaText
}

export function captchaIsMatch(
  captchaKey: string,
  captchaText: string
): boolean {
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

export function purgeCaptcha(captchaKey: string): void {
  captchaCache.del(captchaKey)
}
