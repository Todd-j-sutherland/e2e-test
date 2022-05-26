module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 'plugin:vue/strongly-recommended',
    'eslint:recommended',
    // '@vue/prettier',
  ],
  // parserOptions: {
  //   parser: 'babel-eslint',
  // },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/v-on-style': 'off',
    'vue/attribute-hyphenation': 0,
    'no-unused-vars': 'warn',
  },
  // overrides: [
  //   {
  //     files: [
  //       '**/__tests__/*.{j,t}s?(x)',
  //       '**/tests/unit/**/*.spec.{j,t}s?(x)',
  //     ],
  //     env: {
  //       jest: true,
  //     },
  //   },
  // ],
};
