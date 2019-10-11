module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  "globals": {
  },
  "plugins": [
    "prettier"
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error",
    "strict": "error",
    "no-var": "error",
    "no-unused-vars": ["error", { "args": "none", "caughtErrors": "none", "ignoreRestSiblings": true }],
    "no-console": ["error", { "allow": ["info", "warn", "error"] }],
    "no-multiple-empty-lines": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "linebreak-style": ["error", "unix"]
  }
};
