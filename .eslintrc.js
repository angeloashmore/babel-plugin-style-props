module.exports = {
  plugins: ['react'],
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'error',

    // react plugin - options
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/jsx-key': 'warn'
  },
  env: {
    node: true,
    browser: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 8
  }
}
