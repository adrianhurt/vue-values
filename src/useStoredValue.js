import { computed } from 'vue'
import VueValuesStore from './store'
import useCommonValue from './useCommonValue'
import { firstDefined } from './utils'

export const storedValueProps = {
    uid: {
        type: String,
        required: true,
    },
}

export default function useValue (props, context, { emptyValue = undefined }) {
    const reactiveValue = computed({
        get: () => VueValuesStore.value(props.uid).get(firstDefined(props.initialValue, props.defaultValue, emptyValue)),
        set: (newValue) => VueValuesStore.value(props.uid).set(newValue),
    })

    const { functions, scopedProps } = useCommonValue(props, context, { reactiveValue }, { emptyValue })

    const { set } = functions
    const resetToDefault = () => {
        if (props.defaultValue !== undefined) {
            set(props.defaultValue)
        } else {
            VueValuesStore.value(props.uid).resetToDefault()
        }
    }
    const resetToInitial = () => {
        if (props.initialValue !== undefined) {
            set(props.initialValue)
        } else {
            VueValuesStore.value(props.uid).resetToInitial()
        }
    }
    const reset = () => {
        const value = firstDefined(props.defaultValue, props.initialValue)
        if (value !== undefined) {
            set(value)
        } else {
            VueValuesStore.value(props.uid).reset()
        }
    }

    return {
        reactives: {
            value: reactiveValue,
        },
        functions,
        scopedProps: {
            ...scopedProps,
            resetToDefault,
            resetToInitial,
            reset,
        },
    }
}
