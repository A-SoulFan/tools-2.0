module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['plugin:vue/vue3-recommended', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
  },
  ignorePatterns: ['dist/'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'vue/no-unused-vars': 'error',
    'vue/multi-word-component-names': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'semi': ['error', 'always'],
    'no-var': 'error',
    'no-duplicate-imports': 'error',
    'no-template-curly-in-string': 'error',
    'consistent-this': ['error', 'NOT_ALLOWED_RENAME_THIS'],
    'dot-notation': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-multi-str': 'error',
    'no-return-await': 'error',
    'no-unneeded-ternary': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-rest-params': 'error',
    'require-await': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'Use Object.keys().forEach() instead',
      },
      {
        selector: 'ForStatement',
        message: 'Use Array.forEach or Array.map instead',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
};
