import { watch } from 'vue'

export function propsForValueType (valueType) {
    return {
        defaultValue: {
            type: valueType,
            default: undefined,
        },
        initialValue: {
            type: valueType,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    }
}
export const emits = ['change']

export default function useCommonValue (props, context, { reactiveValue }, { emptyValue = undefined }) {
    const set = (newValue) => {
        if (newValue !== reactiveValue.value && !props.disabled) {
            // eslint-disable-next-line no-param-reassign
            reactiveValue.value = newValue
        }
        return newValue
    }
    const clear = () => set(emptyValue)

    watch(() => reactiveValue.value, (newValue, oldValue) => {
        context.emit('change', newValue, oldValue)
    })

    return {
        functions: {
            set,
            clear,
        },
        scopedProps: {
            disabled: props.disabled,
            set,
            clear,
        },
    }
}
