/* eslint-disable import/prefer-default-export */
import { reactive } from 'vue'
import useCoreCommonValue from './useCoreCommonValue'
import { firstDefined } from './utils'

export default function useCoreVolatileValue (options = {}) {
    const { disabled = false, emptyValue } = options

    const defaultValue = firstDefined(options, 'defaultValue', 'emptyValue')
    const initialValue = firstDefined(options, 'initialValue', 'emptyValue')
    const defaultOrInitialValue = firstDefined(options, 'defaultValue', 'initialValue', 'emptyValue')
    const initialOrDefaultValue = firstDefined(options, 'initialValue', 'defaultValue', 'emptyValue')

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
