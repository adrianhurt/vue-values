import useCoreNumberValueFactory from './useCoreNumberValueFactory'
import useCoreArrayValueFactory from './useCoreArrayValueFactory'
import ValueFunctions from '../valueFunctions/valueFunctions'
import { bothComposableGenerator } from './composableGenerator'

export const { volatile: useVueValue, stored: useVueStoredValue } = bothComposableGenerator()

export const { volatile: useVueBoolean, stored: useVueStoredBoolean } = bothComposableGenerator({
    emptyValue: false,
    valueFunctions: ValueFunctions.boolean,
})

export const { volatile: useVueNumber, stored: useVueStoredNumber } = bothComposableGenerator({
    useValueFns: [useCoreNumberValueFactory],
    valueFunctions: ValueFunctions.number,
})

export const { volatile: useVueArray, stored: useVueStoredArray } = bothComposableGenerator({
    useValueFns: [useCoreArrayValueFactory],
    emptyValue: [],
    valueFunctions: ValueFunctions.array,
})

export const { volatile: useVueString, stored: useVueStoredString } = bothComposableGenerator({
    valueFunctions: ValueFunctions.string,
})

export const { volatile: useVueSet, stored: useVueStoredSet } = bothComposableGenerator({
    emptyValue: new Set(),
    valueFunctions: ValueFunctions.set,
})

export const { volatile: useVueObject, stored: useVueStoredObject } = bothComposableGenerator({
    emptyValue: {},
    valueFunctions: ValueFunctions.object,
})

export const { volatile: useVueMap, stored: useVueStoredMap } = bothComposableGenerator({
    emptyValue: new Map(),
    valueFunctions: ValueFunctions.map,
})
