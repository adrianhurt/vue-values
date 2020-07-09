# Stored vs regular values

_Stored values_ work the same as regular ones but their values are stored in a common reactive store. Every regular _Value_ has
its corresponding _stored_ one. All they have the `Stored` prefix and need a required prop `uid` to specify a _unique identifier_.
Then, every _stored Value_ connected to a specific `uid` will be _synchronized_.

::: warning
The prop `uid` prop must be a **unique identifier** through the whole app instance. It means you are responsible for guarantee its
uniqueness. You can use any namespace you consider for it (example: `"UsersScreen.modal.visible"`).
:::

::: warning About persistence
As you can see, any _stored value_ is saved in memory so it persist only until you reload the page.
If you need to persist it –in local storage, for example– check the section about [persistence](./store-persistence.md).
:::

## Props, Scoped props (default slot) and Events
Every _stored value_ has same props, scoped props and events than its equivalent regular value, but it requires the `uid` prop.

| Props         		| Type      | Default		| Description |
| --------------------- | --------- | ------------- | ---- |
| **`uid`**	            | String	| _required_	| A unique identifier for this value component. |

## List of stored value components
As we have seen, there is a stored equivalent component for every regular one. They only require the `uid` props.

| StoredValue component	| Equivalent Value component |
| --------------------- | ---- |
| `StoredValue`			| [Value](./value.md) |
| `StoredBooleanValue`	| [BooleanValue](./boolean-value.md) |
| `StoredNumberValue`	| [NumberValue](./number-value.md) |
| `StoredStringValue`	| [StringValue](./string-value.md) |
| `StoredArrayValue`	| [ArrayValue](./array-value.md) |
| `StoredSetValue`		| [SetValue](./set-value.md) |
| `StoredObjectValue`	| [ObjectValue](./object-value.md) |
| `StoredMapValue`		| [MapValue](./map-value.md) |

## Example
As an example, we can see here two synchronized (but uncoupled) `StoredNumberValue` components.

_This is an example:_
<Demo-Counter uid="stored-values-demo-counter" :defaultValue="1" :initialValue="5" />

_And this is an another uncoupled example. Indeed, it's another instance of the same component._
<Demo-Counter uid="stored-values-demo-counter" :defaultValue="1" :initialValue="5" />

::: tip Note
This two _stored values_ are placed together, but they are synchronized through your whole app,
so they can be in different screens and they will maintain the same value.
However, remember the _stored values_ are volatile, so if you reload the page you will lose them.
If you need to persist them –in local storage, for example– check the section about [persistence](./store-persistence.md).
:::

These are two different instances for the following component declaration

```vue {3-11,14-18,21,22,26}
<template>
	<BooleanValue #default="{ value: disabled, toggle: toggleDisabled }">
		<StoredNumberValue
            uid="stored-values-demo-counter"
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
		</StoredNumberValue>
	</BooleanValue>
</template>

<script>
import { BooleanValue, StoredNumberValue } from 'vue-values'
import CounterInput from '../CounterInput'
import DisabledActionInput from '../DisabledActionInput'

export default {
	components: { BooleanValue, StoredNumberValue, CounterInput, DisabledActionInput },
}
</script>
```
