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
        get: () => VueValuesStore.value.get(props.uid, firstDefined(props.initialValue, props.defaultValue, emptyValue)),
        set: (newValue) => VueValuesStore.value.set(props.uid, newValue),
    })

    const { functions, scopedProps } = useCommonValue(props, context, { reactiveValue }, { emptyValue })

    const { set } = functions
    const resetToDefault = () => {
        if (props.defaultValue !== undefined) {
            set(props.defaultValue)
        } else {
            VueValuesStore.value.resetToDefault(props.uid)
        }
    }
    const resetToInitial = () => {
        if (props.initialValue !== undefined) {
            set(props.initialValue)
        } else {
            VueValuesStore.value.resetToInitial(props.uid)
        }
    }
    const reset = () => {
        const value = firstDefined(props.defaultValue, props.initialValue)
        if (value !== undefined) {
            set(value)
        } else {
            VueValuesStore.value.reset(props.uid)
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
