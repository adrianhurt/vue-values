import { watch } from 'vue'

export function propsForValueType (valueType) {
    return {
        defaultValue: {
            type: valueType,
        },
        initialValue: {
            type: valueType,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    }
}
export const emits = ['change']

export default function useCommonValue (props, context, {
    value,
    set,
    clear,
    resetToDefault,
    resetToInitial,
    reset,
}) {
    watch(() => value.value, (newValue, oldValue) => {
        context.emit('change', newValue, oldValue)
    })

    return {
        reactives: { value },
        functions: { set, clear },
        scopedProps: {
            disabled: props.disabled,
            set,
            clear,
            resetToDefault,
            resetToInitial,
            reset,
        },
    }
}
