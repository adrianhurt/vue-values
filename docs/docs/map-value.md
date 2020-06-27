---
title: '&lt;MapValue /&gt;'
metaTitle: MapValue | Vue Values
description: MapValue component's documentation.
meta:
  - name: keywords
    content: vue values vue-values wrapper component store stored synchronized persist persistence map mapvalue
---

# &lt;MapValue /&gt;

An Object value that gives you the _setValue_ and _remove_ helpers.

## Props
Every `Value`'s prop is available together with the following ones:

## Scoped props (default slot)
Every `Value`'s scoped prop is available together with the following ones:

| Scoped props      					| Type    	| Description |
| ------------------------------------- | --------- | ---- |
| **`setValue(key,value)`**				| Function	| Sets the value for the given key. Only if its not disabled. |
| **`setValue(keysAndValuesArray)`**	| Function	| Sets the values given by the array. Only if its not disabled. |
| **`remove(...keys)`**	        		| Function	| Removes the values for corresponding keys. Only if its not disabled. |

## Events
Every `Value`'s event is available.

## Example

<Demo-SettingsMap :initialValue="new Map([['darkmode', true], ['newsletter', true], ['bigFontSize', false]])" />

```vue {2-5,14,18,21}
<template>
	<MapValue
		:initialValue="new Map([['darkmode', true], ['newsletter', true], ['bigFontSize', false]])"
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
	</MapValue>
</template>

<script>
import { MapValue } from 'vue-values'
import SwitchInput from '../SwitchInput'

export default {
	components: { MapValue, SwitchInput },
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
