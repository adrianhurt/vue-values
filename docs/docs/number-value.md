---
title: '&lt;NumberValue /&gt;'
metaTitle: NumberValue | Vue Values
description: NumberValue component's documentation.
meta:
  - name: keywords
    content: vue values vue-values wrapper component store stored synchronized persist persistence number numbervalue counter
---

# &lt;NumberValue /&gt;

A Number value that allows you to specify a validation range and gives you _increment_ and _decrement_ helpers.

## Props
Every `Value`'s prop is available together with the following ones:
| Props     | Type      | Default		| Description |
| --------- | --------- | ------------- | ---- |
| **`min`**	| Number	| `undefined`	| An optional minimum value. |
| **`max`**	| Number	| `undefined`	| An optional maximum value. |

## Scoped props (default slot)
Every `Value`'s scoped prop is available together with the following ones:

| Scoped props              | Type    	| Description |
| ------------------------- | --------- | ---- |
| **`isFirst`**             | Boolean	| `true` if current value is equal to `min`. |
| **`isLast`**              | Boolean	| `true` if current value is equal to `max`. |
| **`increment(delta=1)`**  | Function	| Increments `delta` to current value. Only if its not disabled. |
| **`decrement(delta=1)`**  | Function	| Decrements `delta` to current value. Only if its not disabled. |

## Events
Every `Value`'s event is available.

## Example

<Demo-Counter :defaultValue="1" :initialValue="5" />

```vue {3-10,13-17,20,21,25}
<template>
	<BooleanValue #default="{ value: disabled, toggle: toggleDisabled }">
		<NumberValue
			:defaultValue="1"
			:initialValue="5"
			:min="1"
			:max="10"
			:disabled="disabled"
			#default="{ value, increment, decrement, isFirst, isLast, resetToDefault, resetToInitial }"
		>
			<div class="demo demo-with-actions">
				<CounterInput
					:value="value"
					:prevDisabled="isFirst"
					:nextDisabled="isLast"
					@prev="decrement"
					@next="increment"
				/>
				<div class="demo-actions">
					<a @click="resetToDefault">reset to default</a>
					<a @click="resetToInitial">reset to initial</a>
					<DisabledActionInput :value="disabled" @toggle="toggleDisabled" />
				</div>
			</div>
		</NumberValue>
	</BooleanValue>
</template>

<script>
import { BooleanValue, NumberValue } from 'vue-values'
import CounterInput from '../CounterInput'
import DisabledActionInput from '../DisabledActionInput'

export default {
	components: { BooleanValue, NumberValue, CounterInput, DisabledActionInput },
}
</script>
```
