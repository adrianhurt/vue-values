/**
 * For each type of value we have:
 * - setter: (options) => newValue => newCuratedValue
 * - mutator: (value, options) => (...args) => newValue
 * - function: (value, options) => (...args) => anotherValue
 * - computed: (value, options) => computedValue
 */

export default {
    boolean: {
        mutator: {
            toggle: (bool) => () => !bool,
        },
        computed: {
            negative: (bool) => () => !bool,
        },
    },
    number: {
        setter: ({ min = -Infinity, max = Infinity } = {}) => (newVal) => Math.max(min, Math.min(max, newVal)),
        mutator: {
            increment: (num, { max = Infinity } = {}) => (delta = 1, m = Infinity) => Math.min(max, m, num + delta),
            decrement: (num, { min = -Infinity } = {}) => (delta = 1, m = -Infinity) => Math.max(min, m, num - delta),
        },
        computed: {
            isFirst: (num, { min = -Infinity } = {}) => num === min,
            isLast: (num, { max = -Infinity } = {}) => num === max,
        },
    },
    string: {
        mutator: {
            append: (string) => (str) => string + str,
            prepend: (string) => (str) => str + string,
            insert: (string) => (index, str) => string.slice(0, index) + str + string.slice(index),
            replace: (string) => (...args) => string.replace(...args),
            substring: (string) => (...args) => string.substring(...args),
        },
        function: {
            substring: (string) => (...args) => string.substring(...args),
        },
    },
    array: {
        mutator: {
            first: (array) => () => array[0],
            last: (array) => () => array[array.length - 1],
            append: (array) => (...items) => array.concat(...items),
            prepend: (array) => (...items) => [...items, ...array],
            insert: (array) => (index, ...items) => [...array.slice(0, index), ...items, ...array.slice(index)],
            removeFirst: (array) => () => array.slice(1),
            removeLast: (array) => () => array.slice(0, -1),
            removeIndex: (array) => (index) => array.filter((_, i) => i !== index),
            remove: (array) => (...items) => array.filter((i) => !items.includes(i)),
            splice: (array) => (...args) => {
                const copy = [...array]
                copy.splice(...args)
                return copy
            },
            reverse: (array) => () => [...array].reverse(),
            sort: (array) => (comparator) => [...array].sort(comparator),
        },
        function: {
            first: (array) => () => array[0],
            last: (array) => () => array[array.length - 1],
            slice: (array) => (...args) => array.slice(...args),
        },
    },
    object: {
        mutator: {
            setValue: (obj) => (key, value) => ({ ...obj, [key]: value }),
            setValues: (obj) => (other) => ({ ...obj, ...other }),
            remove: (obj) => (...keys) => {
                const copy = { ...obj }
                keys.forEach((key) => (delete copy[key]))
                return copy
            },
        },
    },
    set: {
        mutator: {
            add: (set) => (...items) => (new Set([...set, ...items])),
            remove: (set) => (...items) => {
                const copy = new Set([...set])
                items.forEach((item) => (copy.delete(item)))
                return copy
            },
            toggle: (set) => (...items) => {
                const copy = new Set([...set])
                items.forEach((item) => {
                    if (copy.has(item)) {
                        copy.delete(item)
                    } else {
                        copy.add(item)
                    }
                })
                return copy
            },
        },
    },
    map: {
        mutator: {
            setValue: (map) => (key, value) => {
                const copy = new Map(map)
                copy.set(key, value)
                return copy
            },
            setValues: (map) => (keysAndvalues) => {
                const copy = new Map(map)
                keysAndvalues.forEach(([key, value]) => (copy.set(key, value)))
                return copy
            },
            remove: (map) => (...keys) => {
                const copy = new Map(map)
                keys.forEach((key) => (copy.delete(key)))
                return copy
            },
        },
    },
}
