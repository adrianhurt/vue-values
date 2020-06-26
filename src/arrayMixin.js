export default {
    computed: {
        first () {
            return this.value[0]
        },
        last () {
            return this.value[this.value.length - 1]
        },
    },
    render () {
        return this.$scopedSlots.default({
            value: this.value,
            disabled: this.disabled,
            first: this.first,
            last: this.last,
            ...this.scopedFunctionProps,
        })
    },
}
