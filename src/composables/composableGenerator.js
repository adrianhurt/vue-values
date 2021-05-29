import { computed } from 'vue'
import useCoreVolatileValue from './useCoreVolatileValue'
import useCoreStoredValue from './useCoreStoredValue'

function customize ({
    useCoreValueFn,
    options = {},
    emptyValue = undefined,
    customSetter = undefined,
    customMutator = {},
    customFunction = {},
    customComputed = {},
}) {
    const valueArgs = useCoreValueFn(emptyValue, options)
    if (customSetter) {
        const { set: originalSet } = valueArgs
        valueArgs.set = (newValue) => originalSet(customSetter(options)(newValue))
    }
    Object.keys(customFunction).forEach((key) => {
        valueArgs[key] = (...args) => customFunction[key](valueArgs.value.value, options)(...args)
    })
    Object.keys(customMutator).forEach((key) => {
        valueArgs[key] = (...args) => valueArgs.set(customMutator[key](valueArgs.value.value, options)(...args))
    })
    Object.keys(customComputed).forEach((key) => {
        valueArgs[key] = computed(() => customComputed[key](valueArgs.value.value, options))
    })
    return valueArgs
}

export function volatileComposableGenerator (composableOptions = {}) {
    return (options = {}) => customize({ useCoreValueFn: useCoreVolatileValue, options, ...composableOptions })
}
export function storedComposableGenerator (composableOptions = {}) {
    return (uid, options = {}) => customize({ useCoreValueFn: (...args) => useCoreStoredValue(uid, ...args), options, ...composableOptions })
}

export function bothComposableGenerator (composableOptions = {}) {
    return {
        volatile: volatileComposableGenerator(composableOptions),
        stored: storedComposableGenerator(composableOptions),
    }
}
