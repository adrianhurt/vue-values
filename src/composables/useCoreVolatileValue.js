/* eslint-disable import/prefer-default-export */
import { reactive } from 'vue'
import useCoreCommonValue from './useCoreCommonValue'
import { firstDefined } from '../utils'

export default function useCoreVolatileValue ({
    initialValue, defaultValue, reactiveDisabled = false, emptyValue,
} = {}) {
    const reactiveValue = reactive({
        value: firstDefined(initialValue, defaultValue, emptyValue),
    })

    const { set, clear } = useCoreCommonValue(reactiveValue, { reactiveDisabled, emptyValue })

    const resetToDefault = () => set(firstDefined(defaultValue, emptyValue))
    const resetToInitial = () => set(firstDefined(initialValue, emptyValue))
    const reset = () => set(firstDefined(defaultValue, initialValue, emptyValue))

    return {
        value: reactiveValue,
        set,
        clear,
        resetToDefault,
        resetToInitial,
        reset,
    }
}
