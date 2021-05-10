import ValueFunctions from './valueFunctions'
import VueValuesStore from './store'
import componentGenerator from './componentGenerator'
import useValue from './useValue'
import useStoredValue, { storedValueProps } from './useStoredValue'
import useNumberValue, { numberProps } from './useNumberValue'
import useArrayValue from './useArrayValue'

export default VueValuesStore

export const Value = componentGenerator({
    name: 'Value',
    useValueFn: useValue,
    valueType: undefined,
    emptyValue: undefined,
})
export const StoredValue = componentGenerator({
    name: 'StoredValue',
    useValueFn: useStoredValue,
    valueType: undefined,
    emptyValue: undefined,
    extraProps: storedValueProps,
})

export const BooleanValue = componentGenerator({
    name: 'BooleanValue',
    useValueFn: useValue,
    valueType: Boolean,
    emptyValue: undefined,
    valueFunctions: ValueFunctions.boolean,
})
export const StoredBooleanValue = componentGenerator({
    name: 'StoredBooleanValue',
    useValueFn: useStoredValue,
    valueType: Boolean,
    emptyValue: undefined,
    valueFunctions: ValueFunctions.boolean,
    extraProps: storedValueProps,
})

export const NumberValue = componentGenerator({
    name: 'NumberValue',
    useValueFn: useNumberValue(useValue),
    valueType: Number,
    emptyValue: undefined,
    valueFunctions: ValueFunctions.number,
    extraProps: numberProps,
})
export const StoredNumberValue = componentGenerator({
    name: 'StoredNumberValue',
    useValueFn: useNumberValue(useStoredValue),
    valueType: Number,
    emptyValue: undefined,
    valueFunctions: ValueFunctions.number,
    extraProps: { ...storedValueProps, ...numberProps },
})

export const ArrayValue = componentGenerator({
    name: 'ArrayValue',
    useValueFn: useArrayValue(useValue),
    valueType: Array,
    emptyValue: [],
    valueFunctions: ValueFunctions.array,
})
export const StoredArrayValue = componentGenerator({
    name: 'StoredArrayValue',
    useValueFn: useArrayValue(useStoredValue),
    valueType: Array,
    emptyValue: [],
    valueFunctions: ValueFunctions.array,
    extraProps: storedValueProps,
})

export const StringValue = componentGenerator({
    name: 'StringValue',
    useValueFn: useValue,
    valueType: String,
    emptyValue: undefined,
    valueFunctions: ValueFunctions.string,
})
export const StoredStringValue = componentGenerator({
    name: 'StoredStringValue',
    useValueFn: useStoredValue,
    valueType: String,
    emptyValue: undefined,
    valueFunctions: ValueFunctions.string,
    extraProps: storedValueProps,
})

export const SetValue = componentGenerator({
    name: 'SetValue',
    useValueFn: useValue,
    valueType: Set,
    emptyValue: new Set(),
    valueFunctions: ValueFunctions.set,
})
export const StoredSetValue = componentGenerator({
    name: 'StoredSetValue',
    useValueFn: useStoredValue,
    valueType: Set,
    emptyValue: new Set(),
    valueFunctions: ValueFunctions.set,
    extraProps: storedValueProps,
})

export const ObjectValue = componentGenerator({
    name: 'ObjectValue',
    useValueFn: useValue,
    valueType: Object,
    emptyValue: {},
    valueFunctions: ValueFunctions.object,
})
export const StoredObjectValue = componentGenerator({
    name: 'StoredObjectValue',
    useValueFn: useStoredValue,
    valueType: Object,
    emptyValue: {},
    valueFunctions: ValueFunctions.object,
    extraProps: storedValueProps,
})

export const MapValue = componentGenerator({
    name: 'MapValue',
    useValueFn: useValue,
    valueType: Map,
    emptyValue: new Map(),
    valueFunctions: ValueFunctions.map,
})
export const StoredMapValue = componentGenerator({
    name: 'StoredMapValue',
    useValueFn: useStoredValue,
    valueType: Map,
    emptyValue: new Map(),
    valueFunctions: ValueFunctions.map,
    extraProps: storedValueProps,
})
