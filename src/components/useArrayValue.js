import useCoreArrayValue from '../composables/useCoreArrayValue'

export default function useArrayValue (useValueFn) {
    return function useValue (props, context, { emptyValue = undefined }) {
        const { reactives, functions, scopedProps } = useValueFn(props, context, { emptyValue })
        const { value: reactiveValue } = reactives

        const { first, last } = useCoreArrayValue({ value: reactiveValue })

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
