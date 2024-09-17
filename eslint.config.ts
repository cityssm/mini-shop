import { type Config, configWebApp } from 'eslint-config-cityssm'
import tseslint from 'typescript-eslint'

export const config: Config = tseslint.config(...configWebApp, {
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.json', './tsconfig.client.json']
    }
  }
})

export default config
