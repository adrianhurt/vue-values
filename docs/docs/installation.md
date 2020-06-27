---
title: Installation
description: Explains how to install the library.
meta:
  - name: keywords
    content: vue values vue-values wrapper component store stored synchronized persist persistence installation
---

# Installation

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