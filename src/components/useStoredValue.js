import useCoreStoredValue from '../composables/useCoreStoredValue'
import useCommonValue from './useCommonValue'

export const storedValueProps = {
    uid: {
        type: String,
        required: true,
    },
}

export default function useStoredValue (props, context, { emptyValue = undefined }) {
    return useCommonValue(
        props,
        context,
        useCoreStoredValue(props.uid, { ...props, emptyValue }),
    )
}