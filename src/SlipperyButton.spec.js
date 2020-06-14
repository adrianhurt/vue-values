import { mount } from '@vue/test-utils'
import SlipperyButton from './SlipperyButton.vue'

describe('SlipperyButton', () => {
    it('It renders correctly', () => {
        const wrapper = mount(SlipperyButton)
        expect(wrapper.findAll('button')).toHaveLength(1)
    })
})
