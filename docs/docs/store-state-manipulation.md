# Stored global state manipulation

We have seen in other sections, you can declare specific _default and initial values_ for a _Value_ component. But as you can imagine,
for _StoredValue components_ we need a way to globally declare these default and initial values.

## Current stored values

### `VueValuesStore.setState(newState)`
Sets a new current state.

::: tip Note
This function doesn't replace the current one, instead it sets every _stored value_ for each field within the `newState` object.
So if you want to substitute it, you will need to use `removeAll` function first.
:::

### `VueValuesStore.removeAll()`
Deletes every value from the `store` ensuring the deletion triggers view updates.


## Default stored values

### `VueValuesStore.setDefaultState(newDefaultState)`
Sets (or replaces) a new global default state with the every _default value_ you want to declare.

### `VueValuesStore.setDefaultValue(uid, newDefaultValue)`
Sets a new _default value_ for the corresponding `uid`.

### `VueValuesStore.getDefaultValue(uid)`
Gets the  _default value_ for the corresponding `uid`.

### `VueValuesStore.removeDefaultValue(uid)`
Deletes the corresponding _default value_.

### `VueValuesStore.resetAllToDefault()`
Resets every _stored value_ declared previously with `defaultState` a new global default state with the every _default value_ you want to declare.


## Initial stored values

### `VueValuesStore.setInitialState(newInitialState)`
Sets (or replaces) a new global initial state with the every _initial value_ you want to declare.

### `VueValuesStore.setInitialValue(uid, newInitialValue)`
Sets a new _initial value_ for the corresponding `uid`.

### `VueValuesStore.getInitialValue(uid)`
Gets the  _initial value_ for the corresponding `uid`.

### `VueValuesStore.removeInitialValue(uid)`
Deletes the corresponding _initial value_.

### `VueValuesStore.resetAllToInitial()`
Resets every _stored value_ declared previously with `initialState` a new global initial state with the every _initial value_ you want to declare.
