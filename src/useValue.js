import { reactive } from 'vue'
import useCommonValue from './useCommonValue'
import { firstDefined } from './utils'

export default function useValue (props, context, { emptyValue = undefined }) {
    const reactiveValue = reactive({
        value: firstDefined(props.initialValue, props.defaultValue, emptyValue),
    })

    const { functions, scopedProps } = useCommonValue(props, context, { reactiveValue }, { emptyValue })

    const { set } = functions
    const resetToDefault = () => set(firstDefined(props.defaultValue, emptyValue))
    const resetToInitial = () => set(firstDefined(props.initialValue, emptyValue))
    const reset = () => set(firstDefined(props.defaultValue, props.initialValue, emptyValue))

    return {
        reactives: {
            value: reactiveValue,
        },
        functions,
        scopedProps: {
            ...scopedProps,
            resetToDefault,
            resetToInitial,
            reset,
        },
    }
}
