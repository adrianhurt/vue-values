export default (valueType, emptyValue = undefined, functionsDeclarations = {}) => ({
    props: {
        defaultValue: {
            type: valueType,
            default: undefined,
        },
        initialValue: {
            type: valueType,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        value (newValue, oldValue) {
            this.$emit('change', newValue, oldValue)
        },
    },
    created () {
        this.scopedFunctionProps = {
            set: this.set,
            clear: this.clear,
            resetToDefault: this.resetToDefault,
            resetToInitial: this.resetToInitial,
            reset: this.reset,
        }
        Object.keys(functionsDeclarations).forEach((key) => {
            this.scopedFunctionProps[key] = (...args) => this.set(functionsDeclarations[key](this.value, ...args))
        })
    },
    methods: {
        set (newValue) {
            if (newValue !== this.value && !this.disabled) {
                this.value = newValue
            }
            return newValue
        },
        clear () {
            this.set(emptyValue)
        },
        resetToDefault () {
            throw new Error('commonValueMixin: you must implement method "resetToDefault"')
        },
        resetToInitial () {
            throw new Error('commonValueMixin: you must implement method "resetToInitial"')
        },
        reset () {
            throw new Error('commonValueMixin: you must implement method "reset"')
        },
        cascadeOr (...vals) {
            return vals.find((v) => v !== undefined)
        },
    },
    render () {
        return this.$scopedSlots.default({
            value: this.value,
            disabled: this.disabled,
            ...this.scopedFunctionProps,
        })
    },
})
