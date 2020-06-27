---
title: '&lt;StringValue /&gt;'
metaTitle: StringValue | Vue Values
description: StringValue component's documentation.
meta:
  - name: keywords
    content: vue values vue-values wrapper component store stored synchronized persist persistence string stringvalue
---

# &lt;StringValue /&gt;

A String value that gives you helpers like _append_, _prepend_, _replace_ or _substring_.

## Props
Every `Value`'s prop is available together with the following ones:

## Scoped props (default slot)
Every `Value`'s scoped prop is available together with the following ones:

| Scoped props      		| Type    	| Description |
| ------------------------- | --------- | ---- |
| **`append(str)`**    		| Function	| Appends another string to current one. Only if its not disabled. |
| **`prepend(str)`**    	| Function	| Prepends another string to current one. Only if its not disabled. |
| **`insert(index, str)`**  | Function	| Inserts another string to current one at position given by `index`. Only if its not disabled. |
| **`replace(...args)`**    | Function	| Calls [`String.replace`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace). Only if its not disabled. |
| **`substring(...args)`**  | Function	| Calls [`String.substring`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring). Only if its not disabled. |

## Events
Every `Value`'s event is available.

## Example

<Demo-InputText />

```vue {2,6,8,10,12,15}
<template>
	<StringValue #default="{ value, set, resetToDefault, reset }">
		<div class="demo demo-with-actions">
			<input
				type="text"
				:value="value"
				placeholder="Type something..."
				@input="set($event.target.value)"
			/>
			<p><b>Typed:</b> <span>{{ value }}</span></p>
			<div class="demo-actions">
				<a @click="reset">reset</a>
			</div>
		</div>
	</StringValue>
</template>

<script>
import { StringValue, BooleanValue } from 'vue-values'
import DisabledActionInput from '../DisabledActionInput'

export default {
	components: { StringValue, BooleanValue, DisabledActionInput },
}
</script>
```
