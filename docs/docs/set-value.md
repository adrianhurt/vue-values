---
title: '&lt;SetValue /&gt;'
metaTitle: SetValue | Vue Values
description: SetValue component's documentation.
meta:
  - name: keywords
    content: vue values vue-values wrapper component store stored synchronized persist persistence set setvalue
---

# &lt;SetValue /&gt;

A Set value that gives you the _add_, _remove_ and _toggle_ helpers.

## Props
Every `Value`'s prop is available together with the following ones:

## Scoped props (default slot)
Every `Value`'s scoped prop is available together with the following ones:

| Scoped props      		| Type    	| Description |
| ------------------------- | --------- | ---- |
| **`add(...items)`**		| Function	| Adds the given items to current set. Only if its not disabled. |
| **`remove(...items)`**	| Function	| Removes the corresponding items. Only if its not disabled. |
| **`toggle(...items)`**	| Function	| Adds the given item if the set doesn't contains it. Removes it otherwise. Only if its not disabled. |

## Events
Every `Value`'s event is available.

## Example

<Demo-PizzaSet />

```vue {2-5,13,15,17,21-27,31,32}
<template>
	<SetValue
		:initialValue="new Set(['Tomato sauce', 'Mozzarella', 'Basil'])"
		#default="{ value: ingredients, add: addIngredient, remove: removeIngredient, resetToDefault, resetToInitial }"
	>
		<div class="demo demo-with-actions">
			<div>
				<label>Create your definitive pizza</label>
				<StringValue #default="{ value: text, set: setText, reset: resetText }">
					<div class="input-group">
						<input
							type="text"
							:value="text"
							placeholder="add an ingredient"
							@input="setText($event.target.value)"
						/>
						<button @click="() => (text && addIngredient(text) && resetText())">Add</button>
					</div>
				</StringValue>
				<ul class="ingredient-list">
					<li
						v-for="(ingredient, index) in ingredients"
						:key="index"
					>
						{{ ingredient }}
						<a @click="removeIngredient(ingredient)">remove</a>
					</li>
				</ul>
			</div>
			<div class="demo-actions">
				<a @click="resetToDefault">reset to default</a>
				<a @click="resetToInitial">reset to initial</a>
			</div>
		</div>
	</SetValue>
</template>

<script>
import { SetValue, StringValue } from 'vue-values'

export default {
	components: { SetValue, StringValue },
}
</script>
```