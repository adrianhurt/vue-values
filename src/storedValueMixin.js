import commonValueMixin from './commonValueMixin'
import VueValuesStore from './store'

export default (valueType, emptyValue = undefined, functionsDeclarations = {}) => ({
    mixins: [commonValueMixin(valueType, emptyValue, functionsDeclarations)],
    props: {
        uid: {
            type: String,
            required: true,
        },
    },
    computed: {
        value: {
            get () {
                return VueValuesStore.value.get(this.uid, this.cascadeOr(this.initialValue, this.defaultValue, emptyValue))
            },
            set (newValue) {
                VueValuesStore.value.set(this.uid, newValue)
            },
        },
    },
    methods: {
        resetToDefault () {
            if (this.defaultValue !== undefined) {
                this.set(this.defaultValue)
            } else {
                VueValuesStore.value.resetToDefault(this.uid)
            }
        },
        resetToInitial () {
            if (this.initialValue !== undefined) {
                this.set(this.initialValue)
            } else {
                VueValuesStore.value.resetToInitial(this.uid)
            }
        },
        reset () {
            const value = this.cascadeOr(this.defaultValue, this.initialValue)
            if (value !== undefined) {
                this.set(value)
            } else {
                VueValuesStore.value.reset(this.uid)
            }
        },
    },
})
