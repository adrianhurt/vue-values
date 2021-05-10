import { computed } from 'vue'

export const numberProps = {
    min: Number,
    max: Number,
}

export default function useNumberValue (useValueFn) {
    return function useValue (props, context, { emptyValue = undefined }) {
        const { reactives, functions, scopedProps } = useValueFn(props, context, { emptyValue })
        const { value } = reactives

        const curateValue = (newValue) => {
            if (props.min !== undefined && newValue < props.min) return props.min
            if (props.max !== undefined && newValue > props.max) return props.max
            return newValue
        }

        const set = (newValue) => functions.set(curateValue(newValue))
        const isFirst = computed(() => {
            const val = value.value
            return props.min !== undefined && val === props.min
        })
        const isLast = computed(() => props.max !== undefined && value.value === props.max)

        return {
            reactives: {
                value,
                isFirst,
                isLast,
            },
            functions: {
                ...functions,
                set,
            },
            scopedProps: {
                ...scopedProps,
                set,
            },
        }
    }
}
