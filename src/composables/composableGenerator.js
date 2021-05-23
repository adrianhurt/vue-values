/* eslint-disable import/prefer-default-export */
import useCoreVolatileValue from './useCoreVolatileValue'
import useCoreStoredValue from './useCoreStoredValue'

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

export function bothComposableGenerator ({
    useValueFns,
    emptyValue = undefined,
    valueFunctions = {},
} = {}) {
    const volatile = (options = {}) => combine(
        useCoreVolatileValue({ ...options, emptyValue }),
        ...useValueFns.map((fn) => fn(options)),
        addFunctions(valueFunctions),
    )
    const stored = (uid, options = {}) => combine(
        useCoreStoredValue(uid, { ...options, emptyValue }),
        ...useValueFns.map((fn) => fn(options)),
        addFunctions(valueFunctions),
    )
    return { volatile, stored }
}
