import { watch } from 'vue'
import { volatileComposableGenerator, storedComposableGenerator } from '../composables/composableGenerator'

export function singleComponentGenerator ({
    name,
    useValueFn,
    valueType,
    customComputed = {},
    extraProps = {},
    extraEmits = [],
}) {
    return {
        name,
        props: {
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
            ...extraProps,
        },
        emits: [
            'change',
            ...extraEmits,
        ],
        setup (props, context) {
            const valueArgs = useValueFn(props)
            const { value, ...valueFunctionsOrComputed } = valueArgs

            watch(() => value.value, (newValue, oldValue) => {
                context.emit('change', newValue, oldValue)
            })

            return () => {
                const scoped = { value: value.value }
                Object.keys(valueFunctionsOrComputed).forEach((key) => {
                    if (customComputed[key]) {
                        scoped[key] = valueFunctionsOrComputed[key].value
                    } else {
                        scoped[key] = valueFunctionsOrComputed[key]
                    }
                })
                return context.slots.default(scoped)
            }
        },
    }
}
export function volatileComponentGenerator (componentOptions) {
    const useValueFn = volatileComposableGenerator(componentOptions)
    return singleComponentGenerator({
        useValueFn,
        ...componentOptions,
    })
}
export function storedComponentGenerator (componentOptions) {
    const useValueFn = storedComposableGenerator(componentOptions)
    return singleComponentGenerator({
        useValueFn: (props) => useValueFn(props.uid, props),
        ...componentOptions,
        extraProps: {
            ...(componentOptions.extraProps || {}),
            uid: {
                type: String,
                required: true,
            },
        },
    })
}

export function bothComponentGenerator (componentOptions) {
    const volatile = volatileComponentGenerator(componentOptions)
    const stored = storedComponentGenerator({ name: `Stored${componentOptions.name}`, ...componentOptions })
    return { volatile, stored }
}
