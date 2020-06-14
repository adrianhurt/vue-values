# @adrianhurt/package-vue-canvas

A simple template for a VueJs package with:

-   [Prettier](https://prettier.io)
-   [ESLint](https://eslint.org)
-   [Airbnb Style Guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
-   [Jest](https://jestjs.io)
-   [Husky](https://github.com/typicode/husky) for git hooks
-   [Commitlint](https://commitlint.js.org) (to ensure [Conventional Commits](https://www.conventionalcommits.org))

## Install

```
$ npm install @adrianhurt/package-vue-canvas
```

or

```
$ yarn add @adrianhurt/package-vue-canvas
```

## Usage

```js
<template>
    <div id="app">
        <SlipperyButton />
    </div>
</template>

<script>
import SlipperyButton from '@adrianhurt/package-vue-canvas'

export default {
    name: 'App',
    components: { SlipperyButton },
}
</script>

<style lang="scss">
@import '~@adrianhurt/package-vue-canvas/dist/package-vue-canvas.css';
</style>
```