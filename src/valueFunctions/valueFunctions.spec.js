import ValueFunctions from './valueFunctions'

describe('mutatorFunctions', () => {
    it('boolean.toggle', () => {
        const boolFalse = false
        const shouldBeTrue = ValueFunctions.boolean.mutator.toggle(boolFalse)()
        expect(shouldBeTrue).toBe(true)
        expect(shouldBeTrue).not.toBe(boolFalse)
        expect(ValueFunctions.boolean.mutator.toggle(true)()).toBe(false)
    })

    it('number.increment', () => {
        const num = 1
        const shouldBe2 = ValueFunctions.number.mutator.increment(num)()
        expect(shouldBe2).toBe(2)
        expect(shouldBe2).not.toBe(num)
        expect(ValueFunctions.number.mutator.increment(num)(10)).toBe(11)
        expect(ValueFunctions.number.mutator.increment(num)(-10)).toBe(-9)
        expect(ValueFunctions.number.mutator.increment(num)(10, 5)).toBe(5)
        expect(ValueFunctions.number.mutator.increment(num)(-10, 0)).toBe(-9)
    })
    it('number.decrement', () => {
        const num = 1
        const shouldBe0 = ValueFunctions.number.mutator.decrement(num)()
        expect(shouldBe0).toBe(0)
        expect(shouldBe0).not.toBe(num)
        expect(ValueFunctions.number.mutator.decrement(num)(10)).toBe(-9)
        expect(ValueFunctions.number.mutator.decrement(num)(-10)).toBe(11)
        expect(ValueFunctions.number.mutator.decrement(num)(10, 0)).toBe(0)
        expect(ValueFunctions.number.mutator.decrement(num)(-10, 0)).toBe(11)
    })

    it('string.append', () => {
        const str = 'foo'
        const shouldBeFoobar = ValueFunctions.string.mutator.append(str)('bar')
        expect(shouldBeFoobar).toBe('foobar')
        expect(shouldBeFoobar).not.toBe(str)
        expect(ValueFunctions.string.mutator.append(str)('.1p😃')).toBe('foo.1p😃')
        expect(ValueFunctions.string.mutator.append(str)('')).toBe('foo')
    })
    it('string.prepend', () => {
        const str = 'foo'
        const shouldBeBarfoo = ValueFunctions.string.mutator.prepend(str)('bar')
        expect(shouldBeBarfoo).toBe('barfoo')
        expect(shouldBeBarfoo).not.toBe(str)
        expect(ValueFunctions.string.mutator.prepend(str)('.1p😃')).toBe('.1p😃foo')
        expect(ValueFunctions.string.mutator.prepend(str)('')).toBe('foo')
    })
    it('string.insert', () => {
        const str = 'foo'
        const shouldBeFobaro = ValueFunctions.string.mutator.insert(str)(2, 'bar')
        expect(shouldBeFobaro).toBe('fobaro')
        expect(shouldBeFobaro).not.toBe(str)
        expect(ValueFunctions.string.mutator.insert(str)(1, 'bar')).toBe('fbaroo')
        expect(ValueFunctions.string.mutator.insert(str)(1, '')).toBe('foo')
    })
    it('string.replace', () => {
        const str = 'foobarfoo'
        const shouldBeBarbarfoo = ValueFunctions.string.mutator.replace(str)('foo', 'bar')
        expect(shouldBeBarbarfoo).toBe('barbarfoo')
        expect(shouldBeBarbarfoo).not.toBe(str)
        expect(ValueFunctions.string.mutator.replace(str)('bar', 'foo')).toBe('foofoofoo')
    })
    it('string.substring', () => {
        const str = 'foobar'
        const shouldBeBar = ValueFunctions.string.mutator.substring(str)(3)
        expect(shouldBeBar).toBe('bar')
        expect(shouldBeBar).not.toBe(str)
        expect(ValueFunctions.string.mutator.substring(str)(0, 3)).toBe('foo')
    })

    it('array.append', () => {
        const arr = [1, 2]
        const shouldBe123 = ValueFunctions.array.mutator.append(arr)(3)
        expect(shouldBe123).toStrictEqual([1, 2, 3])
        expect(shouldBe123).not.toBe(arr)
        expect(ValueFunctions.array.mutator.append(arr)(3, 4)).toStrictEqual([1, 2, 3, 4])
    })
    it('array.prepend', () => {
        const arr = [1, 2]
        const shouldBe312 = ValueFunctions.array.mutator.prepend(arr)(3)
        expect(shouldBe312).toStrictEqual([3, 1, 2])
        expect(shouldBe312).not.toBe(arr)
        expect(ValueFunctions.array.mutator.prepend(arr)(3, 4)).toStrictEqual([3, 4, 1, 2])
    })
    it('array.insert', () => {
        const arr = [1, 2]
        const shouldBe132 = ValueFunctions.array.mutator.insert(arr)(1, 3)
        expect(shouldBe132).toStrictEqual([1, 3, 2])
        expect(shouldBe132).not.toBe(arr)
        expect(ValueFunctions.array.mutator.insert(arr)(0, 3)).toStrictEqual([3, 1, 2])
    })
    it('array.removeFirst', () => {
        const arr = [1, 2]
        const shouldBe1 = ValueFunctions.array.mutator.removeFirst(arr)()
        expect(shouldBe1).toStrictEqual([2])
        expect(shouldBe1).not.toBe(arr)
        expect(ValueFunctions.array.mutator.removeFirst([1])()).toStrictEqual([])
        expect(ValueFunctions.array.mutator.removeFirst([])()).toStrictEqual([])
    })
    it('array.removeLast', () => {
        const arr = [1, 2]
        const shouldBe2 = ValueFunctions.array.mutator.removeLast(arr)()
        expect(shouldBe2).toStrictEqual([1])
        expect(shouldBe2).not.toBe(arr)
        expect(ValueFunctions.array.mutator.removeLast([1])()).toStrictEqual([])
        expect(ValueFunctions.array.mutator.removeLast([])()).toStrictEqual([])
    })
    it('array.removeIndex', () => {
        const arr = [1, 2, 3]
        const shouldBe13 = ValueFunctions.array.mutator.removeIndex(arr)(1)
        expect(shouldBe13).toStrictEqual([1, 3])
        expect(shouldBe13).not.toBe(arr)
        expect(ValueFunctions.array.mutator.removeIndex(arr)(0)).toStrictEqual([2, 3])
        expect(ValueFunctions.array.mutator.removeIndex([1])(0)).toStrictEqual([])
        expect(ValueFunctions.array.mutator.removeIndex([])(0)).toStrictEqual([])
    })
    it('array.remove', () => {
        const arr = [1, 2, 3]
        const shouldBe13 = ValueFunctions.array.mutator.remove(arr)(2)
        expect(shouldBe13).toStrictEqual([1, 3])
        expect(shouldBe13).not.toBe(arr)
        expect(ValueFunctions.array.mutator.remove(arr)(0)).toStrictEqual([1, 2, 3])
        expect(ValueFunctions.array.mutator.remove([1])(1)).toStrictEqual([])
        expect(ValueFunctions.array.mutator.remove([])(1)).toStrictEqual([])
        expect(ValueFunctions.array.mutator.remove([1, 2, 3, 2, 2])(2)).toStrictEqual([1, 3])
        expect(ValueFunctions.array.mutator.remove([1, 2, 3])(1, 2)).toStrictEqual([3])
    })
    it('array.splice', () => {
        const arr = [1, 2, 3]
        const shouldBe143 = ValueFunctions.array.mutator.splice(arr)(1, 1, 4)
        expect(shouldBe143).toStrictEqual([1, 4, 3])
        expect(shouldBe143).not.toBe(arr)
        expect(ValueFunctions.array.mutator.splice(arr)(0, 2, 5)).toStrictEqual([5, 3])
    })
    it('array.reverse', () => {
        const arr = [1, 2, 3]
        const shouldBe321 = ValueFunctions.array.mutator.reverse(arr)()
        expect(shouldBe321).toStrictEqual([3, 2, 1])
        expect(shouldBe321).not.toBe(arr)
    })
    it('array.sort', () => {
        const arr = [3, 1, 2]
        const shouldBe123 = ValueFunctions.array.mutator.sort(arr)()
        expect(shouldBe123).toStrictEqual([1, 2, 3])
        expect(shouldBe123).not.toBe(arr)
        expect(ValueFunctions.array.mutator.sort(arr)((a, b) => b - a)).toStrictEqual([3, 2, 1])
    })

    it('object.setValue', () => {
        const obj = { foo: 1 }
        const shouldHaveBar = ValueFunctions.object.mutator.setValue(obj)('bar', 2)
        expect(shouldHaveBar).toStrictEqual({ foo: 1, bar: 2 })
        expect(shouldHaveBar).not.toBe(obj)
    })
    it('object.setValues', () => {
        const obj = { foo: 1 }
        const shouldHaveBar = ValueFunctions.object.mutator.setValues(obj)({ bar: 2 })
        expect(shouldHaveBar).toStrictEqual({ foo: 1, bar: 2 })
        expect(shouldHaveBar).not.toBe(obj)
        expect(ValueFunctions.object.mutator.setValues(obj)({ bar: 2, qux: 3 })).toStrictEqual({ foo: 1, bar: 2, qux: 3 })
    })
    it('object.remove', () => {
        const obj = { foo: 1, bar: 2 }
        const shouldHaveBar = ValueFunctions.object.mutator.remove(obj)('bar')
        expect(shouldHaveBar).toStrictEqual({ foo: 1 })
        expect(shouldHaveBar).not.toBe(obj)
        expect(ValueFunctions.object.mutator.remove(obj)('bar', 'qux')).toStrictEqual({ foo: 1 })
        expect(ValueFunctions.object.mutator.remove(obj)('foo', 'bar')).toStrictEqual({})
    })

    it('set.add', () => {
        const set = new Set([1, 2])
        const shouldBe123 = ValueFunctions.set.mutator.add(set)(3)
        expect(shouldBe123).toStrictEqual(new Set([1, 2, 3]))
        expect(shouldBe123).not.toBe(set)
        expect(ValueFunctions.set.mutator.add(set)(3, 4)).toStrictEqual(new Set([1, 2, 3, 4]))
    })
    it('set.remove', () => {
        const set = new Set([1, 2])
        const shouldBe2 = ValueFunctions.set.mutator.remove(set)(1)
        expect(shouldBe2).toStrictEqual(new Set([2]))
        expect(shouldBe2).not.toBe(set)
        expect(ValueFunctions.set.mutator.remove(set)(2)).toStrictEqual(new Set([1]))
        expect(ValueFunctions.set.mutator.remove(set)(1, 2)).toStrictEqual(new Set([]))
    })
    it('set.toggle', () => {
        const set = new Set([1, 2])
        const shouldBe2 = ValueFunctions.set.mutator.toggle(set)(1)
        expect(shouldBe2).toStrictEqual(new Set([2]))
        expect(shouldBe2).not.toBe(set)
        expect(ValueFunctions.set.mutator.toggle([1])(2)).toStrictEqual(new Set([1, 2]))
        expect(ValueFunctions.set.mutator.toggle([1, 2])(2, 3)).toStrictEqual(new Set([1, 3]))
    })

    it('map.setValue', () => {
        const map = new Map([['foo', 1]])
        const shouldHaveBar = ValueFunctions.map.mutator.setValue(map)('bar', 2)
        expect(shouldHaveBar).toStrictEqual(new Map([['foo', 1], ['bar', 2]]))
        expect(shouldHaveBar).not.toBe(map)
    })
    it('map.setValues', () => {
        const map = new Map([['foo', 1]])
        const shouldHaveBar = ValueFunctions.map.mutator.setValues(map)([['bar', 2]])
        expect(shouldHaveBar).toStrictEqual(new Map([['foo', 1], ['bar', 2]]))
        expect(shouldHaveBar).not.toBe(map)
        expect(ValueFunctions.map.mutator.setValues(map)([['bar', 2], ['qux', 3]])).toStrictEqual(new Map([['foo', 1], ['bar', 2], ['qux', 3]]))
    })
    it('map.remove', () => {
        const map = new Map([['foo', 1], ['bar', 2]])
        const shouldHaveBar = ValueFunctions.map.mutator.remove(map)('bar')
        expect(shouldHaveBar).toStrictEqual(new Map([['foo', 1]]))
        expect(shouldHaveBar).not.toBe(map)
        expect(ValueFunctions.map.mutator.remove(map)('bar', 'qux')).toStrictEqual(new Map([['foo', 1]]))
        expect(ValueFunctions.map.mutator.remove(map)('foo', 'bar')).toStrictEqual(new Map([]))
    })
})
