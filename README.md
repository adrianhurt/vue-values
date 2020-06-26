# vue-values

A set of simple components to handle simple values.

# Documentation

Please, check the [documentation page here](https://adrianhurt.github.io/vue-values/).

## Install

```
yarn add vue-values
```
or
```
npm install vue-values --save
```

And that's all! Here you have a simple usage example.

```vue
<template>
    <Value #default="{ value, set }">
        ...
    </Value>
</template>

<script>
import { Value } from 'vue-values'

export default {
    name: 'ValueExample',
    components: { Value },
}
</script>
```