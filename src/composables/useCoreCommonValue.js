export default function useCoreCommonValue (reactiveValue, { disabled = false, emptyValue } = {}) {
    const set = (newValue) => {
        if (newValue !== reactiveValue.value && !disabled) {
            // eslint-disable-next-line no-param-reassign
            reactiveValue.value = newValue
        }
        return newValue
    }
    const clear = () => set(emptyValue)

    return { set, clear }
}
