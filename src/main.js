import valueMixin from './valueMixin'
import storedValueMixin from './storedValueMixin'
import numberMixin from './numberMixin'
import arrayMixin from './arrayMixin'
import ValueFunctions from './valueFunctions'
import VueValuesStore from './store'

export default VueValuesStore

function componentGenerator (name, mixins) {
    return {
        name,
        mixins,
    }
}

export const Value = componentGenerator('Value', [valueMixin()])
export const StoredValue = componentGenerator('StoredValue', [storedValueMixin()])

export const BooleanValue = componentGenerator('BooleanValue', [valueMixin(Boolean, undefined, ValueFunctions.boolean)])
export const StoredBooleanValue = componentGenerator('StoredBooleanValue', [storedValueMixin(Boolean, undefined, ValueFunctions.boolean)])

export const NumberValue = componentGenerator('NumberValue', [valueMixin(Number, undefined, ValueFunctions.number), numberMixin])
export const StoredNumberValue = componentGenerator('StoredNumberValue', [storedValueMixin(Number, undefined, ValueFunctions.number), numberMixin])

export const StringValue = componentGenerator('StringValue', [valueMixin(String, undefined, ValueFunctions.string)])
export const StoredStringValue = componentGenerator('StoredStringValue', [storedValueMixin(String, undefined, ValueFunctions.string)])

export const ArrayValue = componentGenerator('ArrayValue', [valueMixin(Array, [], ValueFunctions.array), arrayMixin])
export const StoredArrayValue = componentGenerator('StoredArrayValue', [storedValueMixin(Array, [], ValueFunctions.array), arrayMixin])

export const SetValue = componentGenerator('SetValue', [valueMixin(Set, new Set(), ValueFunctions.set)])
export const StoredSetValue = componentGenerator('StoredSetValue', [storedValueMixin(Set, new Set(), ValueFunctions.set)])

export const ObjectValue = componentGenerator('ObjectValue', [valueMixin(Object, {}, ValueFunctions.object)])
export const StoredObjectValue = componentGenerator('StoredObjectValue', [storedValueMixin(Object, {}, ValueFunctions.object)])

export const MapValue = componentGenerator('MapValue', [valueMixin(Map, new Map(), ValueFunctions.map)])
export const StoredMapValue = componentGenerator('StoredMapValue', [storedValueMixin(Map, new Map(), ValueFunctions.map)])
