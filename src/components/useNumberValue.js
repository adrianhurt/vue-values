import useCoreNumberValueFactory from '../composables/useCoreNumberValueFactory'

export const numberProps = {
    min: Number,
    max: Number,
}

export default function useNumberValue (useValueFn) {
    return function useValue (props, context, { emptyValue = undefined }) {
        const { reactives, functions, scopedProps } = useValueFn(props, context, { emptyValue })
        const { value } = reactives

        const { set, isFirst, isLast } = useCoreNumberValueFactory(props)({ value, set: functions.set })

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
