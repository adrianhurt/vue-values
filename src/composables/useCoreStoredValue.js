/* eslint-disable import/prefer-default-export */
import { computed } from 'vue'
import useCoreCommonValue from './useCoreCommonValue'
import Store from '../store/store'
import { firstDefined } from './utils'
import { existsFieldInObject } from '../utils'

export default function useCoreStoredValue (uid, emptyValue, options = {}) {
    const { disabled = false } = options

    const initialOrDefaultValue = firstDefined(emptyValue, options, 'initialValue', 'defaultValue')

    const reactiveValue = computed({
        get: () => Store.value(uid).get(initialOrDefaultValue),
        set: (newValue) => Store.value(uid).set(newValue),
    })

    const { set, clear } = useCoreCommonValue(reactiveValue, { disabled, emptyValue })

    const resetToDefault = () => {
        if (existsFieldInObject(options, 'defaultValue')) {
            set(options.defaultValue)
        } else {
            Store.value(uid).resetToDefault(emptyValue)
        }
    }
    const resetToInitial = () => {
        if (existsFieldInObject(options, 'initialValue')) {
            set(options.initialValue)
        } else {
            Store.value(uid).resetToInitial(emptyValue)
        }
    }
    const reset = () => {
        if (existsFieldInObject(options, 'defaultValue')) {
            set(options.defaultValue)
        } else if (existsFieldInObject(options, 'initialValue')) {
            set(options.initialValue)
        } else {
            Store.value(uid).reset(emptyValue)
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
