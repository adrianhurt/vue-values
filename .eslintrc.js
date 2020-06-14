module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },

    extends: ['eslint:recommended', 'airbnb-base', 'plugin:vue/recommended', 'plugin:vue-types/strongly-recommended'],
    plugins: ['babel'],

    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },

    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2019,
        sourceType: 'module',
    },


    rules: {
        'no-unused-expressions': 'off',
        'babel/no-unused-expressions': 'error',
        'no-param-reassign': [
            'error',
            { props: true, ignorePropertyModificationsFor: ['state', 'el'] },
        ],
        'space-before-function-paren': ['error', 'always'],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'import/no-extraneous-dependencies': 'off',
        'linebreak-style': 'off',
        'no-tabs': 'off',
        'vue/attribute-hyphenation': [
            2,
            'never',
            {
                ignore: [
                    'stroke-width',
                    'font-size',
                    'text-anchor',
                    'stroke-dasharray',
                    'stop-color',
                    'stop-opacity',
                ],
            },
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always',
            },
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'object-curly-spacing': ['error', 'always'],
        semi: ['error', 'never'],
        'max-len': [
            'error',
            {
                comments: 180,
                code: 180,
            },
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                outerIIFEBody: 1,
            },
        ],
        'comma-dangle': ['error', 'always-multiline'],
        'vue/html-closing-bracket-spacing': 'error',
        'vue/prop-name-casing': 'error',
    },

    overrides: [
        {
            files: ['**/*.spec.js'],
            rules: { 'import/no-extraneous-dependencies': 'off', 'no-debugger': 'off', 'no-console': 'off' },
            env: { jest: true },
        },
    ],
}
