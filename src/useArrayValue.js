import { computed } from 'vue'

export default function useArrayValue (useValueFn) {
    return function useValue (props, context, { emptyValue = undefined }) {
        const { reactives, functions, scopedProps } = useValueFn(props, context, { emptyValue })
        const { value: reactiveValue } = reactives

        const first = computed(() => reactiveValue.value[0])
        const last = computed(() => reactiveValue.value[reactiveValue.value.length - 1])

        return {
            reactives: {
                value: reactiveValue,
                first,
                last,
            },
            functions,
            scopedProps,
        }
    }
}
