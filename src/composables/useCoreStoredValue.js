/* eslint-disable import/prefer-default-export */
import { customRef } from 'vue'
import useCoreCommonValue from './useCoreCommonValue'
import Store from '../store/store'
import { firstDefined } from './utils'
import { existsFieldInObject } from '../utils'

export function useCoreSimpleStoredValue (uid, emptyValue, options = {}) {
    const initialOrDefaultValue = firstDefined(emptyValue, options, 'initialValue', 'defaultValue')
    return customRef((track, trigger) => ({
        get () {
            const v = Store.value(uid).get(initialOrDefaultValue)
            track()
            return v
        },
        set (newValue) {
            Store.value(uid).set(newValue)
            trigger()
        },
    }))
}

export default function useCoreStoredValue (uid, emptyValue, options = {}) {
    const { disabled = false } = options

    const refValue = useCoreSimpleStoredValue(uid, emptyValue, options)

    const { set, clear } = useCoreCommonValue(refValue, { disabled, emptyValue })

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
        value: refValue,
        set,
        clear,
        resetToDefault,
        resetToInitial,
        reset,
    }
}
