<template>
  <Disclosure as="nav" class="bg-gray-800">
    <div
      class="flex flex-row justify-between items-center bg-gray-800 w-full"
      style="height: 50px;  3; margin-bottom: -200px"
    >
      <h1 class="text-white font-bold text-2xl p-4">Lista de jogadores</h1>
    </div>
  </Disclosure>
</template>
<script>
import { Disclosure } from "@headlessui/vue";

export default {
  name: "backgroundGray",
  components: {
    Disclosure,
  },
};
</script>
