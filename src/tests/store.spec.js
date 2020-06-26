import VueValuesStore from '../store'

beforeEach(() => {
    VueValuesStore.removeAll()
    VueValuesStore.setDefaultState()
    VueValuesStore.setInitialState()
    VueValuesStore.setUpdatingHandlers()
})

describe('store', () => {
    it('value.set', () => {
        expect(VueValuesStore.state.myValue).toBe(undefined)
        VueValuesStore.value.set('myValue', 'foo')
        expect(VueValuesStore.state.myValue).toBe('foo')
    })
    it('value.get', () => {
        expect(VueValuesStore.value.get('myValue')).toBe(undefined)
        VueValuesStore.value.set('myValue', 'foo')
        expect(VueValuesStore.value.get('myValue')).toBe('foo')
    })
    it('value.get: set it if not exist with a default value', () => {
        expect(VueValuesStore.state.myValue).toBe(undefined)
        expect(VueValuesStore.value.get('myValue', 'foo')).toBe('foo')
        expect(VueValuesStore.state.myValue).toBe('foo')
    })
    it('value.remove', () => {
        VueValuesStore.value.set('myValue', 'foo')
        expect(VueValuesStore.value.get('myValue')).toBe('foo')
        VueValuesStore.value.remove('myValue')
        expect(VueValuesStore.value.get('myValue')).toBe(undefined)
    })
    it('setState', () => {
        expect(VueValuesStore.state.myValue1).toBe(undefined)
        expect(VueValuesStore.state.myValue2).toBe(undefined)
        VueValuesStore.setState({ myValue1: 'foo', myValue2: 'bar' })
        expect(VueValuesStore.state.myValue1).toBe('foo')
        expect(VueValuesStore.state.myValue2).toBe('bar')
    })
    it('removeAll', () => {
        VueValuesStore.setState({ myValue1: 'foo', myValue2: 'bar' })
        expect(VueValuesStore.state.myValue1).toBe('foo')
        expect(VueValuesStore.state.myValue2).toBe('bar')
        VueValuesStore.removeAll()
        expect(VueValuesStore.state.myValue1).toBe(undefined)
        expect(VueValuesStore.state.myValue2).toBe(undefined)
    })

    it('setDefaultValue and getDefaultValue', () => {
        expect(VueValuesStore.getDefaultValue('myValue')).toBe(undefined)
        VueValuesStore.setDefaultValue('myValue', 'foo')
        expect(VueValuesStore.getDefaultValue('myValue')).toBe('foo')
        VueValuesStore.setDefaultValue('myValue', 'bar')
        expect(VueValuesStore.getDefaultValue('myValue')).toBe('bar')
    })
    it('setDefaultState', () => {
        expect(VueValuesStore.getDefaultValue('myValue1')).toBe(undefined)
        expect(VueValuesStore.getDefaultValue('myValue2')).toBe(undefined)
        VueValuesStore.setDefaultState({ myValue1: 'foo', myValue2: 'bar' })
        expect(VueValuesStore.getDefaultValue('myValue1')).toBe('foo')
        expect(VueValuesStore.getDefaultValue('myValue2')).toBe('bar')
    })
    it('removeDefaultValue', () => {
        VueValuesStore.setDefaultValue('myValue', 'foo')
        expect(VueValuesStore.getDefaultValue('myValue')).toBe('foo')
        VueValuesStore.removeDefaultValue('myValue')
        expect(VueValuesStore.getDefaultValue('myValue')).toBe(undefined)
    })

    it('setInitialValue and getInitialValue', () => {
        expect(VueValuesStore.getInitialValue('myValue')).toBe(undefined)
        VueValuesStore.setInitialValue('myValue', 'foo')
        expect(VueValuesStore.getInitialValue('myValue')).toBe('foo')
        VueValuesStore.setInitialValue('myValue', 'bar')
        expect(VueValuesStore.getInitialValue('myValue')).toBe('bar')
    })
    it('setInitialState', () => {
        expect(VueValuesStore.getInitialValue('myValue1')).toBe(undefined)
        expect(VueValuesStore.getInitialValue('myValue2')).toBe(undefined)
        VueValuesStore.setInitialState({ myValue1: 'foo', myValue2: 'bar' })
        expect(VueValuesStore.getInitialValue('myValue1')).toBe('foo')
        expect(VueValuesStore.getInitialValue('myValue2')).toBe('bar')
    })
    it('removeInitialValue', () => {
        VueValuesStore.setInitialValue('myValue', 'foo')
        expect(VueValuesStore.getInitialValue('myValue')).toBe('foo')
        VueValuesStore.removeInitialValue('myValue')
        expect(VueValuesStore.getInitialValue('myValue')).toBe(undefined)
    })

    it('value.resetToDefault', () => {
        VueValuesStore.setDefaultValue('myValue', 'foo')
        expect(VueValuesStore.state.myValue).toBe(undefined)
        VueValuesStore.value.resetToDefault('myValue')
        expect(VueValuesStore.state.myValue).toBe('foo')
    })
    it('value.resetToInitial', () => {
        VueValuesStore.setInitialValue('myValue', 'foo')
        expect(VueValuesStore.state.myValue).toBe(undefined)
        VueValuesStore.value.resetToInitial('myValue')
        expect(VueValuesStore.state.myValue).toBe('foo')
    })
    it('value.reset (default priors to initial)', () => {
        VueValuesStore.setDefaultValue('myValue', 'foo')
        VueValuesStore.setInitialValue('myValue', 'bar')
        expect(VueValuesStore.state.myValue).toBe(undefined)
        VueValuesStore.value.reset('myValue')
        expect(VueValuesStore.state.myValue).toBe('foo')
    })
    it('value.reset (initial if default is not present)', () => {
        VueValuesStore.setInitialValue('myValue', 'bar')
        expect(VueValuesStore.state.myValue).toBe(undefined)
        VueValuesStore.value.reset('myValue')
        expect(VueValuesStore.state.myValue).toBe('bar')
    })
    it('value.reset (undefined if default nor initial are present)', () => {
        VueValuesStore.value.set('myValue', 'foo')
        expect(VueValuesStore.state.myValue).toBe('foo')
        VueValuesStore.value.reset('myValue')
        expect(VueValuesStore.state.myValue).toBe(undefined)
    })

    it('resetAllToDefault', () => {
        VueValuesStore.setDefaultState({ myValue1: 'foo', myValue2: 'bar' })
        expect(VueValuesStore.state.myValue1).toBe(undefined)
        expect(VueValuesStore.state.myValue2).toBe(undefined)
        VueValuesStore.resetAllToDefault()
        expect(VueValuesStore.state.myValue1).toBe('foo')
        expect(VueValuesStore.state.myValue2).toBe('bar')
    })
    it('resetAllToInitial', () => {
        VueValuesStore.setInitialState({ myValue1: 'foo', myValue2: 'bar' })
        expect(VueValuesStore.state.myValue1).toBe(undefined)
        expect(VueValuesStore.state.myValue2).toBe(undefined)
        VueValuesStore.resetAllToInitial()
        expect(VueValuesStore.state.myValue1).toBe('foo')
        expect(VueValuesStore.state.myValue2).toBe('bar')
    })

    it('setUpdatingHandlers: onSet and onDelete are called', () => {
        const onSet = jest.fn()
        const onDelete = jest.fn()
        VueValuesStore.setDefaultState({ myValue: 'bar' })
        VueValuesStore.setUpdatingHandlers({ onSet, onDelete })
        VueValuesStore.value.set('myValue', 'foo')
        expect(onSet).toHaveBeenCalledWith('myValue', 'foo')
        VueValuesStore.value.resetToDefault('myValue')
        expect(onSet).toHaveBeenCalledWith('myValue', 'bar')
        VueValuesStore.value.remove('myValue')
        expect(onDelete).toHaveBeenCalledWith('myValue')
    })
    it('setUpdatingHandlers: onSet controls the value is set', () => {
        const onSet = () => 'bar'
        VueValuesStore.setUpdatingHandlers({ onSet })
        VueValuesStore.value.set('myValue', 'foo')
        expect(VueValuesStore.state.myValue).toBe('bar')
    })

    it('boolean.toogle', () => {
        VueValuesStore.value.set('myValue', false)
        VueValuesStore.boolean.toggle('myValue')
        expect(VueValuesStore.state.myValue).toStrictEqual(true)
        VueValuesStore.boolean.toggle('myValue')
        expect(VueValuesStore.state.myValue).toStrictEqual(false)
    })
    it('number.increment', () => {
        VueValuesStore.value.set('myValue', 0)
        VueValuesStore.number.increment('myValue')
        expect(VueValuesStore.state.myValue).toStrictEqual(1)
        VueValuesStore.number.increment('myValue')
        expect(VueValuesStore.state.myValue).toStrictEqual(2)
    })
    it('string.append', () => {
        VueValuesStore.value.set('myValue', 'foo')
        VueValuesStore.string.append('myValue', 'bar')
        expect(VueValuesStore.state.myValue).toStrictEqual('foobar')
    })
    it('array.append', () => {
        VueValuesStore.value.set('myValue', ['foo'])
        VueValuesStore.array.append('myValue', 'bar')
        expect(VueValuesStore.state.myValue).toStrictEqual(['foo', 'bar'])
    })
    it('set.add', () => {
        VueValuesStore.value.set('myValue', new Set(['foo']))
        VueValuesStore.set.add('myValue', 'bar')
        expect(VueValuesStore.state.myValue).toStrictEqual(new Set(['foo', 'bar']))
    })
    it('object.setValue', () => {
        VueValuesStore.value.set('myValue', { foo: 1 })
        VueValuesStore.object.setValue('myValue', 'bar', 2)
        expect(VueValuesStore.state.myValue).toStrictEqual({ foo: 1, bar: 2 })
    })
    it('map.setValue', () => {
        VueValuesStore.value.set('myValue', new Map([['foo', 1]]))
        VueValuesStore.map.setValue('myValue', 'bar', 2)
        expect(VueValuesStore.state.myValue).toStrictEqual(new Map([['foo', 1], ['bar', 2]]))
    })
})
