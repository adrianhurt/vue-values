import ValueFunctions from '../valueFunctions/valueFunctions'
import { bothComponentGenerator } from './componentGenerator'
import useNumberValue, { numberProps } from './useNumberValue'
import useArrayValue from './useArrayValue'

export const { volatile: Value, stored: StoredValue } = bothComponentGenerator({
    name: 'Value',
    valueType: undefined,
    emptyValue: undefined,
})

export const { volatile: BooleanValue, stored: StoredBooleanValue } = bothComponentGenerator({
    name: 'BooleanValue',
    valueType: Boolean,
    emptyValue: undefined,
    valueFunctions: ValueFunctions.boolean,
})

export const { volatile: NumberValue, stored: StoredNumberValue } = bothComponentGenerator({
    name: 'NumberValue',
    useValueWrapperFn: useNumberValue,
    valueType: Number,
    emptyValue: undefined,
    valueFunctions: ValueFunctions.number,
    extraProps: numberProps,
})

export const { volatile: ArrayValue, stored: StoredArrayValue } = bothComponentGenerator({
    name: 'ArrayValue',
    useValueWrapperFn: useArrayValue,
    valueType: Array,
    emptyValue: [],
    valueFunctions: ValueFunctions.array,
})

export const { volatile: StringValue, stored: StoredStringValue } = bothComponentGenerator({
    name: 'StringValue',
    valueType: String,
    emptyValue: undefined,
    valueFunctions: ValueFunctions.string,
})

export const { volatile: SetValue, stored: StoredSetValue } = bothComponentGenerator({
    name: 'SetValue',
    valueType: Set,
    emptyValue: new Set(),
    valueFunctions: ValueFunctions.set,
})

export const { volatile: ObjectValue, stored: StoredObjectValue } = bothComponentGenerator({
    name: 'ObjectValue',
    valueType: Object,
    emptyValue: {},
    valueFunctions: ValueFunctions.object,
})

export const { volatile: MapValue, stored: StoredMapValue } = bothComponentGenerator({
    name: 'MapValue',
    valueType: Map,
    emptyValue: new Map(),
    valueFunctions: ValueFunctions.map,
})
