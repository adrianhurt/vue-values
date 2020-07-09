import commonValueMixin, { firstDefined } from './commonValueMixin'

export default (valueType, emptyValue = undefined, functionsDeclarations = {}) => ({
    mixins: [commonValueMixin(valueType, emptyValue, functionsDeclarations)],
    data () {
        return {
            value: firstDefined(this.initialValue, this.defaultValue, emptyValue),
        }
    },
    methods: {
        resetToDefault () {
            this.set(firstDefined(this.defaultValue, emptyValue))
        },
        resetToInitial () {
            this.set(firstDefined(this.initialValue, emptyValue))
        },
        reset () {
            this.set(firstDefined(this.defaultValue, this.initialValue, emptyValue))
        },
    },
})
