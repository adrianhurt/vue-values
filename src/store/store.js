import { reactive } from 'vue'
import { addListener, removeListener, toEveryListener } from './listeners'
import ValueFunctions from '../valueFunctions/valueFunctions'
import {
    existsPathInObject,
    getValueFromObject,
    setValueIntoObject,
    removeValueFromObject,
    deepMerge,
} from './utils'

const state = reactive({})

let defaultState = {}
let initialState = {}

/**
 * Deletes a stored value
*/
function remove (uid, { notify = true } = {}) {
    const result = removeValueFromObject(uid, state)
    if (notify) {
        toEveryListener('onDeleteValue', uid, state)
        toEveryListener('onUpdateState', state)
    }
    return result
}
/**
 * Deletes every stored value
*/
function removeAll ({ notify = true } = {}) {
    Object.keys(state).forEach((key) => {
        remove(key, { notify: false })
    })
    if (notify) toEveryListener('onUpdateState', state)
}

/**
 * Merges an object to the current state
*/
function mergeState (newState, { notify = true } = {}) {
    deepMerge(state, newState)
    if (notify) toEveryListener('onUpdateState', state)
    return state
}

/**
 * Sets every value found within newState
*/
function setState (newState, { notify = true } = {}) {
    removeAll({ notify: false })
    mergeState(newState, { notify: false })
    if (notify) toEveryListener('onUpdateState', state)
}

/**
 * Setter for a stored value
*/
function set (uid, newValue, { notify = true } = {}) {
    const result = setValueIntoObject(uid, state, newValue)
    if (notify) {
        toEveryListener('onSetValue', uid, newValue, state)
        toEveryListener('onUpdateState', state)
    }
    return result
}

/**
 * Getter for a stored value
*/
function get (uid, defaultValue) {
    return getValueFromObject(uid, state, { defaultValue })
}

// //////////////////////////
// Default values

function setDefaultState (newDefaultState) {
    defaultState = newDefaultState || {}
}

function setDefaultValue (uid, newValue) {
    return setValueIntoObject(uid, defaultState, newValue)
}
function getDefaultValue (uid, defaultValue) {
    return getValueFromObject(uid, defaultState, { defaultValue })
}

function removeDefaultValue (uid) {
    return removeValueFromObject(uid, defaultState)
}

function resetToDefault (uid, defaultValue) {
    set(uid, getDefaultValue(uid, defaultValue))
}

function resetAllToDefault () {
    mergeState(defaultState)
}

// //////////////////////////
// Initial values

function setInitialState (newInitialState) {
    initialState = newInitialState || {}
}

function setInitialValue (uid, newValue) {
    return setValueIntoObject(uid, initialState, newValue)
}
function getInitialValue (uid, defaultValue) {
    return getValueFromObject(uid, initialState, { defaultValue })
}

function removeInitialValue (uid) {
    return removeValueFromObject(uid, initialState)
}

function resetToInitial (uid, defaultValue) {
    set(uid, getInitialValue(uid, defaultValue))
}

function resetAllToInitial () {
    mergeState(initialState)
}

// //////////////////////////
// General reset (default or initial)
function reset (uid, defaultValue) {
    if (existsPathInObject(defaultState, uid)) {
        set(uid, getDefaultValue(uid))
    } else if (existsPathInObject(initialState, uid)) {
        set(uid, getInitialValue(uid))
    } else {
        set(uid, defaultValue)
    }
}

// //////////////////////////
// Auxiliar functions

function valueAs (type) {
    return (uid) => {
        const applyToUid = (fn) => (...args) => fn(uid, ...args)

        const setter = type && type !== 'value' && ValueFunctions[type].setter
            ? (newValue, options) => applyToUid(set)(ValueFunctions[type].setter(options)(newValue))
            : applyToUid(set)

        const customFunction = (type && type !== 'value' && ValueFunctions[type].function) || {}
        const customMutator = (type && type !== 'value' && ValueFunctions[type].mutator) || {}
        return {
            get: applyToUid(get),
            set: setter,
            resetToDefault: applyToUid(resetToDefault),
            resetToInitial: applyToUid(resetToInitial),
            reset: applyToUid(reset),
            remove: applyToUid(remove),
            ...Object.keys(customFunction).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: (...args) => customFunction[key](get(uid))(...args),
                }),
                {},
            ),
            ...Object.keys(customMutator).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: (...args) => setter(customMutator[key](get(uid))(...args)),
                }),
                {},
            ),
        }
    }
}

export default {
    state,
    getValue: get,
    setValue: set,
    resetToDefault,
    resetToInitial,
    reset,
    remove,
    mergeState,
    setState,
    setDefaultState,
    setDefaultValue,
    getDefaultValue,
    removeDefaultValue,
    resetAllToDefault,
    setInitialState,
    setInitialValue,
    getInitialValue,
    removeInitialValue,
    resetAllToInitial,
    removeAll,
    addListener,
    removeListener,
    value: valueAs('value'),
    boolean: valueAs('boolean'),
    number: valueAs('number'),
    string: valueAs('string'),
    array: valueAs('array'),
    object: valueAs('object'),
    set: valueAs('set'),
    map: valueAs('map'),
}
