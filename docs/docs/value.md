---
title: '&lt;Value /&gt;'
metaTitle: Value | Vue Values
description: Value component's documentation.
meta:
  - name: keywords
    content: vue values vue-values wrapper component store stored synchronized persist persistence
---

# &lt;Value /&gt;

The most general case where you only need to manage one single generic value.

::: tip Note
Every other Value component (BooleanValue, StoredNumberValue...) have all of these props, scoped props and events available as well.
:::

## Props
| Props         		| Type      | Default		| Description |
| --------------------- | --------- | ------------- | ---- |
| **`defaultValue`**	| *any*		| `undefined`	| The default value. |
| **`initialValue`**	| *any*		| `undefined`	| The initial value. |
| **`disabled`**		| Boolean	| `false` 		| `true` for disable any value mutation. |

## Scoped props (default slot)
| Scoped props         		| Type    	| Description |
| ------------------------- | --------- | ---- |
| **`value`**				| *any*		| The current value. |
| **`disabled`**			| Boolean	| The current disabled value. |
| **`set(newValue)`**		| Function	| Sets a new value and returns it. Only if its not disabled. |
| **`clear()`**				| Function	| Clears the value (i.e. sets it with undefined). Only if its not disabled. |
| **`resetToDefault()`**	| Function	| Resets the value with the default one. Only if its not disabled. |
| **`resetToInitial()`**	| Function	| Resets the value with the initial one. Only if its not disabled. |
| **`reset()`**				| Function	| Resets the value with the default one (or initial if default is undefined). Only if its not disabled. |

## Events
| Events        | Arguments					| Description |
| ------------- | ------------------------- | ---- |
| **`change`**	| `(newValue, oldValue)`	| Emitted when the value changes. |

## Example

<Demo-Tabs />

```vue {2-5,8,10,13,16,19,24}
<template>
	<Value
		:defaultValue="defaultTab"
		#default="{ value: selectedTab, set: selectTab }"
	>
		<div class="demo">
			<TabsInput
				:value="selectedTab"
				:tabs="tabs"
				@input="selectTab"
			/>
			<div class="demo-tab-contents">
				<div v-if="selectedTab === tabs[0].key">
					First content
				</div>
				<div v-else-if="selectedTab === tabs[1].key">
					Second content
				</div>
				<div v-else-if="selectedTab === tabs[2].key">
					Third content
				</div>
			</div>
		</div>
	</Value>
</template>

<script>
import { Value } from 'vue-values'
import TabsInput from '../TabsInput.vue'

export default {
	components: { Value, TabsInput },
	created () {
		this.tabs = [
			{ key: 'first-tab', label: 'First tab' },
			{ key: 'second-tab', label: 'Second tab' },
			{ key: 'third-tab', label: 'Third tab' },
		]
		this.defaultTab = tabs[0].key
	}
}
</script>
```