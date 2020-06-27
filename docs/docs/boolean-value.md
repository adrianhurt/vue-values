---
title: '&lt;BooleanValue /&gt;'
metaTitle: BooleanValue | Vue Values
description: BooleanValue component's documentation.
meta:
  - name: keywords
    content: vue values vue-values wrapper component store stored synchronized persist persistence boolean booleanvalue
---

# &lt;BooleanValue /&gt;

A Boolean value that gives you a _toggle_ helper.

## Props
Every `Value`'s prop is available together with the following ones:

## Scoped props (default slot)
Every `Value`'s scoped prop is available together with the following ones:

| Scoped props      | Type    	| Description |
| ----------------- | --------- | ---- |
| **`toggle()`**    | Function	| Toggles the `value`. Only if its not disabled. |

## Events
Every `Value`'s event is available.

## Example

<Demo-Switch />

```vue {3-7,9,11,15}
<template>
	<BooleanValue #default="{ value: disabled, toggle: toggleDisabled }">
		<BooleanValue
			:initialValue="true"
			:disabled="disabled"
			#default="{ value, set, toggle }"
		>
			<div class="demo demo-with-actions">
				<SwitchInput :value="value" @input="set" />
				<div class="demo-actions">
					<a @click="toggle">toggle</a>
					<DisabledActionInput :value="disabled" @toggle="toggleDisabled" />
				</div>
			</div>
		</BooleanValue>
	</BooleanValue>
</template>

<script>
import { BooleanValue } from 'vue-values'
import SwitchInput from '../SwitchInput.vue'
import DisabledActionInput from '../DisabledActionInput'

export default {
	components: { BooleanValue, SwitchInput, DisabledActionInput },
}
</script>
```
