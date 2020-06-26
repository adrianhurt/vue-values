import ValueFunctions from '../valueFunctions'

describe('valueFunctions', () => {
    it('boolean.toggle', () => {
        const boolFalse = false
        const shouldBeTrue = ValueFunctions.boolean.toggle(boolFalse)
        expect(shouldBeTrue).toBe(true)
        expect(shouldBeTrue).not.toBe(boolFalse)
        expect(ValueFunctions.boolean.toggle(true)).toBe(false)
    })

    it('number.increment', () => {
        const num = 1
        const shouldBe2 = ValueFunctions.number.increment(num)
        expect(shouldBe2).toBe(2)
        expect(shouldBe2).not.toBe(num)
        expect(ValueFunctions.number.increment(num, 2)).toBe(3)
        expect(ValueFunctions.number.increment(num, -2)).toBe(-1)
    })
    it('number.decrement', () => {
        const num = 1
        const shouldBe0 = ValueFunctions.number.decrement(num)
        expect(shouldBe0).toBe(0)
        expect(shouldBe0).not.toBe(num)
        expect(ValueFunctions.number.decrement(num, 2)).toBe(-1)
        expect(ValueFunctions.number.decrement(num, -2)).toBe(3)
    })

    it('string.append', () => {
        const str = 'foo'
        const shouldBeFoobar = ValueFunctions.string.append(str, 'bar')
        expect(shouldBeFoobar).toBe('foobar')
        expect(shouldBeFoobar).not.toBe(str)
        expect(ValueFunctions.string.append(str, '.1p😃')).toBe('foo.1p😃')
        expect(ValueFunctions.string.append(str, '')).toBe('foo')
    })
    it('string.prepend', () => {
        const str = 'foo'
        const shouldBeBarfoo = ValueFunctions.string.prepend(str, 'bar')
        expect(shouldBeBarfoo).toBe('barfoo')
        expect(shouldBeBarfoo).not.toBe(str)
        expect(ValueFunctions.string.prepend(str, '.1p😃')).toBe('.1p😃foo')
        expect(ValueFunctions.string.prepend(str, '')).toBe('foo')
    })
    it('string.insert', () => {
        const str = 'foo'
        const shouldBeFobaro = ValueFunctions.string.insert(str, 2, 'bar')
        expect(shouldBeFobaro).toBe('fobaro')
        expect(shouldBeFobaro).not.toBe(str)
        expect(ValueFunctions.string.insert(str, 1, 'bar')).toBe('fbaroo')
        expect(ValueFunctions.string.insert(str, 1, '')).toBe('foo')
    })
    it('string.replace', () => {
        const str = 'foobarfoo'
        const shouldBeBarbarfoo = ValueFunctions.string.replace(str, 'foo', 'bar')
        expect(shouldBeBarbarfoo).toBe('barbarfoo')
        expect(shouldBeBarbarfoo).not.toBe(str)
        expect(ValueFunctions.string.replace(str, 'bar', 'foo')).toBe('foofoofoo')
    })
    it('string.substring', () => {
        const str = 'foobar'
        const shouldBeBar = ValueFunctions.string.substring(str, 3)
        expect(shouldBeBar).toBe('bar')
        expect(shouldBeBar).not.toBe(str)
        expect(ValueFunctions.string.substring(str, 0, 3)).toBe('foo')
    })

    it('array.append', () => {
        const arr = [1, 2]
        const shouldBe123 = ValueFunctions.array.append(arr, 3)
        expect(shouldBe123).toStrictEqual([1, 2, 3])
        expect(shouldBe123).not.toBe(arr)
        expect(ValueFunctions.array.append(arr, 3, 4)).toStrictEqual([1, 2, 3, 4])
    })
    it('array.prepend', () => {
        const arr = [1, 2]
        const shouldBe312 = ValueFunctions.array.prepend(arr, 3)
        expect(shouldBe312).toStrictEqual([3, 1, 2])
        expect(shouldBe312).not.toBe(arr)
        expect(ValueFunctions.array.prepend(arr, 3, 4)).toStrictEqual([3, 4, 1, 2])
    })
    it('array.prepend', () => {
        const arr = [1, 2]
        const shouldBe312 = ValueFunctions.array.prepend(arr, 3)
        expect(shouldBe312).toStrictEqual([3, 1, 2])
        expect(shouldBe312).not.toBe(arr)
        expect(ValueFunctions.array.prepend(arr, 3, 4)).toStrictEqual([3, 4, 1, 2])
    })
    it('array.insert', () => {
        const arr = [1, 2]
        const shouldBe132 = ValueFunctions.array.insert(arr, 1, 3)
        expect(shouldBe132).toStrictEqual([1, 3, 2])
        expect(shouldBe132).not.toBe(arr)
        expect(ValueFunctions.array.insert(arr, 0, 3)).toStrictEqual([3, 1, 2])
    })
    it('array.removeFirst', () => {
        const arr = [1, 2]
        const shouldBe1 = ValueFunctions.array.removeFirst(arr)
        expect(shouldBe1).toStrictEqual([2])
        expect(shouldBe1).not.toBe(arr)
        expect(ValueFunctions.array.removeFirst([1])).toStrictEqual([])
        expect(ValueFunctions.array.removeFirst([])).toStrictEqual([])
    })
    it('array.removeLast', () => {
        const arr = [1, 2]
        const shouldBe2 = ValueFunctions.array.removeLast(arr)
        expect(shouldBe2).toStrictEqual([1])
        expect(shouldBe2).not.toBe(arr)
        expect(ValueFunctions.array.removeLast([1])).toStrictEqual([])
        expect(ValueFunctions.array.removeLast([])).toStrictEqual([])
    })
    it('array.removeIndex', () => {
        const arr = [1, 2, 3]
        const shouldBe13 = ValueFunctions.array.removeIndex(arr, 1)
        expect(shouldBe13).toStrictEqual([1, 3])
        expect(shouldBe13).not.toBe(arr)
        expect(ValueFunctions.array.removeIndex(arr, 0)).toStrictEqual([2, 3])
        expect(ValueFunctions.array.removeIndex([1], 0)).toStrictEqual([])
        expect(ValueFunctions.array.removeIndex([], 0)).toStrictEqual([])
    })
    it('array.remove', () => {
        const arr = [1, 2, 3]
        const shouldBe13 = ValueFunctions.array.remove(arr, 2)
        expect(shouldBe13).toStrictEqual([1, 3])
        expect(shouldBe13).not.toBe(arr)
        expect(ValueFunctions.array.remove(arr, 0)).toStrictEqual([1, 2, 3])
        expect(ValueFunctions.array.remove([1], 1)).toStrictEqual([])
        expect(ValueFunctions.array.remove([], 1)).toStrictEqual([])
        expect(ValueFunctions.array.remove([1, 2, 3, 2, 2], 2)).toStrictEqual([1, 3])
        expect(ValueFunctions.array.remove([1, 2, 3], 1, 2)).toStrictEqual([3])
    })
    it('array.splice', () => {
        const arr = [1, 2, 3]
        const shouldBe143 = ValueFunctions.array.splice(arr, 1, 1, 4)
        expect(shouldBe143).toStrictEqual([1, 4, 3])
        expect(shouldBe143).not.toBe(arr)
        expect(ValueFunctions.array.splice(arr, 0, 2, 5)).toStrictEqual([5, 3])
    })
    it('array.reverse', () => {
        const arr = [1, 2, 3]
        const shouldBe321 = ValueFunctions.array.reverse(arr)
        expect(shouldBe321).toStrictEqual([3, 2, 1])
        expect(shouldBe321).not.toBe(arr)
    })
    it('array.sort', () => {
        const arr = [3, 1, 2]
        const shouldBe123 = ValueFunctions.array.sort(arr)
        expect(shouldBe123).toStrictEqual([1, 2, 3])
        expect(shouldBe123).not.toBe(arr)
        expect(ValueFunctions.array.sort(arr, (a, b) => b - a)).toStrictEqual([3, 2, 1])
    })

    it('set.add', () => {
        const set = new Set([1, 2])
        const shouldBe123 = ValueFunctions.set.add(set, 3)
        expect(shouldBe123).toStrictEqual(new Set([1, 2, 3]))
        expect(shouldBe123).not.toBe(set)
        expect(ValueFunctions.set.add(set, 3, 4)).toStrictEqual(new Set([1, 2, 3, 4]))
    })
    it('set.remove', () => {
        const set = new Set([1, 2])
        const shouldBe2 = ValueFunctions.set.remove(set, 1)
        expect(shouldBe2).toStrictEqual(new Set([2]))
        expect(shouldBe2).not.toBe(set)
        expect(ValueFunctions.set.remove(set, 2)).toStrictEqual(new Set([1]))
        expect(ValueFunctions.set.remove(set, 1, 2)).toStrictEqual(new Set([]))
    })
    it('set.toggle', () => {
        const set = new Set([1, 2])
        const shouldBe2 = ValueFunctions.set.toggle(set, 1)
        expect(shouldBe2).toStrictEqual(new Set([2]))
        expect(shouldBe2).not.toBe(set)
        expect(ValueFunctions.set.toggle([1], 2)).toStrictEqual(new Set([1, 2]))
        expect(ValueFunctions.set.toggle([1, 2], 2, 3)).toStrictEqual(new Set([1, 3]))
    })

    it('object.setValue', () => {
        const obj = { foo: 1 }
        const shouldHaveBar = ValueFunctions.object.setValue(obj, 'bar', 2)
        expect(shouldHaveBar).toStrictEqual({ foo: 1, bar: 2 })
        expect(shouldHaveBar).not.toBe(obj)
    })
    it('object.setValues', () => {
        const obj = { foo: 1 }
        const shouldHaveBar = ValueFunctions.object.setValues(obj, { bar: 2 })
        expect(shouldHaveBar).toStrictEqual({ foo: 1, bar: 2 })
        expect(shouldHaveBar).not.toBe(obj)
        expect(ValueFunctions.object.setValues(obj, { bar: 2, qux: 3 })).toStrictEqual({ foo: 1, bar: 2, qux: 3 })
    })
    it('object.remove', () => {
        const obj = { foo: 1, bar: 2 }
        const shouldHaveBar = ValueFunctions.object.remove(obj, 'bar')
        expect(shouldHaveBar).toStrictEqual({ foo: 1 })
        expect(shouldHaveBar).not.toBe(obj)
        expect(ValueFunctions.object.remove(obj, 'bar', 'qux')).toStrictEqual({ foo: 1 })
        expect(ValueFunctions.object.remove(obj, 'foo', 'bar')).toStrictEqual({})
    })

    it('map.setValue', () => {
        const map = new Map([['foo', 1]])
        const shouldHaveBar = ValueFunctions.map.setValue(map, 'bar', 2)
        expect(shouldHaveBar).toStrictEqual(new Map([['foo', 1], ['bar', 2]]))
        expect(shouldHaveBar).not.toBe(map)
    })
    it('map.setValues', () => {
        const map = new Map([['foo', 1]])
        const shouldHaveBar = ValueFunctions.map.setValues(map, [['bar', 2]])
        expect(shouldHaveBar).toStrictEqual(new Map([['foo', 1], ['bar', 2]]))
        expect(shouldHaveBar).not.toBe(map)
        expect(ValueFunctions.map.setValues(map, [['bar', 2], ['qux', 3]])).toStrictEqual(new Map([['foo', 1], ['bar', 2], ['qux', 3]]))
    })
    it('map.remove', () => {
        const map = new Map([['foo', 1], ['bar', 2]])
        const shouldHaveBar = ValueFunctions.map.remove(map, 'bar')
        expect(shouldHaveBar).toStrictEqual(new Map([['foo', 1]]))
        expect(shouldHaveBar).not.toBe(map)
        expect(ValueFunctions.map.remove(map, 'bar', 'qux')).toStrictEqual(new Map([['foo', 1]]))
        expect(ValueFunctions.map.remove(map, 'foo', 'bar')).toStrictEqual(new Map([]))
    })
})
