import ValueFunctions from '../valueFunctions/valueFunctions'
import { bothComponentGenerator } from './componentGenerator'

export const { volatile: Value, stored: StoredValue } = bothComponentGenerator({
    name: 'Value',
    valueType: undefined,
    emptyValue: undefined,
    customSetter: undefined,
    customMutator: {},
    customFunction: {},
    customComputed: {},
    extraProps: {},
    extraEmits: [],
})

export const { volatile: BooleanValue, stored: StoredBooleanValue } = bothComponentGenerator({
    name: 'BooleanValue',
    valueType: Boolean,
    emptyValue: false,
    customMutator: ValueFunctions.boolean.mutator,
    customComputed: ValueFunctions.boolean.computed,
})

export const { volatile: NumberValue, stored: StoredNumberValue } = bothComponentGenerator({
    name: 'NumberValue',
    valueType: Number,
    emptyValue: undefined,
    customSetter: ValueFunctions.number.setter,
    customMutator: ValueFunctions.number.mutator,
    customComputed: ValueFunctions.number.computed,
    extraProps: {
        min: Number,
        max: Number,
    },
})

export const { volatile: StringValue, stored: StoredStringValue } = bothComponentGenerator({
    name: 'StringValue',
    valueType: String,
    emptyValue: undefined,
    customMutator: ValueFunctions.string.mutator,
    customFunction: ValueFunctions.string.function,
})

export const { volatile: ArrayValue, stored: StoredArrayValue } = bothComponentGenerator({
    name: 'ArrayValue',
    valueType: Array,
    emptyValue: [],
    customMutator: ValueFunctions.array.mutator,
    customFunction: ValueFunctions.array.function,
})

export const { volatile: ObjectValue, stored: StoredObjectValue } = bothComponentGenerator({
    name: 'ObjectValue',
    valueType: Object,
    emptyValue: {},
    customMutator: ValueFunctions.object.mutator,
})

export const { volatile: SetValue, stored: StoredSetValue } = bothComponentGenerator({
    name: 'SetValue',
    valueType: Set,
    emptyValue: new Set(),
    customMutator: ValueFunctions.set.mutator,
})

export const { volatile: MapValue, stored: StoredMapValue } = bothComponentGenerator({
    name: 'MapValue',
    valueType: Map,
    emptyValue: new Map(),
    customMutator: ValueFunctions.map.mutator,
})
