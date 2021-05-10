import { propsForValueType, emits } from './useCommonValue'

export default function componentGenerator ({
    name,
    useValueFn,
    valueType,
    emptyValue = undefined,
    valueFunctions = {},
    extraProps = {},
    extraEmits = [],
}) {
    return {
        name,
        props: {
            ...propsForValueType(valueType),
            ...extraProps,
        },
        emits: [...emits, ...extraEmits],
        setup (props, context) {
            const { reactives, functions: { set }, scopedProps } = useValueFn(props, context, { emptyValue })
            const { value } = reactives

            const scopedValueFunctions = {}
            Object.keys(valueFunctions).forEach((key) => {
                scopedValueFunctions[key] = (...args) => set(valueFunctions[key](value.value, ...args))
            })

            return () => {
                const scoped = { ...scopedProps, ...scopedValueFunctions }
                Object.keys(reactives).forEach((key) => {
                    scoped[key] = reactives[key].value
                })
                return context.slots.default(scoped)
            }
        },
    }
}
