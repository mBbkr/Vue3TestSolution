<template>
  <div class="max-w-lg mx-auto py-20">
    <div class="flex items-center gap-2">
      <div class="profileImg rounded-full border-2 border-transparent" :class="{ 'border-label-color': activeFocus }">
        <div class="p-[2px]">
          <div class="rounded-full bg-cover bg-center w-14 h-14" :style="{ 'background-image': `url('${student.image}')` }"></div>
        </div>
      </div>
      <div>
        <label class="uppercase font-bold" :class="{ active: activeFocus, 'text-label-color': activeFocus }">{{ student.name }} is</label>
        <div class="flex gap-2 mt-1">
          <InputSolution 
            :age="student.age"
            :useDebounce="useDebounce"
            @update:age="handleModelValueUpdate"
            @focusChanged="handleFocusChanged" 
            class="inputSolution border rounded-lg min-w-[72px] px-2 py-1"
            :class="{ 'border-white': activeFocus }"
          />
          <div class="text mt-1">hours old</div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 border rounded-sm mt-[220px]">
      <p class="text-sm text-center p-2">With Debounce Function : <button @click="useDebounce = !useDebounce" class="capitalize text-white py-1 px-3 rounded-full" :class="{ 'bg-green-500 hover:bg-green-700': useDebounce, 'bg-red-500 hover:bg-red-700': !useDebounce }">{{ useDebounce }}</button></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import InputSolution from '@/components/InputSolution.vue'
import DogWithStyle from '@/assets/dogWithStyle.png'

const activeFocus = ref(false)
const useDebounce = ref(true)

const student = reactive<{
  name: string
  age: number | 0
  image: string | null
}>({
  name: 'Hugh',
  age: 7,
  image: DogWithStyle,
})

const handleModelValueUpdate = (updatedValue: number) => {
  student.age = (updatedValue) ? updatedValue : 0
  console.log('Age of student', student.age)
}

const handleFocusChanged = (isActive: boolean) => {
  activeFocus.value = isActive
}

</script>

<style lang="scss" scoped>
$primary-color: #1d0f4d;
$label-color: #3b14d8;
$outline-color: #8d71f0;

.profileImg {
  &.border-label-color {
    border-color: $label-color;
  }
}

label {
  &.active, &.text-label-color {
    color: $label-color;
  }
}

.inputSolution[contenteditable]:focus {
  color: $primary-color;
  font-weight: 600;
  outline: 2px solid $outline-color;
}
</style>