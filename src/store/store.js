import { reactive } from 'vue'
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

let afterSet
let afterDelete
let afterUpdate

/**
 * Deletes a stored value
*/
function remove (uid, { notify = true } = {}) {
    const result = removeValueFromObject(uid, state)
    if (notify) afterDelete?.(uid)
    if (notify) afterUpdate?.(state)
    return result
}
/**
 * Deletes every stored value
*/
function removeAll ({ notify = true } = {}) {
    Object.keys(state).forEach((key) => {
        remove(key, { notify: false })
    })
    if (notify) afterUpdate?.(state)
}

/**
 * Merges an object to the current state
*/
function mergeState (newState, { notify = true } = {}) {
    deepMerge(state, newState)
    if (notify) afterUpdate?.(state)
    return state
}

/**
 * Sets every value found within newState
*/
function setState (newState, { notify = true } = {}) {
    removeAll({ notify: false })
    mergeState(newState, { notify: false })
    if (notify) afterUpdate?.(state)
}

/**
 * Setter for a stored value
*/
function set (uid, newValue, { notify = true } = {}) {
    const result = setValueIntoObject(uid, state, newValue)
    if (notify) afterSet?.(uid, newValue)
    if (notify) afterUpdate?.(state)
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
function getDefaultValue (uid) {
    return getValueFromObject(uid, defaultState)
}

function removeDefaultValue (uid) {
    return removeValueFromObject(uid, defaultState)
}

function resetToDefault (uid) {
    set(uid, getDefaultValue(uid))
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
function getInitialValue (uid) {
    return getValueFromObject(uid, initialState)
}

function removeInitialValue (uid) {
    return removeValueFromObject(uid, initialState)
}

function resetToInitial (uid) {
    set(uid, getInitialValue(uid))
}

function resetAllToInitial () {
    mergeState(initialState)
}

// //////////////////////////
// General reset (default or initial)
function reset (uid) {
    set(uid, existsPathInObject(defaultState, uid) ? getDefaultValue(uid) : getInitialValue(uid))
}

// //////////////////////////
// Set update handlers

function setUpdatingHandlers (options = {}) {
    afterSet = options.afterSet
    afterDelete = options.afterDelete
    afterUpdate = options.afterUpdate
}

// //////////////////////////
// Auxiliar functions

function valueAs (type) {
    return (uid) => {
        const applyToUid = (fn) => (...args) => fn(uid, ...args)
        const functionsDeclarations = type && type !== 'value' ? ValueFunctions[type] : {}
        return {
            get: applyToUid(get),
            set: applyToUid(set),
            resetToDefault: applyToUid(resetToDefault),
            resetToInitial: applyToUid(resetToInitial),
            reset: applyToUid(reset),
            remove: applyToUid(remove),
            ...Object.keys(functionsDeclarations).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: (...args) => set(uid, functionsDeclarations[key](get(uid), ...args)),
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
    setUpdatingHandlers,
    removeAll,
    value: valueAs('value'),
    boolean: valueAs('boolean'),
    number: valueAs('number'),
    string: valueAs('string'),
    array: valueAs('array'),
    set: valueAs('set'),
    object: valueAs('object'),
    map: valueAs('map'),
}
