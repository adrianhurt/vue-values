import useCoreVolatileValue from './useCoreVolatileValue'
import useCoreStoredValue from './useCoreStoredValue'
import useCoreNumberValueFactory from './useCoreNumberValueFactory'
import useCoreArrayValue from './useCoreArrayValue'
import ValueFunctions from '../valueFunctions/valueFunctions'

function addFunctions (valueFunctions = {}) {
    return (valueArgs) => {
        const totalArgs = { ...valueArgs }
        Object.keys(valueFunctions).forEach((key) => {
            totalArgs[key] = (...args) => valueArgs.set(valueFunctions[key](valueArgs.value.value, ...args))
        })
        return totalArgs
    }
}
function combine (valueResult, ...fns) {
    return fns.reduce((result, fn) => ({ ...result, ...fn(result) }), valueResult)
}

export function useVueValue ({ initialValue, defaultValue } = {}) {
    return useCoreVolatileValue({ initialValue, defaultValue, emptyValue: undefined })
}
export function useVueStoredValue (uid, { initialValue, defaultValue } = {}) {
    return useCoreStoredValue(uid, { initialValue, defaultValue, emptyValue: undefined })
}

export function useVueBoolean ({ initialValue, defaultValue } = {}) {
    return combine(
        useCoreVolatileValue({ initialValue, defaultValue, emptyValue: undefined }),
        addFunctions(ValueFunctions.boolean),
    )
}
export function useVueStoredBoolean (uid, { initialValue, defaultValue } = {}) {
    return combine(
        useCoreStoredValue(uid, { initialValue, defaultValue, emptyValue: undefined }),
        addFunctions(ValueFunctions.boolean),
    )
}

export function useVueNumber ({ initialValue, defaultValue } = {}, props = {}) {
    return combine(
        useCoreVolatileValue({ initialValue, defaultValue, emptyValue: undefined }),
        useCoreNumberValueFactory(props),
        addFunctions(ValueFunctions.number),
    )
}
export function useVueStoredNumber (uid, { initialValue, defaultValue } = {}, props = {}) {
    return combine(
        useCoreStoredValue(uid, { initialValue, defaultValue, emptyValue: undefined }),
        useCoreNumberValueFactory(props),
        addFunctions(ValueFunctions.number),
    )
}

export function useVueArray ({ initialValue, defaultValue } = {}) {
    return combine(
        useCoreVolatileValue({ initialValue, defaultValue, emptyValue: [] }),
        useCoreArrayValue,
        addFunctions(ValueFunctions.array),
    )
}
export function useVueStoredArray (uid, { initialValue, defaultValue } = {}) {
    return combine(
        useCoreStoredValue(uid, { initialValue, defaultValue, emptyValue: [] }),
        useCoreArrayValue,
        addFunctions(ValueFunctions.array),
    )
}

export function useVueString ({ initialValue, defaultValue } = {}) {
    return combine(
        useCoreVolatileValue({ initialValue, defaultValue, emptyValue: undefined }),
        addFunctions(ValueFunctions.string),
    )
}
export function useVueStoredString (uid, { initialValue, defaultValue } = {}) {
    return combine(
        useCoreStoredValue(uid, { initialValue, defaultValue, emptyValue: undefined }),
        addFunctions(ValueFunctions.string),
    )
}

export function useVueSet ({ initialValue, defaultValue } = {}) {
    return combine(
        useCoreVolatileValue({ initialValue, defaultValue, emptyValue: new Set() }),
        addFunctions(ValueFunctions.set),
    )
}
export function useVueStoredSet (uid, { initialValue, defaultValue } = {}) {
    return combine(
        useCoreStoredValue(uid, { initialValue, defaultValue, emptyValue: new Set() }),
        addFunctions(ValueFunctions.set),
    )
}

export function useVueObject ({ initialValue, defaultValue } = {}) {
    return combine(
        useCoreVolatileValue({ initialValue, defaultValue, emptyValue: {} }),
        addFunctions(ValueFunctions.object),
    )
}
export function useVueStoredObject (uid, { initialValue, defaultValue } = {}) {
    return combine(
        useCoreStoredValue(uid, { initialValue, defaultValue, emptyValue: {} }),
        addFunctions(ValueFunctions.object),
    )
}

export function useVueMap ({ initialValue, defaultValue } = {}) {
    return combine(
        useCoreVolatileValue({ initialValue, defaultValue, emptyValue: new Map() }),
        addFunctions(ValueFunctions.map),
    )
}
export function useVueStoredMap (uid, { initialValue, defaultValue } = {}) {
    return combine(
        useCoreStoredValue(uid, { initialValue, defaultValue, emptyValue: new Map() }),
        addFunctions(ValueFunctions.map),
    )
}
