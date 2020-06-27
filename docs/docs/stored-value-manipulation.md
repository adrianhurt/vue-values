# Stored value manipulation

You can manipulate any _stored value_ directly without the necessity of any `StoredValue` component.
Any `StoredValue` component with the corresponding `uid` will react to these changes.

See the following examples:

```js
import VueValuesStore from 'vue-values'

// gets the current 'my-value' stored value
VueValuesStore.value.get('my-value')
// sets 'my-value' stored value
VueValuesStore.value.set('my-value', 'foo')
// applies 'toggle' function to the current 'my-toggle' stored value
VueValuesStore.boolean.toggle('my-toogle')
// increments 5 to the current 'my-number' stored value
VueValuesStore.number.increment('my-number', 5)
// appends numbers 1 and 2 to the current 'my-array' stored value
VueValuesStore.array.append('my-array', 1, 2)
```

::: tip
You have available the same functions given by the default slots for the corresponding `StoredValue` components but with the `uid` as the first argument.
You can see here the whole list.
:::

## Value manipulation
General value manipulation (available for any stored value):

### `VueValuesStore.value.set(uid, newValue)`
Sets the value the corresponding _stored value_ with a new one, and returns it again.

### `VueValuesStore.value.get(uid, defaultValue)`
Gets the current _stored value_. You can provide a _default value_ in case there is no _stored value_ for that `uid` (then it will be added to `store`).

### `VueValuesStore.value.resetToDefault(uid)`
Resets the corresponding _stored value_ to its _default value_.
To know more about this, see the TODO: Stored global state manipulation section  ./store-state-manipulation.md.

### `VueValuesStore.value.resetToInitial(uid)`
Resets the corresponding _stored value_ to its initial value_.
To know more about this, see the TODO: Stored global state manipulation section ./store-state-manipulation.md.

### `VueValuesStore.value.reset(uid)`
Resets the corresponding _stored value_ to its default value_ (or _initial one_ in case it is not defined).
To know more about this, see the TODO: Stored global state manipulation section ./store-state-manipulation.md.

### `VueValuesStore.value.remove(uid)`
Deletes a value from the `store` ensuring the deletion triggers view updates.


## Boolean value manipulation
* `VueValuesStore.boolean.toggle(uid)`

## Number value manipulation
* `VueValuesStore.number.increment(uid, delta = 1)`
* `VueValuesStore.number.decrement(uid, delta = 1)`

## String value manipulation
* `VueValuesStore.string.append(uid, str)`
* `VueValuesStore.string.prepend(uid, str)`
* `VueValuesStore.string.insert(uid, index, str)`
* `VueValuesStore.string.replace(uid, ...args)`
* `VueValuesStore.string.substring(uid, ...args)`

## Array value manipulation
* `VueValuesStore.array.reverse(uid)`
* `VueValuesStore.array.sort(uid, comparator)`
* `VueValuesStore.array.append(uid, ...items)`
* `VueValuesStore.array.prepend(uid, ...items)`
* `VueValuesStore.array.insert(uid, index, ...items)`
* `VueValuesStore.array.removeFirst(uid)`
* `VueValuesStore.array.removeLast(uid)`
* `VueValuesStore.array.removeIndex(uid, index)`
* `VueValuesStore.array.remove(uid, ...items)`
* `VueValuesStore.array.splice(uid, ...args)`

## Set value manipulation
* `VueValuesStore.set.add(uid, ...items)`
* `VueValuesStore.set.remove(uid, ...items)`
* `VueValuesStore.set.toggle(uid, ...items)`

## Object value manipulation
* `VueValuesStore.object.setValue(uid, key, value)`
* `VueValuesStore.object.setValues(uid, keysAndValuesObject)`
* `VueValuesStore.object.remove(uid, ...keys)`

## Map value manipulation
* `VueValuesStore.map.setValue(uid, key, value)`
* `VueValuesStore.map.setValues(uid, keysAndValuesArray)`
* `VueValuesStore.map.remove(uid, ...keys)`
