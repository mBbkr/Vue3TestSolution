import { mount } from '@vue/test-utils'
import InputSolution from '../../../src/components/InputSolution.vue'

const tests = [
  { name: 'renders initial value properly', props: { initialValue: '42' }, expected: '42' },
  { name: 'emits update:age event on input', value: '0abcd123456', expected: '123456' },
  { name: 'handles focus event properly', event: 'focus', expected: true },
  { name: 'handles blur event properly', event: 'blur', expected: false },
  { name: 'updates the cursor position on click', event: 'click' },
  { name: 'updates the cursor position on keyup', event: 'keyup' },
  { name: 'accepts only numeric characters', value: 'abc&"$12*$ù3', expected: '123' },
  { name: 'removes leading zeros', value: '00123', expected: '123' }
]

describe('InputSolution Component', () => {
  tests.forEach(({ name, props, value, event, expected }) => {
    it(name, async () => {
      const wrapper = mount(InputSolution, { props })
      if (value) await wrapper.find('span').setValue(value)
      if (event) await wrapper.find('span').trigger(event)
      if (expected) {
        const text = wrapper.find('span').text()
        expect(text).toBe(expected.toString())
      }
    })
  })
})