import { computed } from 'vue'

export default function useCoreNumberValueFactory (props = {}) {
    return ({ value, set: setValue }) => {
        const curateValue = (newValue) => {
            if (props.min !== undefined && newValue < props.min) return props.min
            if (props.max !== undefined && newValue > props.max) return props.max
            return newValue
        }

        const set = (newValue) => setValue(curateValue(newValue))

        const isFirst = computed(() => {
            const val = value.value
            return props.min !== undefined && val === props.min
        })
        const isLast = computed(() => props.max !== undefined && value.value === props.max)

        return { set, isFirst, isLast }
    }
}
