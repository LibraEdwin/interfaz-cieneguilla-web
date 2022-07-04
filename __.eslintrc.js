module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:next/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react', 'next'
  ],
  rules: {
    'space-before-function-paren': 'off',
    'react/react-in-jsx-scope': 'off',
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  }
}