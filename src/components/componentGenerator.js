import { propsForValueType, emits } from './useCommonValue'
import useVolatileValue from './useVolatileValue'
import useStoredValue, { storedValueProps } from './useStoredValue'

export function singleComponentGenerator ({
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

export function bothComponentGenerator ({
    name,
    useValueWrapperFn,
    valueType,
    emptyValue = undefined,
    valueFunctions = {},
    extraProps = {},
    extraEmits = [],
}) {
    const volatile = singleComponentGenerator({
        name,
        useValueFn: useValueWrapperFn ? useValueWrapperFn(useVolatileValue) : useVolatileValue,
        valueType,
        emptyValue,
        valueFunctions,
        extraProps,
        extraEmits,
    })
    const stored = singleComponentGenerator({
        name: `Stored${name}`,
        useValueFn: useValueWrapperFn ? useValueWrapperFn(useStoredValue) : useStoredValue,
        valueType,
        emptyValue,
        valueFunctions,
        extraProps: { ...storedValueProps, ...extraProps },
        extraEmits,
    })
    return { volatile, stored }
}
