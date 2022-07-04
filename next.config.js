module.exports = {
  reactStrictMode: true,
  env: {
    URI_API: process.env.URI_API,
    URI_WEB: process.env.URI_WEB,
    CODE_COMMERCE: process.env.CODE_COMMERCE,
    CONFIG_BTN: process.env.CONFIG_BTN,
    TOKEN_ACCESS: process.env.TOKEN_ACCESS,
    TOKEN_SESSION: process.env.TOKEN_SESSION,
    AUTH_ECOMMERCE: process.env.AUTH_ECOMMERCE,
    NEXT_PUBLIC_GA_ID: '',
    DOMAIN_IMAGES: 'https://storage.googleapis.com/svr-cieneguilla.appspot.com'
  },
  images: {
    domains: ['localhost', 'www.dabambu.com', 'storage.googleapis.com'],
    formats: ['image/avif', 'image/webp']
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}
