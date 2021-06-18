import ValueFunctions from '../valueFunctions/valueFunctions'
import { useCoreSimpleVolatileValue } from './useCoreVolatileValue'
import { useCoreSimpleStoredValue } from './useCoreStoredValue'
import { bothComposableGenerator } from './composableGenerator'

export const useValue = (options = {}) => useCoreSimpleVolatileValue(undefined, options)
export const useStoredValue = (uid, options = {}) => useCoreSimpleStoredValue(uid, undefined, options)

export const { volatile: useVueValue, stored: useVueStoredValue } = bothComposableGenerator()

export const { volatile: useVueBoolean, stored: useVueStoredBoolean } = bothComposableGenerator({
    emptyValue: false,
    customMutator: ValueFunctions.boolean.mutator,
    customComputed: ValueFunctions.boolean.computed,
})

export const { volatile: useVueNumber, stored: useVueStoredNumber } = bothComposableGenerator({
    customSetter: ValueFunctions.number.setter,
    customMutator: ValueFunctions.number.mutator,
    customComputed: ValueFunctions.number.computed,
})

export const { volatile: useVueString, stored: useVueStoredString } = bothComposableGenerator({
    customMutator: ValueFunctions.string.mutator,
    customFunction: ValueFunctions.string.function,
})

export const { volatile: useVueArray, stored: useVueStoredArray } = bothComposableGenerator({
    emptyValue: [],
    customMutator: ValueFunctions.array.mutator,
    customFunction: ValueFunctions.array.function,
})

export const { volatile: useVueObject, stored: useVueStoredObject } = bothComposableGenerator({
    emptyValue: {},
    customMutator: ValueFunctions.object.mutator,
})

export const { volatile: useVueSet, stored: useVueStoredSet } = bothComposableGenerator({
    emptyValue: new Set(),
    customMutator: ValueFunctions.set.mutator,
})

export const { volatile: useVueMap, stored: useVueStoredMap } = bothComposableGenerator({
    emptyValue: new Map(),
    customMutator: ValueFunctions.map.mutator,
})
