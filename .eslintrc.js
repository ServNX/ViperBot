module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'linebreak-style': 'off',
    'space-before-function-paren': 'off',
    'object-curly-spacing': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // This rule is stupid
    'prefer-destructuring': 'off',

    // allow v => true
    // instead of forcing (v) => { return true; }
    'arrow-parens': 'off',

    // allow returns inside body blocks
    'arrow-body-style': 'off',

    'no-unused-expressions': 'off',

    indent: 'off',

    'vue/valid-v-on': 'off',

    'vue/script-indent': ['error', 2, {
      baseIndent: 1,
      switchCase: 1,
      ignores: [],
    }],

    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'any',
        component: 'any',
      },
    }],

    // always use semicolons to terminate lines
    semi: [2, 'always'],

    // disable no shadow
    'no-shadow': 0,

    // allow global require
    'global-require': 0,

    // allow unnamed functions
    'func-names': 0,

    // don't require .vue extension when importing
    'import/extensions': [
      'error', 'always', {
        js: 'never',
        vue: 'never',
      }],

    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [
      'error', {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e', // for e.returnvalue
        ],
      }],

    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error', {
        optionalDependencies: ['test/unit/index.js'],
      }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
