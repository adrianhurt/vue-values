export default function useCoreCommonValue (refValue, { disabled = false, emptyValue } = {}) {
    const set = (newValue) => {
        if (newValue !== refValue.value && !disabled) {
            // eslint-disable-next-line no-param-reassign
            refValue.value = newValue
        }
        return newValue
    }
    const clear = () => set(emptyValue)

    return { set, clear }
}
