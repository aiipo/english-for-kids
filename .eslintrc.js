module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["airbnb-base"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "class-methods-use-this": "off",
        "no-unused-vars": "warn",
        "linebreak-style": "off",
        "arrow-parens": ["error", "as-needed"],
        "object-curly-newline": ["error", {
            "ObjectPattern": { "multiline": true },
        }],
    }
};