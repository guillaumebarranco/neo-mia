// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ["error", 4],
    'linebreak-style': 0,
    'padded-blocks': 0,
    'keyword-spacing': 0,
    'arrow-parens': 0,
    'no-console': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-confusing-arrow': 0,
    'no-use-before-define': 0,
    'arrow-body-style': ["error", "as-needed"],
    'key-spacing': 0,
    'quote-props': 0,
    'quotes': 0,
  }
}
