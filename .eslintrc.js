module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true
        },
        sourceType: "module"
    },
    plugins: [
        "react",
        "react-hooks",
        "@typescript-eslint"
    ],
    settings: {
        react: {
            pragma: "React",
            version: "detect"
        }
    },
    extends: [
        "eslint:recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    env: {
        browser: true,
        es6: true
    },
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/prop-types": "off",

        // enable additional rules
        "indent": ["error", 4],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],

        // override configuration set by extending "eslint:recommended"
        "no-empty": "warn",
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "for-direction": "off",
    }
};