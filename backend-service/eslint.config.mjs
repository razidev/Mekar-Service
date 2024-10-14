import globals from "globals";


export default [
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    { languageOptions: { globals: globals.browser } },
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "off",
            "no-console": "warn",
            "linebreak-style": "off",
            "no-underscore-dangle": "off",
            "indent": ["error", 4],
            "semi": ["warn"],
            "no-param-reassign": [
                "error",
                {
                    "props": false
                }
            ],
        }
    },
];