<template>
  <div id="app" class="relative min-h-screen bg-gray-50 grid">
    <BackgroundGray class="h-[7vh]" />
    <div
      class="grid place-items-center row-start p-2 full-screen overflow-hidden mx-4 sm:mx-8"
    >
      <router-view></router-view>
    </div>
    <NotifyComponent />

    <div
      class="absolute bottom-0 w-full bg-transparent pt-2 mb-2 text-center text-xs"
    >
      <span class="text-gray-300">Lista de jogadores © 2023. Um produto</span>
      <span @click="openSite" class="cursor-pointer ml-1 text-violet-300"
        >Wesley Vasconcelos</span
      >
    </div>
  </div>
</template>

<script>
import BackgroundGray from "@/components/backgroundGray/backgroundGray.vue";
import NotifyComponent from "@/components/notification/notificationComponent.vue";

export default {
  name: "App",
  components: {
    NotifyComponent,
    BackgroundGray,
  },
  setup() {
    return {};
  },
};
</script>
<style>
::-webkit-scrollbar {
  height: 6px;
  background: white;
  border-radius: 5px;
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: rgb(9, 9, 10);
  border-radius: 6px;
  width: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(31 41 55);
  width: 8px;
  border-radius: 6px;
}
</style>
