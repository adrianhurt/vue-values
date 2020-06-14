module.exports = {
    moduleFileExtensions: ['js', 'json', 'vue'],

    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest',
    },

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    snapshotSerializers: ['jest-serializer-vue'],
    testMatch: ['**/src/**/*.spec.(js|jsx|ts|tsx)'],
    testURL: 'http://localhost/',
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    preset: '@vue/cli-plugin-unit-jest',
}
