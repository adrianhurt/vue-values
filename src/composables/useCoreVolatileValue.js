/* eslint-disable import/prefer-default-export */
import { ref } from 'vue'
import useCoreCommonValue from './useCoreCommonValue'
import { firstDefined } from './utils'

export function useCoreSimpleVolatileValue (emptyValue, options = {}) {
    const initialOrDefaultValue = firstDefined(emptyValue, options, 'initialValue', 'defaultValue')
    return ref(initialOrDefaultValue)
}

export default function useCoreVolatileValue (emptyValue, options = {}) {
    const { disabled = false } = options

    const defaultValue = firstDefined(emptyValue, options, 'defaultValue')
    const initialValue = firstDefined(emptyValue, options, 'initialValue')
    const defaultOrInitialValue = firstDefined(emptyValue, options, 'defaultValue', 'initialValue')

    const refValue = useCoreSimpleVolatileValue(emptyValue, options)

    const { set, clear } = useCoreCommonValue(refValue, { disabled, emptyValue })

    return {
        value: refValue,
        set,
        clear,
        resetToDefault: () => set(defaultValue),
        resetToInitial: () => set(initialValue),
        reset: () => set(defaultOrInitialValue),
    }
}
