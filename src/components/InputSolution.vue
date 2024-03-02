<template>
  <!-- Contenteditable span element -->
  <span
    contenteditable="true"
    @input="handleInputThrottled"
    @focus="handleFocus"
    @click="handleClick"
    @keyup="handleKeyUp"
    @blur="handleBlur"
  >{{ initialValue }}</span>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'

// Define emitted events
const emit = defineEmits(['update:age', 'focusChanged'])

// Define props
const props = defineProps({
  age: {
    type: Number,
    default: 0
  },
  useDebounce: {
    type: Boolean,
    default: false
  }
})

// Define initial value reference. Into String because from age to new value, it can have spaces.
const initialValue = ref(props.age.toString())

// Initialize diffValue to track the difference in length between the new and initial values and cursorPosition
let diffValue = 0
const cursorPosition = ref(0)

// Define handleInput function
const handleInput = (e: Event): void => {
  if (e.target instanceof HTMLElement && e.target.textContent !== null) {

    /* 1st replace Regex pattern to remove non-digit characters and leading zeros
       2nd Regex pattern to add spaces between groups of three digits
    */
    const newValue = e.target.textContent
      .replace(/[^\d]|^0+/gu, '')
      .replace(/\B(?=(\d{3})+(?!\d))/gu, ' ')

    // Update value in DOM
    e.target.textContent = newValue

    // Check if difference in length between the new and initial values and cursorPosition
    if (diffValue < 0) diffValue = 0
    diffValue = (newValue.length - initialValue.value.length)

    // Set cursor position
    setCaretPosition(e.target, (cursorPosition.value + diffValue))
    initialValue.value = newValue

    // Emit update:age event
    emit('update:age', parseInt(newValue.replace(/\D/gu, '')))
  }
}

// Define debounced handleInput function
const debouncedHandleInput = computed(() => {
  return (props.useDebounce) ? debounce(handleInput, 125) : handleInput
})

// Define event handling functions
const handleInputThrottled = (e: Event) => {
  debouncedHandleInput.value(e) // Call debounced version of handleInput
}

const handleFocus = (e: FocusEvent): void => {
  if (e.target instanceof Element) {
    cursorPosition.value = getCaretPosition(e.target)
    emit('focusChanged', true)
  }
}

const handleClick = (e: MouseEvent): void => {
  if (e.target instanceof Element)
    cursorPosition.value = getCaretPosition(e.target)
}

const handleKeyUp = (e: KeyboardEvent): void => {
  if (e.target instanceof Element && e.target.textContent !== null) {
    cursorPosition.value = getCaretPosition(e.target)
    initialValue.value = e.target.textContent
  }
}

const handleBlur = (): void => {
  emit('focusChanged', false)
}

// Function to get caret position
function getCaretPosition(element: Element): number {
  const selection = window.getSelection()

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)

    if (range.commonAncestorContainer.parentNode === element)
      return range.startOffset
  }
  return 0
}

// Function to set caret position
function setCaretPosition(element: Element, position: number): void {
  const range = document.createRange()
  const selection = window.getSelection()

  if (selection && element.childNodes.length > 0) {
    range.setStart(element.childNodes[0], position)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

// Function to define a debounce function to throttle input events
function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
</script>