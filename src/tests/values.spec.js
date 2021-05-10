import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import VueValuesStore, {
    Value,
    BooleanValue,
    NumberValue,
    StringValue,
    ArrayValue,
    SetValue,
    ObjectValue,
    MapValue,
    StoredValue,
    StoredBooleanValue,
    StoredNumberValue,
    StoredStringValue,
    StoredArrayValue,
    StoredSetValue,
    StoredObjectValue,
    StoredMapValue,
} from '../main'

const Tester = {
    name: 'Tester',
    inheritAttrs: false,
    render () {
        return h('div')
    },
}

const getWrapper = (Component, props = {}) => mount(Component, {
    props,
    slots: {
        default: (scopedProps) => h(Tester, scopedProps),
    },
})
const getWrapperUtilities = (...args) => {
    const wrapper = getWrapper(...args)
    const tester = wrapper.findComponent(Tester)
    return { wrapper, tester, getAttrs: () => wrapper.findComponent(Tester).vm.$attrs }
}

beforeEach(() => {
    VueValuesStore.removeAll()
    VueValuesStore.setDefaultState()
    VueValuesStore.setInitialState()
})

function testGeneralValue ({
    component: Component,
    storedComponent: StoredComponent,
    componentName,
    emptyValue = undefined,
    foo = 'foo',
    bar = 'bar',
    uid = 'myValue',
    customProps = {},
}) {
    if (StoredComponent) {
        if (Component) {
            testGeneralValue({
                component: Component,
                componentName,
                emptyValue,
                foo,
                bar,
                customProps,
            })
        }
        testGeneralValue({
            component: StoredComponent,
            componentName: componentName.indexOf('Stored') === 0 ? componentName : `Stored${componentName}`,
            emptyValue,
            foo,
            bar,
            customProps: { uid, ...customProps },
        })
        return
    }
    const isStoredValue = componentName.indexOf('Stored') === 0
    const getUtilities = (props = {}) => getWrapperUtilities(Component, { ...customProps, ...props })

    describe(`${componentName} (basics)`, () => {
        it('It renders correctly', async () => {
            VueValuesStore.removeAll()
            expect(getWrapper(Component, customProps).findAllComponents(Tester)).toHaveLength(1)
        })
        it('Get and Set work correctly', async () => {
            VueValuesStore.removeAll()
            const { getAttrs } = getUtilities()
            expect(getAttrs().value).toStrictEqual(emptyValue)
            getAttrs().set(foo)
            await nextTick()
            expect(getAttrs().value).toStrictEqual(foo)
        })
        it('change event is emitted', async () => {
            VueValuesStore.removeAll()
            const { wrapper, getAttrs } = getUtilities({ initialValue: foo })
            getAttrs().set(bar)
            await nextTick()
            expect(wrapper.emitted('change')[0]).toEqual([bar, foo])
        })
        it('change event not emitted for same value', async () => {
            VueValuesStore.removeAll()
            const { wrapper, getAttrs } = getUtilities({ initialValue: foo })
            getAttrs().set(foo)
            await nextTick()
            expect(wrapper.emitted('change')).toBe(undefined)
        })
        it('Initializes with defaultValue', async () => {
            VueValuesStore.removeAll()
            const { getAttrs } = getUtilities({ defaultValue: foo })
            expect(getAttrs().value).toStrictEqual(foo)
        })
        it('Initializes with initialValue', async () => {
            VueValuesStore.removeAll()
            const { getAttrs } = getUtilities({ initialValue: foo })
            expect(getAttrs().value).toStrictEqual(foo)
        })
        it('Initializes with initialValue if defaultValue is present', async () => {
            VueValuesStore.removeAll()
            const { getAttrs } = getUtilities({ initialValue: foo, defaultValue: bar })
            expect(getAttrs().value).toStrictEqual(foo)
        })
        it('Clear works correctly', async () => {
            VueValuesStore.removeAll()
            const { getAttrs } = getUtilities({ initialValue: foo })
            expect(getAttrs().value).toStrictEqual(foo)
            getAttrs().clear()
            await nextTick()
            expect(getAttrs().value).toStrictEqual(emptyValue)
        })
        it('ResetToDefault works correctly', async () => {
            VueValuesStore.removeAll()
            const { getAttrs } = getUtilities({ initialValue: foo, defaultValue: bar })
            expect(getAttrs().value).toStrictEqual(foo)
            getAttrs().resetToDefault()
            await nextTick()
            expect(getAttrs().value).toStrictEqual(bar)
        })
        it('ResetToInitial works correctly', async () => {
            VueValuesStore.removeAll()
            const { getAttrs } = getUtilities({ initialValue: foo })
            getAttrs().set(bar)
            await nextTick()
            expect(getAttrs().value).toStrictEqual(bar)
            getAttrs().resetToInitial()
            await nextTick()
            expect(getAttrs().value).toStrictEqual(foo)
        })
        it('Reset set to default', async () => {
            VueValuesStore.removeAll()
            const { getAttrs } = getUtilities({ initialValue: foo, defaultValue: bar })
            expect(getAttrs().value).toStrictEqual(foo)
            getAttrs().reset()
            await nextTick()
            expect(getAttrs().value).toStrictEqual(bar)
        })
        it('Reset set to initial if default is not present', async () => {
            VueValuesStore.removeAll()
            const { getAttrs } = getUtilities({ initialValue: foo })
            getAttrs().set(bar)
            await nextTick()
            expect(getAttrs().value).toStrictEqual(bar)
            getAttrs().reset()
            await nextTick()
            expect(getAttrs().value).toStrictEqual(foo)
        })
        if (!isStoredValue) {
            it('Reset set to empty if default nor initial are not present', async () => {
                const { getAttrs } = getUtilities()
                getAttrs().set(bar)
                await nextTick()
                expect(getAttrs().value).toStrictEqual(bar)
                getAttrs().reset()
                await nextTick()
                expect(getAttrs().value).toStrictEqual(emptyValue)
            })
        }
        if (isStoredValue) {
            it('Initializes with defaultValue from store', async () => {
                VueValuesStore.removeAll()
                VueValuesStore.value.set(uid, foo)
                const { getAttrs } = getUtilities()
                expect(getAttrs().value).toStrictEqual(foo)
            })
            it('Value is persisted into store', async () => {
                VueValuesStore.removeAll()
                expect(VueValuesStore.state[uid]).toStrictEqual(undefined)
                const { getAttrs } = getUtilities({ defaultValue: foo })
                expect(VueValuesStore.state[uid]).toStrictEqual(foo)
                getAttrs().set(bar)
                expect(VueValuesStore.state[uid]).toStrictEqual(bar)
            })
            it('ResetToDefault from store', async () => {
                VueValuesStore.removeAll()
                VueValuesStore.setDefaultValue(uid, foo)
                const { getAttrs } = getUtilities()
                expect(getAttrs().value).toStrictEqual(emptyValue)
                VueValuesStore.value.resetToDefault(uid)
                await nextTick()
                expect(getAttrs().value).toStrictEqual(foo)
            })
            it('ResetToInitial from store', async () => {
                VueValuesStore.removeAll()
                VueValuesStore.setInitialValue(uid, foo)
                const { getAttrs } = getUtilities()
                expect(getAttrs().value).toStrictEqual(emptyValue)
                VueValuesStore.value.resetToInitial(uid)
                await nextTick()
                expect(getAttrs().value).toStrictEqual(foo)
            })
            it('Reset to default (prior to initial) from store', async () => {
                VueValuesStore.removeAll()
                VueValuesStore.setDefaultValue(uid, foo)
                VueValuesStore.setInitialValue(uid, bar)
                const { getAttrs } = getUtilities()
                expect(getAttrs().value).toStrictEqual(emptyValue)
                VueValuesStore.value.reset(uid)
                await nextTick()
                expect(getAttrs().value).toStrictEqual(foo)
            })
            it('Reset to initial (if default is not present) from store', async () => {
                VueValuesStore.removeAll()
                VueValuesStore.setInitialValue(uid, bar)
                const { getAttrs } = getUtilities()
                expect(getAttrs().value).toStrictEqual(emptyValue)
                VueValuesStore.value.reset(uid)
                await nextTick()
                expect(getAttrs().value).toStrictEqual(bar)
            })
            it('Reacts to a stored value change', async () => {
                VueValuesStore.removeAll()
                const { getAttrs } = getUtilities({ initialValue: foo })
                expect(getAttrs().value).toStrictEqual(foo)
                VueValuesStore.value.set(uid, bar)
                await nextTick()
                expect(getAttrs().value).toStrictEqual(bar)
            })
        }
        it('Set is ignored when disabled', async () => {
            VueValuesStore.removeAll()
            const { getAttrs } = getUtilities({ disabled: true })
            expect(getAttrs().value).toStrictEqual(emptyValue)
            getAttrs().set(foo)
            await nextTick()
            expect(getAttrs().value).toStrictEqual(emptyValue)
        })
    })
}

testGeneralValue({
    component: Value,
    storedComponent: StoredValue,
    componentName: 'Value',
})
testGeneralValue({
    component: BooleanValue,
    storedComponent: StoredBooleanValue,
    componentName: 'BooleanValue',
    foo: false,
    bar: true,
})
testGeneralValue({
    component: NumberValue,
    storedComponent: StoredNumberValue,
    componentName: 'NumberValue',
    foo: 1,
    bar: 2,
})
testGeneralValue({
    component: StringValue,
    storedComponent: StoredStringValue,
    componentName: 'StringValue',
    foo: 'false',
    bar: 'true',
})
testGeneralValue({
    component: ArrayValue,
    storedComponent: StoredArrayValue,
    componentName: 'ArrayValue',
    emptyValue: [],
    foo: [1, 2],
    bar: [3, 4],
})
testGeneralValue({
    component: SetValue,
    storedComponent: StoredSetValue,
    componentName: 'SetValue',
    emptyValue: new Set(),
    foo: new Set([1, 2]),
    bar: new Set([3, 4]),
})
testGeneralValue({
    component: ObjectValue,
    storedComponent: StoredObjectValue,
    componentName: 'ObjectValue',
    emptyValue: {},
    foo: { one: 1, two: 2 },
    bar: { three: 3, four: 4 },
})
testGeneralValue({
    component: MapValue,
    storedComponent: StoredMapValue,
    componentName: 'MapValue',
    emptyValue: new Map(),
    foo: new Map([[1, 2]]),
    bar: new Map([[3, 4]]),
})

describe('NumberValue (specific)', () => {
    const getUtilities = (props = {}) => getWrapperUtilities(NumberValue, props)

    it('isFirst works correctly', async () => {
        const { getAttrs } = getUtilities({ min: 1, initialValue: 5 })
        expect(getAttrs().isFirst).toStrictEqual(false)
        getAttrs().set(1)
        await nextTick()
        expect(getAttrs().isFirst).toStrictEqual(true)
    })
    it('isLast works correctly', async () => {
        const { getAttrs } = getUtilities({ max: 10, initialValue: 5 })
        expect(getAttrs().isLast).toStrictEqual(false)
        getAttrs().set(10)
        await nextTick()
        expect(getAttrs().isLast).toStrictEqual(true)
    })
    it('Avoid set number less than mininum', async () => {
        const { getAttrs } = getUtilities({ min: 1, initialValue: 5 })
        expect(getAttrs().value).toStrictEqual(5)
        getAttrs().set(-1)
        await nextTick()
        expect(getAttrs().value).toStrictEqual(1)
    })
    it('Avoid set number greater than maximum', async () => {
        const { getAttrs } = getUtilities({ max: 10, initialValue: 5 })
        getAttrs().set(100)
        await nextTick()
        expect(getAttrs().value).toStrictEqual(10)
    })
})

describe('ArrayValue (specific)', () => {
    const getUtilities = (props = {}) => getWrapperUtilities(ArrayValue, props)

    it('First works correctly', async () => {
        const { getAttrs } = getUtilities({ initialValue: [1, 2, 3] })
        expect(getAttrs().first).toStrictEqual(1)
    })
    it('Last works correctly', async () => {
        const { getAttrs } = getUtilities({ initialValue: [1, 2, 3] })
        expect(getAttrs().last).toStrictEqual(3)
    })
})

describe('Value helpers', () => {
    it('BooleanValue.toggle', async () => {
        const { getAttrs } = getWrapperUtilities(BooleanValue, { initialValue: false })
        expect(getAttrs().value).toStrictEqual(false)
        getAttrs().toggle()
        await nextTick()
        expect(getAttrs().value).toStrictEqual(true)
        getAttrs().toggle()
        await nextTick()
        expect(getAttrs().value).toStrictEqual(false)
    })
    it('NumberValue.increment', async () => {
        const { getAttrs } = getWrapperUtilities(NumberValue, { initialValue: 0 })
        expect(getAttrs().value).toStrictEqual(0)
        getAttrs().increment()
        await nextTick()
        expect(getAttrs().value).toStrictEqual(1)
        getAttrs().increment()
        await nextTick()
        expect(getAttrs().value).toStrictEqual(2)
    })
    it('StringValue.append', async () => {
        const { getAttrs } = getWrapperUtilities(StringValue, { initialValue: 'foo' })
        expect(getAttrs().value).toStrictEqual('foo')
        getAttrs().append('bar')
        await nextTick()
        expect(getAttrs().value).toStrictEqual('foobar')
    })
    it('ArrayValue.append', async () => {
        const { getAttrs } = getWrapperUtilities(ArrayValue, { initialValue: ['foo'] })
        expect(getAttrs().value).toStrictEqual(['foo'])
        getAttrs().append('bar')
        await nextTick()
        expect(getAttrs().value).toStrictEqual(['foo', 'bar'])
    })
    it('SetValue.add', async () => {
        const { getAttrs } = getWrapperUtilities(SetValue, { initialValue: new Set(['foo']) })
        expect(getAttrs().value).toStrictEqual(new Set(['foo']))
        getAttrs().add('bar')
        await nextTick()
        expect(getAttrs().value).toStrictEqual(new Set(['foo', 'bar']))
    })
    it('ObjectValue.setValue', async () => {
        const { getAttrs } = getWrapperUtilities(ObjectValue, { initialValue: { foo: 1 } })
        expect(getAttrs().value).toStrictEqual({ foo: 1 })
        getAttrs().setValue('bar', 2)
        await nextTick()
        expect(getAttrs().value).toStrictEqual({ foo: 1, bar: 2 })
    })
    it('MapValue.setValue', async () => {
        const { getAttrs } = getWrapperUtilities(MapValue, { initialValue: new Map([['foo', 1]]) })
        expect(getAttrs().value).toStrictEqual(new Map([['foo', 1]]))
        getAttrs().setValue('bar', 2)
        await nextTick()
        expect(getAttrs().value).toStrictEqual(new Map([['foo', 1], ['bar', 2]]))
    })
})
