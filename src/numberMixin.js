export default {
    props: {
        min: Number,
        max: Number,
    },
    computed: {
        isFirst () {
            return this.min !== undefined && this.value === this.min
        },
        isLast () {
            return this.max !== undefined && this.value === this.max
        },
    },
    methods: {
        curateValue (newValue) {
            if (this.min !== undefined && newValue < this.min) return this.min
            if (this.max !== undefined && newValue > this.max) return this.max
            return newValue
        },
        set (newValue) {
            const curatedValue = this.curateValue(newValue)
            if (curatedValue !== this.value && !this.disabled) {
                this.value = curatedValue
            }
        },
    },
    render () {
        return this.$scopedSlots.default({
            value: this.value,
            disabled: this.disabled,
            isFirst: this.isFirst,
            isLast: this.isLast,
            ...this.scopedFunctionProps,
        })
    },
}
