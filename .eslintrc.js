module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "script",
  },
  rules: {
    // Стиль коду
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-trailing-spaces": "error",
    "eol-last": ["error", "always"],
    "comma-dangle": ["error", "never"],

    // Якість коду
    "no-unused-vars": "warn",
    "no-console": "warn",
    "no-var": "error",
    "prefer-const": "error",
    "eqeqeq": ["error", "always"],
    "curly": "error",

    // Найкращі практики
    "no-undef": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-unreachable": "error",
    "default-case": "warn"
  },
  globals: {
    // Глобальні змінні браузера
    "document": "readonly",
    "window": "readonly",
    "IntersectionObserver": "readonly"
  }
};
