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
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'prefer-destructuring': 'off',
    'arrow-parens': 'off',
    'arrow-body-style': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    curly: 'off',
    'linebreak-style': 'off',
    'space-before-function-paren': 'off',
    'object-curly-spacing': 'off',
    'import/no-dynamic-require': 'off',
    'consistent-return': 'off',
    'no-prototype-builtins': 'off',
    'no-plusplus': 'off',
    'no-return-await': 'off',
    'no-shadow': 'off',
    'global-require': 'off',
    'func-names': 'off',
    'no-param-reassign': 'off',
    'vue/valid-v-on': 'off',
    indent: 'off',

    semi: [2, 'always'],

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

    // don't require .vue extension when importing
    'import/extensions': [
      'error', 'always', {
        js: 'never',
        vue: 'never',
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
