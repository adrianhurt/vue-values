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
        VueValuesStore.value('myValue').set('foo')
        expect(VueValuesStore.state.myValue).toBe('foo')
    })
    it('value.get', () => {
        expect(VueValuesStore.value('myValue').get()).toBe(undefined)
        VueValuesStore.value('myValue').set('foo')
        expect(VueValuesStore.value('myValue').get()).toBe('foo')
    })
    it('value.get: set it if not exist with a default value', () => {
        expect(VueValuesStore.state.myValue).toBe(undefined)
        expect(VueValuesStore.value('myValue').get('foo')).toBe('foo')
        expect(VueValuesStore.state.myValue).toBe('foo')
    })
    it('value.remove', () => {
        VueValuesStore.value('myValue').set('foo')
        expect(VueValuesStore.value('myValue').get()).toBe('foo')
        VueValuesStore.value('myValue').remove()
        expect(VueValuesStore.value('myValue').get()).toBe(undefined)
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
        VueValuesStore.value('myValue').resetToDefault()
        expect(VueValuesStore.state.myValue).toBe('foo')
    })
    it('value.resetToInitial', () => {
        VueValuesStore.setInitialValue('myValue', 'foo')
        expect(VueValuesStore.state.myValue).toBe(undefined)
        VueValuesStore.value('myValue').resetToInitial()
        expect(VueValuesStore.state.myValue).toBe('foo')
    })
    it('value.reset (default priors to initial)', () => {
        VueValuesStore.setDefaultValue('myValue', 'foo')
        VueValuesStore.setInitialValue('myValue', 'bar')
        expect(VueValuesStore.state.myValue).toBe(undefined)
        VueValuesStore.value('myValue').reset()
        expect(VueValuesStore.state.myValue).toBe('foo')
    })
    it('value.reset (initial if default is not present)', () => {
        VueValuesStore.setInitialValue('myValue', 'bar')
        expect(VueValuesStore.state.myValue).toBe(undefined)
        VueValuesStore.value('myValue').reset()
        expect(VueValuesStore.state.myValue).toBe('bar')
    })
    it('value.reset (undefined if default nor initial are present)', () => {
        VueValuesStore.value('myValue').set('foo')
        expect(VueValuesStore.state.myValue).toBe('foo')
        VueValuesStore.value('myValue').reset()
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
        VueValuesStore.value('myValue').set('foo')
        expect(onSet).toHaveBeenCalledWith('myValue', 'foo')
        VueValuesStore.value('myValue').resetToDefault()
        expect(onSet).toHaveBeenCalledWith('myValue', 'bar')
        VueValuesStore.value('myValue').remove()
        expect(onDelete).toHaveBeenCalledWith('myValue')
    })
    it('setUpdatingHandlers: onSet controls the value is set', () => {
        const onSet = () => 'bar'
        VueValuesStore.setUpdatingHandlers({ onSet })
        VueValuesStore.value('myValue').set('foo')
        expect(VueValuesStore.state.myValue).toBe('bar')
    })

    it('boolean.toogle', () => {
        VueValuesStore.value('myValue').set(false)
        VueValuesStore.boolean('myValue').toggle()
        expect(VueValuesStore.state.myValue).toStrictEqual(true)
        VueValuesStore.boolean('myValue').toggle()
        expect(VueValuesStore.state.myValue).toStrictEqual(false)
    })
    it('number.increment', () => {
        VueValuesStore.value('myValue').set(0)
        VueValuesStore.number('myValue').increment()
        expect(VueValuesStore.state.myValue).toStrictEqual(1)
        VueValuesStore.number('myValue').increment()
        expect(VueValuesStore.state.myValue).toStrictEqual(2)
    })
    it('string.append', () => {
        VueValuesStore.value('myValue').set('foo')
        VueValuesStore.string('myValue').append('bar')
        expect(VueValuesStore.state.myValue).toStrictEqual('foobar')
    })
    it('array.append', () => {
        VueValuesStore.value('myValue').set(['foo'])
        VueValuesStore.array('myValue').append('bar')
        expect(VueValuesStore.state.myValue).toStrictEqual(['foo', 'bar'])
    })
    it('set.add', () => {
        VueValuesStore.value('myValue').set(new Set(['foo']))
        VueValuesStore.set('myValue').add('bar')
        expect(VueValuesStore.state.myValue).toStrictEqual(new Set(['foo', 'bar']))
    })
    it('object.setValue', () => {
        VueValuesStore.value('myValue').set({ foo: 1 })
        VueValuesStore.object('myValue').setValue('bar', 2)
        expect(VueValuesStore.state.myValue).toStrictEqual({ foo: 1, bar: 2 })
    })
    it('map.setValue', () => {
        VueValuesStore.value('myValue').set(new Map([['foo', 1]]))
        VueValuesStore.map('myValue').setValue('bar', 2)
        expect(VueValuesStore.state.myValue).toStrictEqual(new Map([['foo', 1], ['bar', 2]]))
    })
})
