module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ['standard', 'standard-react'],
  // add your custom rules here
  'rules': {
  },
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  globals: {
    "__DEV__": false,
    "__TEST__": false,
    "__PROD__": false,
    "__COVERAGE__": false
  },
}
