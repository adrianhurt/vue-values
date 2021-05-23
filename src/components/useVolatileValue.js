import useCoreVolatileValue from '../composables/useCoreVolatileValue'
import useCommonValue from './useCommonValue'

export default function useVolatileValue (props, context, { emptyValue = undefined }) {
    return useCommonValue(
        props,
        context,
        useCoreVolatileValue({ ...props, emptyValue }),
    )
}
