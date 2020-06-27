---
title: '&lt;ArrayValue /&gt;'
metaTitle: ArrayValue | Vue Values
description: ArrayValue component's documentation.
meta:
  - name: keywords
    content: vue values vue-values wrapper component store stored synchronized persist persistence array arrayvalue
---

# &lt;ArrayValue /&gt;

An Array value that gives you helpers like _append_, _prepend_, _splice_ or _sort_.

## Props
Every `Value`'s prop is available together with the following ones:

## Scoped props (default slot)
Every `Value`'s scoped prop is available together with the following ones:

| Scoped props      		    | Type    	| Description |
| ----------------------------- | --------- | ---- |
| **`append(...items)`**    	| Function	| Appends the given items to current array. Only if its not disabled. |
| **`prepend(...items)`**    	| Function	| Prepends the given items to current array. Only if its not disabled. |
| **`insert(index, ...items)`** | Function	| Inserts the given items at specific `index`. Only if its not disabled. |
| **`removeFirst()`**    		| Function	| Removes the first item. Only if its not disabled. |
| **`removeLast()`**    	    | Function	| Removes the last item. Only if its not disabled. |
| **`removeIndex(index)`**    	| Function	| Removes the item corresponding to the given `index`. Only if its not disabled. |
| **`remove(...items)`**    	| Function	| Removes the items. Only if its not disabled. |
| **`splice(...args)`**    		| Function	| Calls [`Array.splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice). Only if its not disabled. |
| **`reverse()`**    		    | Function	| Calls [`Array.reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse). Only if its not disabled. |
| **`sort(comparator)`**        | Function	| Calls [`Array.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). Only if its not disabled. |

## Events
Every `Value`'s event is available.

## Example

<Demo-PizzaArray />

```vue {2-5,13,15,17,21-27,31,32}
<template>
	<ArrayValue
		:initialValue="['Tomato sauce', 'Mozzarella', 'Basil']"
		#default="{ value: ingredients, append: addIngredient, removeIndex: removeIngredient, resetToDefault, resetToInitial }"
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
						<a @click="removeIngredient(index)">remove</a>
					</li>
				</ul>
			</div>
			<div class="demo-actions">
				<a @click="resetToDefault">reset to default</a>
				<a @click="resetToInitial">reset to initial</a>
			</div>
		</div>
	</ArrayValue>
</template>

<script>
import { ArrayValue, StringValue } from 'vue-values'

export default {
	components: { ArrayValue, StringValue },
}
</script>
```
