// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  fonts: {
     provider: 'bunny'
  },

  // 内容模块配置
  content: {
    // Nuxt Content 配置
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3
        }
      }
    }
  },

  // 运行时配置
  runtimeConfig: {
    // 私有配置（仅在服务端可用）
    apiSecret: process.env.API_SECRET || 'default_secret',
    
    // 公共配置（客户端可用）
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001',
      appMode: process.env.NUXT_PUBLIC_APP_MODE || 'development',
      appEnv: process.env.NUXT_PUBLIC_APP_ENV || 'dev'
    }
  },
  
  // Nitro 配置
  nitro: {
    hooks: {
      'close': async () => {
        const { copyFileSync, existsSync, mkdirSync } = await import('node:fs')
        const { resolve } = await import('node:path')
        
        const srcFile = resolve(process.cwd(), 'ecosystem.config.js')
        const destDir = resolve(process.cwd(), '.output')
        const destFile = resolve(destDir, 'ecosystem.config.js')
        
        if (existsSync(srcFile)) {
          if (!existsSync(destDir)) {
            mkdirSync(destDir, { recursive: true })
          }
          copyFileSync(srcFile, destFile)
          console.log('已成功复制 ecosystem.config.js 到 .output 目录）')
        } else {
          console.warn('未找到 ecosystem.config.js 文件')
        }
      }
    }
  }
})
