import { computed } from 'vue'

export default function useCoreArrayValue ({ value }) {
    const first = computed(() => value.value[0])
    const last = computed(() => value.value[value.value.length - 1])

    return { first, last }
}
