import useCoreArrayValueFactory from '../composables/useCoreArrayValueFactory'

export default function useArrayValue (useValueFn) {
    return function useValue (props, context, { emptyValue = undefined }) {
        const { reactives, functions, scopedProps } = useValueFn(props, context, { emptyValue })
        const { value: reactiveValue } = reactives

        const { first, last } = useCoreArrayValueFactory()({ value: reactiveValue })

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
