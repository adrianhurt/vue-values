# About persistence: updating handlers

This library doesn't implement any persistence feature, but it doesn't mean it doesn't help you to get it. In deed, it's too easy!

## Updating handlers

### `VueValuesStore.setUpdatingHandlers({ onSet, onDelete })`
This function gives you a way to be notified when any update applies on the store. You only need to pass it the following two handlers:

#### `onSet(uid, value)`
This function will be called (if it's defined) before every _stored value_ update. This also gives you the opportunity of _"curate"_ its value,
so it's required that it returns the original value or a _"curated"_ version of it. That means the value that will be finally set on the _store"
is in deed that returned one by `onSet` function.

::: warning
Please, be sure that your implementation for `onSet` function returns the original value or a _curated_ version of it.
If not, you will always set every _stored value_ with `undefined`.
:::

#### `onDelete(uid)`
This function will be called (if it's defined) before every _stored value_ delete.

## Persisting the _value's store_
Using `setUpdatingHandlers` together with `setStates` (or `value.set`) you can easily persist your _stored values_.

::: tip Note
Note that this library is totally agnostic about your current persistence implementations or needs.
So you can use these methods to persist your _stored values_  wherever you want and initialize them from wherever you need, like:
* `localStorage`
* `sessionStorage`
* Cookies
* **Your own server**
* _(placeholder of what you need)_ 😃
:::

## Example: persisting into `localStorage`

Here you have a very simple —and clumpsy— but complete example that allows us to persist those _stored values_ that are declared within the `VUE_VALUES_TO_PERSIST` object.

```js {12-14,38-47,50-62}
import VueValuesStore from 'vue-values'

// Declare here the default values for StoredValue components
const VUE_VALUES_DEFAULT_STATE = {
	'demo.persisted-counter': 1,
}
// Declare here the initial values for StoredValue components
const VUE_VALUES_INITIAL_STATE = {
	'demo.persisted-counter': 3,
}
// Declare here those stored values you want to persist in local storage
const VUE_VALUES_TO_PERSIST = {
	'demo.persisted-counter': true,
}

// Gets the whole store from the local storage
function getWholeVueValuesStoreFromLocalStorage () {
	return JSON.parse(localStorage.getItem('VueValueStore') || '{}')
}
// Saves the whole store into the local storage
function saveWholeVueValuesStoreIntoLocalStorage (store) {
	localStorage.setItem('VueValueStore', JSON.stringify(store))
}
// Saves a single value into the local storage
function saveVueValueIntoLocalStorage (uid, value) {
	const store = getWholeVueValuesStoreFromLocalStorage()
	store[uid] = value
	saveWholeVueValuesStoreIntoLocalStorage(store)
}
// Deletes a single value from the local storage
function deleteVueValueFromLocalStorage (uid) {
	const store = getWholeVueValuesStoreFromLocalStorage()
	delete store[uid]
	saveWholeVueValuesStoreIntoLocalStorage(store)
}

// Initializes the default, initial and current store
VueValuesStore.setDefaultState(VUE_VALUES_DEFAULT_STATE)
VueValuesStore.setInitialState(VUE_VALUES_INITIAL_STATE)
VueValuesStore.setState(
	Object.assign(
		{},
		VUE_VALUES_DEFAULT_STATE,
		VUE_VALUES_INITIAL_STATE,
		getWholeVueValuesStoreFromLocalStorage(),
	)
)

// Sets the updating handlers
VueValuesStore.setUpdatingHandlers({
	onSet: (uid, value) => {
		if (VUE_VALUES_TO_PERSIST[uid]) {
			saveVueValueIntoLocalStorage(uid, value)
		}
		return value
	},
	onDelete: (uid) => {
		if (VUE_VALUES_TO_PERSIST[uid]) {
			deleteVueValueFromLocalStorage(uid)
		}
	},
})
```

Now, you can try to modify the value of this counter and reload this page to see its value is persisted.

<Demo-Counter uid="demo.persisted-counter" />

```vue {4}
<template>
	<BooleanValue #default="{ value: disabled, toggle: toggleDisabled }">
		<StoredNumberValue
            uid="demo.persisted-counter"
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
	components: { BooleanValue, NumberValue, CounterInput, DisabledActionInput },
}
</script>
```

## Example: reacting to changes

Now we are going to implement a simple feature to save in _local storage_ some user's settings.

```js {3,7,11,20-25}
// Declare here the default values for StoredValue components
const VUE_VALUES_DEFAULT_STATE = {
	'demo.persisted-settings': { darkmode: true, newsletter: true, bigFontSize: false },
}
// Declare here the initial values for StoredValue components
const VUE_VALUES_INITIAL_STATE = {
	'demo.persisted-settings': { darkmode: true, newsletter: true, bigFontSize: false },
}
// Declare here those stored values you want to persist in local storage
const VUE_VALUES_TO_PERSIST = {
	'demo.persisted-settings': true,
}

// Sets the updating handlers
VueValuesStore.setUpdatingHandlers({
	onSet: (uid, value) => {
		if (VUE_VALUES_TO_PERSIST[uid]) {
			saveVueValueIntoLocalStorage(uid, value)
		}
		if (uid === 'demo.persisted-settings') {
			// Do whatever you need to react to changes
			setTheme(value.darkmode ? 'darkmode' : 'regularmode')
			setFontSize(value.bigFontSize ? 18 : 14)
			newsletterSubscription(value.newsletter)
		}
		return value
	},
})
```

<Demo-SettingsObject uid="demo.persisted-settings" />

```vue {3}
<template>
	<StoredObjectValue
		uid="demo.persisted-settings"
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
	</StoredObjectValue>
</template>

<script>
import { StoredObjectValue } from 'vue-values'
import SwitchInput from '../SwitchInput'

export default {
	components: { StoredObjectValue, SwitchInput },
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

## Example: accepting cookies

That's probably my favorite one!

First of all, be sure you are persisting your flag into `localStorage`:

```js
import VueValuesStore from 'vue-values'

VueValuesStore.setDefaultValue('demo.persisted-accepted-cookies', false)
const acceptedFromLocalStorage = ... // your own implementation
VueValuesStore.value.set('demo.persisted-accepted-cookies', acceptedFromLocalStorage)

VueValuesStore.setUpdatingHandlers({
	onSet: (uid, value) => {
		if (uid === 'demo.persisted-accepted-cookies') {
			saveAcceptedIntoLocalStorage(value) // your own implementation
		}
		return value
	},
})
```

And you need a simple `StoredBooleanValue` component.

<Demo-Cookies uid="demo.persisted-accepted-cookies" />

```vue {2-5,7,9,12}
<template>
	<StoredBooleanValue
		uid="demo.persisted-accepted-cookies"
		#default="{ value: accepted, set }"
	>
		<transition name="cookie-transition">
			<div v-if="!accepted" class="CookieAlert">
				<p>The classic cookies alert message</p>
				<button @click="set(true)">Accept</button>
			</div>
		</transition>
	</StoredBooleanValue>
</template>
```

Finally, for example, if you want to "auto-accept" the cookies when the user navigates through the app, you can do something like that

```vue {5-7}
<script>
import VueValuesStore from 'vue-values'

export default {
	beforeRouteLeave (to, from, next) {
		VueValuesStore.value.set('demo.persisted-accepted-cookies', true)
	},
}
</script>
```
