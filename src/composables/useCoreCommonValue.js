export default function useCoreCommonValue (reactiveValue, { reactiveDisabled = false, emptyValue } = {}) {
    const set = (newValue) => {
        if (newValue !== reactiveValue.value && !reactiveDisabled) {
            // eslint-disable-next-line no-param-reassign
            reactiveValue.value = newValue
        }
        return newValue
    }
    const clear = () => set(emptyValue)

    return { set, clear }
}
