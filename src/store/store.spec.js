import Store from './store'

beforeEach(() => {
    Store.removeAll()
    Store.setDefaultState()
    Store.setInitialState()
})

describe('store', () => {
    it('value.set', () => {
        expect(Store.state.myValue).toBe(undefined)
        Store.value('myValue').set('foo')
        expect(Store.state.myValue).toBe('foo')
    })
    it('value.get', () => {
        expect(Store.value('myValue').get()).toBe(undefined)
        Store.value('myValue').set('foo')
        expect(Store.value('myValue').get()).toBe('foo')
    })
    it('value.get: set it if not exist with a default value', () => {
        expect(Store.state.myValue).toBe(undefined)
        expect(Store.value('myValue').get('foo')).toBe('foo')
        expect(Store.state.myValue).toBe('foo')
    })
    it('value.remove', () => {
        Store.value('myValue').set('foo')
        expect(Store.value('myValue').get()).toBe('foo')
        Store.value('myValue').remove()
        expect(Store.value('myValue').get()).toBe(undefined)
    })
    it('setState', () => {
        expect(Store.state.myValue1).toBe(undefined)
        expect(Store.state.myValue2).toBe(undefined)
        Store.setState({ myValue1: 'foo', myValue2: 'bar' })
        expect(Store.state.myValue1).toBe('foo')
        expect(Store.state.myValue2).toBe('bar')
    })
    it('removeAll', () => {
        Store.setState({ myValue1: 'foo', myValue2: 'bar' })
        expect(Store.state.myValue1).toBe('foo')
        expect(Store.state.myValue2).toBe('bar')
        Store.removeAll()
        expect(Store.state.myValue1).toBe(undefined)
        expect(Store.state.myValue2).toBe(undefined)
    })

    it('setDefaultValue and getDefaultValue', () => {
        expect(Store.getDefaultValue('myValue')).toBe(undefined)
        Store.setDefaultValue('myValue', 'foo')
        expect(Store.getDefaultValue('myValue')).toBe('foo')
        Store.setDefaultValue('myValue', 'bar')
        expect(Store.getDefaultValue('myValue')).toBe('bar')
    })
    it('setDefaultState', () => {
        expect(Store.getDefaultValue('myValue1')).toBe(undefined)
        expect(Store.getDefaultValue('myValue2')).toBe(undefined)
        Store.setDefaultState({ myValue1: 'foo', myValue2: 'bar' })
        expect(Store.getDefaultValue('myValue1')).toBe('foo')
        expect(Store.getDefaultValue('myValue2')).toBe('bar')
    })
    it('removeDefaultValue', () => {
        Store.setDefaultValue('myValue', 'foo')
        expect(Store.getDefaultValue('myValue')).toBe('foo')
        Store.removeDefaultValue('myValue')
        expect(Store.getDefaultValue('myValue')).toBe(undefined)
    })

    it('setInitialValue and getInitialValue', () => {
        expect(Store.getInitialValue('myValue')).toBe(undefined)
        Store.setInitialValue('myValue', 'foo')
        expect(Store.getInitialValue('myValue')).toBe('foo')
        Store.setInitialValue('myValue', 'bar')
        expect(Store.getInitialValue('myValue')).toBe('bar')
    })
    it('setInitialState', () => {
        expect(Store.getInitialValue('myValue1')).toBe(undefined)
        expect(Store.getInitialValue('myValue2')).toBe(undefined)
        Store.setInitialState({ myValue1: 'foo', myValue2: 'bar' })
        expect(Store.getInitialValue('myValue1')).toBe('foo')
        expect(Store.getInitialValue('myValue2')).toBe('bar')
    })
    it('removeInitialValue', () => {
        Store.setInitialValue('myValue', 'foo')
        expect(Store.getInitialValue('myValue')).toBe('foo')
        Store.removeInitialValue('myValue')
        expect(Store.getInitialValue('myValue')).toBe(undefined)
    })

    it('value.resetToDefault', () => {
        Store.setDefaultValue('myValue', 'foo')
        expect(Store.state.myValue).toBe(undefined)
        Store.value('myValue').resetToDefault()
        expect(Store.state.myValue).toBe('foo')
    })
    it('value.resetToInitial', () => {
        Store.setInitialValue('myValue', 'foo')
        expect(Store.state.myValue).toBe(undefined)
        Store.value('myValue').resetToInitial()
        expect(Store.state.myValue).toBe('foo')
    })
    it('value.reset (default priors to initial)', () => {
        Store.setDefaultValue('myValue', 'foo')
        Store.setInitialValue('myValue', 'bar')
        expect(Store.state.myValue).toBe(undefined)
        Store.value('myValue').reset()
        expect(Store.state.myValue).toBe('foo')
    })
    it('value.reset (initial if default is not present)', () => {
        Store.setInitialValue('myValue', 'bar')
        expect(Store.state.myValue).toBe(undefined)
        Store.value('myValue').reset()
        expect(Store.state.myValue).toBe('bar')
    })
    it('value.reset (undefined if default nor initial are present)', () => {
        Store.value('myValue').set('foo')
        expect(Store.state.myValue).toBe('foo')
        Store.value('myValue').reset()
        expect(Store.state.myValue).toBe(undefined)
    })

    it('resetAllToDefault', () => {
        Store.setDefaultState({ myValue1: 'foo', myValue2: 'bar' })
        expect(Store.state.myValue1).toBe(undefined)
        expect(Store.state.myValue2).toBe(undefined)
        Store.resetAllToDefault()
        expect(Store.state.myValue1).toBe('foo')
        expect(Store.state.myValue2).toBe('bar')
    })
    it('resetAllToInitial', () => {
        Store.setInitialState({ myValue1: 'foo', myValue2: 'bar' })
        expect(Store.state.myValue1).toBe(undefined)
        expect(Store.state.myValue2).toBe(undefined)
        Store.resetAllToInitial()
        expect(Store.state.myValue1).toBe('foo')
        expect(Store.state.myValue2).toBe('bar')
    })

    // it('setUpdatingHandlers: afterSet, afterDelete and afterUpdate are called', () => {
    //     const afterSet = jest.fn()
    //     const afterDelete = jest.fn()
    //     const afterUpdate = jest.fn()
    //     Store.setDefaultState({ myValue: 'bar' })
    //     Store.setUpdatingHandlers({ afterSet, afterDelete, afterUpdate })
    //     Store.value('myValue').set('foo')
    //     expect(afterSet).toHaveBeenCalledWith('myValue', 'foo')
    //     expect(afterUpdate).toHaveBeenCalledWith({ myValue: 'foo' })
    //     Store.value('myValue').resetToDefault()
    //     expect(afterSet).toHaveBeenCalledWith('myValue', 'bar')
    //     expect(afterUpdate).toHaveBeenCalledWith({ myValue: 'bar' })
    //     Store.value('myValue').remove()
    //     expect(afterDelete).toHaveBeenCalledWith('myValue')
    //     expect(afterUpdate).toHaveBeenCalledWith({})
    // })

    it('boolean.toogle', () => {
        Store.value('myValue').set(false)
        Store.boolean('myValue').toggle()
        expect(Store.state.myValue).toStrictEqual(true)
        Store.boolean('myValue').toggle()
        expect(Store.state.myValue).toStrictEqual(false)
    })
    it('number.increment', () => {
        Store.value('myValue').set(0)
        Store.number('myValue').increment()
        expect(Store.state.myValue).toStrictEqual(1)
        Store.number('myValue').increment()
        expect(Store.state.myValue).toStrictEqual(2)
    })
    it('string.append', () => {
        Store.value('myValue').set('foo')
        Store.string('myValue').append('bar')
        expect(Store.state.myValue).toStrictEqual('foobar')
    })
    it('array.append', () => {
        Store.value('myValue').set(['foo'])
        Store.array('myValue').append('bar')
        expect(Store.state.myValue).toStrictEqual(['foo', 'bar'])
    })
    it('object.setValue', () => {
        Store.value('myValue').set({ foo: 1 })
        Store.object('myValue').setValue('bar', 2)
        expect(Store.state.myValue).toStrictEqual({ foo: 1, bar: 2 })
    })
    it('set.add', () => {
        Store.value('myValue').set(new Set(['foo']))
        Store.set('myValue').add('bar')
        expect(Store.state.myValue).toStrictEqual(new Set(['foo', 'bar']))
    })
    it('map.setValue', () => {
        Store.value('myValue').set(new Map([['foo', 1]]))
        Store.map('myValue').setValue('bar', 2)
        expect(Store.state.myValue).toStrictEqual(new Map([['foo', 1], ['bar', 2]]))
    })
})
