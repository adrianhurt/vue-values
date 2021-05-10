import { reactive } from 'vue'
import ValueFunctions from './valueFunctions'

const state = reactive({})

let defaultState = {}
let initialState = {}

let onSet
let onDelete

const hasOwnProperty = (...args) => Object.prototype.hasOwnProperty.call(...args)

/**
 * Setter for a stored value
*/
function set (uid, value) {
    if (uid) {
        const curatedValue = onSet ? onSet(uid, value) : value
        // if (hasOwnProperty(state, uid)) {
        state[uid] = curatedValue
        // } else {
        // Vue.set(state, uid, curatedValue)
        // }
        return curatedValue
    }
    return value
}

/**
 * Sets every value found within newState
*/
function setState (newState) {
    Object.keys(newState).forEach((uid) => {
        set(uid, newState[uid])
    })
}

/**
 * Getter for a stored value
*/
function get (uid, defaultValue) {
    if (uid) {
        if (!hasOwnProperty(state, uid)) {
            set(uid, defaultValue)
        }
        return state[uid]
    }
    return defaultValue
}

/**
 * Deletes a stored value
*/
function remove (uid) {
    delete state[uid]
    onDelete?.(uid)
}
/**
 * Deletes every stored value
*/
function removeAll () {
    Object.keys(state).forEach((uid) => {
        remove(uid)
    })
}

// //////////////////////////
// Default values

function setDefaultState (newDefaultState) {
    defaultState = newDefaultState || {}
}

function setDefaultValue (uid, newValue) {
    defaultState[uid] = newValue
}
function getDefaultValue (uid) {
    return defaultState[uid]
}

function removeDefaultValue (uid) {
    delete defaultState[uid]
}

function resetToDefault (uid) {
    set(uid, (defaultState || {})[uid])
}

function resetAllToDefault () {
    Object.keys(defaultState).forEach((uid) => {
        resetToDefault(uid)
    })
}

// //////////////////////////
// Initial values

function setInitialState (newInitialState) {
    initialState = newInitialState || {}
}

function setInitialValue (uid, newValue) {
    initialState[uid] = newValue
}
function getInitialValue (uid) {
    return initialState[uid]
}

function removeInitialValue (uid) {
    delete initialState[uid]
}

function resetToInitial (uid) {
    set(uid, (initialState || {})[uid])
}

function resetAllToInitial () {
    Object.keys(initialState).forEach((uid) => {
        resetToInitial(uid)
    })
}

// //////////////////////////
// General reset (default or initial)
function reset (uid) {
    set(uid, hasOwnProperty(defaultState, uid) ? defaultState[uid] : (initialState || {})[uid])
}

// //////////////////////////
// Set update handlers (onSet and onDelete)

function setUpdatingHandlers (options = {}) {
    onSet = options.onSet
    onDelete = options.onDelete
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
