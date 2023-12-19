<template>
  <div class="w-full">
    <div class="relative">
      <slot name="icon" />
      <input
        :name="idInput"
        :id="idInput"
        :class="classFormated"
        :placeholder="placeholder"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <slot name="inside"></slot>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    placeholder: {
      type: String,
      default: () => "",
    },
    modelValue: {
      type: String,
      default: () => "",
    },
    classInput: {
      type: String,
      default: () => "",
    },
    idInput: {
      type: String,
      default: () => "",
    },
    hiddenInput: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: ["update:modelValue"],

  setup(props) {
    const classFormated = computed(() => {
      const classBase =
        "block w-full bg-white border border-gray-300 rounded-md py-2 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-violet-500 sm:text-sm";
      const classHidden =
        "block w-full bg-white py-2 pr-3 text-sm leading-5 font-normal focus:outline-none border-none focus:ring-white";
      if (props.hiddenInput) {
        return classHidden + " " + props.classInput;
      } else {
        return classBase + " " + props.classInput;
      }
    });
    return {
      classFormated,
    };
  },
};
</script>
