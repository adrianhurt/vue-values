/* eslint-disable import/prefer-default-export */
import { reactive } from 'vue'
import useCoreCommonValue from './useCoreCommonValue'
import { firstDefined } from './utils'

export default function useCoreVolatileValue (emptyValue, options = {}) {
    const { disabled = false } = options

    const defaultValue = firstDefined(emptyValue, options, 'defaultValue')
    const initialValue = firstDefined(emptyValue, options, 'initialValue')
    const defaultOrInitialValue = firstDefined(emptyValue, options, 'defaultValue', 'initialValue')
    const initialOrDefaultValue = firstDefined(emptyValue, options, 'initialValue', 'defaultValue')

    const reactiveValue = reactive({
        value: initialOrDefaultValue,
    })

    const { set, clear } = useCoreCommonValue(reactiveValue, { disabled, emptyValue })

    return {
        value: reactiveValue,
        set,
        clear,
        resetToDefault: () => set(defaultValue),
        resetToInitial: () => set(initialValue),
        reset: () => set(defaultOrInitialValue),
    }
}
