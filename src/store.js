import Vue from 'vue'
import ValueFunctions from './valueFunctions'

const state = Vue.observable({})

let defaultState = {}
let initialState = {}

let onSet
let onDelete

/**
 * Setter for a stored value
*/
function set (uid, value) {
    if (uid) {
        const curatedValue = onSet ? onSet(uid, value) : value
        if (Object.prototype.hasOwnProperty.call(state, uid)) {
            state[uid] = curatedValue
        } else {
            Vue.set(state, uid, curatedValue)
        }
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
        if (!Object.prototype.hasOwnProperty.call(state, uid)) {
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
    Vue.delete(state, uid)
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
    set(uid, Object.prototype.hasOwnProperty.call(defaultState, uid) ? defaultState[uid] : (initialState || {})[uid])
}

// //////////////////////////
// Set update handlers (onSet and onDelete)

function setUpdatingHandlers (options = {}) {
    onSet = options.onSet
    onDelete = options.onDelete
}

// //////////////////////////
// Auxiliar functions

function applyFunctionsToStore (functionsDeclarations) {
    return Object.keys(functionsDeclarations).reduce(
        (acc, key) => ({
            ...acc,
            [key]: (uid, ...args) => set(uid, functionsDeclarations[key](get(uid), ...args)),
        }),
        {},
    )
}

export default {
    state,
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
    value: {
        get,
        set,
        resetToDefault,
        resetToInitial,
        reset,
        remove,
    },
    boolean: applyFunctionsToStore(ValueFunctions.boolean),
    number: applyFunctionsToStore(ValueFunctions.number),
    string: applyFunctionsToStore(ValueFunctions.string),
    array: applyFunctionsToStore(ValueFunctions.array),
    set: applyFunctionsToStore(ValueFunctions.set),
    object: applyFunctionsToStore(ValueFunctions.object),
    map: applyFunctionsToStore(ValueFunctions.map),
}
