import commonValueMixin from './commonValueMixin'

export default (valueType, emptyValue = undefined, functionsDeclarations = {}) => ({
    mixins: [commonValueMixin(valueType, emptyValue, functionsDeclarations)],
    data () {
        return {
            value: this.cascadeOr(this.initialValue, this.defaultValue, emptyValue),
        }
    },
    methods: {
        resetToDefault () {
            this.set(this.cascadeOr(this.defaultValue, emptyValue))
        },
        resetToInitial () {
            this.set(this.cascadeOr(this.initialValue, emptyValue))
        },
        reset () {
            this.set(this.cascadeOr(this.defaultValue, this.initialValue, emptyValue))
        },
    },
})
