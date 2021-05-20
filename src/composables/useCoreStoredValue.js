/* eslint-disable import/prefer-default-export */
import { computed } from 'vue'
import useCoreCommonValue from './useCoreCommonValue'
import VueValuesStore from '../store/store'
import { firstDefined } from '../utils'

export default function useCoreStoredValue (uid, {
    initialValue, defaultValue, reactiveDisabled = false, emptyValue,
} = {}) {
    const reactiveValue = computed({
        get: () => VueValuesStore.value(uid).get(firstDefined(initialValue, defaultValue, emptyValue)),
        set: (newValue) => VueValuesStore.value(uid).set(newValue),
    })

    const { set, clear } = useCoreCommonValue(reactiveValue, { reactiveDisabled, emptyValue })

    const resetToDefault = () => {
        if (defaultValue !== undefined) {
            set(defaultValue)
        } else {
            VueValuesStore.value(uid).resetToDefault()
        }
    }
    const resetToInitial = () => {
        if (initialValue !== undefined) {
            set(initialValue)
        } else {
            VueValuesStore.value(uid).resetToInitial()
        }
    }
    const reset = () => {
        const value = firstDefined(defaultValue, initialValue)
        if (value !== undefined) {
            set(value)
        } else {
            VueValuesStore.value(uid).reset()
        }
    }

    return {
        value: reactiveValue,
        set,
        clear,
        resetToDefault,
        resetToInitial,
        reset,
    }
}
