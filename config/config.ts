import { defineConfig } from 'umi'

import theme from './theme'

export default defineConfig({
  hash: true,
  mock: false,
  proxy: {
    '/api': {
      target: 'http://localhost:9000',
      changeOrigin: true
    }
  },
  // mock: {
  //   exclude: ['mock/**/_*.[jt]s']
  // },
  antd: {},
  theme,
  locale: {
    antd: true,
    title: true
  }
})
