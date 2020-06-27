---
title: '&lt;ObjectValue /&gt;'
metaTitle: ObjectValue | Vue Values
description: ObjectValue component's documentation.
meta:
  - name: keywords
    content: vue values vue-values wrapper component store stored synchronized persist persistence object objectvalue
---

# &lt;ObjectValue /&gt;

An Object value that gives you the _setValue_ and _remove_ helpers.

## Props
Every `Value`'s prop is available together with the following ones:

## Scoped props (default slot)
Every `Value`'s scoped prop is available together with the following ones:

| Scoped props      					| Type    	| Description |
| ------------------------------------- | --------- | ---- |
| **`setValue(key,value)`**				| Function	| Sets the value for the given key. Only if its not disabled. |
| **`setValues(keysAndValuesObject)`**	| Function	| Sets the values given by the object. Only if its not disabled. |
| **`remove(...keys)`**	    			| Function	| Removes the values for corresponding keys. Only if its not disabled. |

## Events
Every `Value`'s event is available.

## Example

<Demo-SettingsObject :initialValue="{ darkmode: true, newsletter: true, bigFontSize: false }" />

```vue {2-5,14,18,21}
<template>
	<ObjectValue
		:initialValue="{ darkmode: true, newsletter: true, bigFontSize: false }"
		#default="{ value: settings, setValue, resetToInitial }"
	>
		<div class="demo demo-with-actions">
			<div class="settings">
				<div
					v-for="{ key, label } in options"
					:key="key"
					class="settings-item"
				>
					<label>{{ label }}</label>
					<SwitchInput :value="settings[key]" @input="setValue(key, $event)" />
				</div>
			</div>
			<div class="demo-actions">
				<a @click="resetToInitial">reset to initial</a>
			</div>
		</div>
	</ObjectValue>
</template>

<script>
import { ObjectValue } from 'vue-values'
import SwitchInput from '../SwitchInput'

export default {
	components: { ObjectValue, SwitchInput },
	created () {
		this.options = [
			{ key: 'darkmode', label: 'Darkmode' },
			{ key: 'newsletter', label: 'Subscribed to newsletter' },
			{ key: 'bigFontSize', label: 'Bigger font size' },
		]
	}
}
</script>
```
