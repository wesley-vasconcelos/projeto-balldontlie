<template>
  <div
    v-if="selectedPlayer"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center"
  >
    <div
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      :class="{ 'sm:scale-95': modalOpen }"
    >
      <form @submit.prevent="submitForm" class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Editar Jogador</h2>
        <div class="mb-4">
          <label for="name" class="block font-semibold mb-1">Nome:</label>
          <input
            v-model="editedPlayer.first_name"
            type="text"
            id="name"
            class="border p-2 rounded w-full"
          />
        </div>
        <div class="mb-4">
          <label for="position" class="block font-semibold mb-1"
            >Posição:</label
          >
          <input
            v-model="editedPlayer.position"
            type="text"
            id="position"
            class="border p-2 rounded w-full"
          />
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Salvar
          </button>
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-100 rounded ml-2"
          >
            Fechar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { editPlayer } from "@/services/services";
import { notify } from "notiwind";

interface Player {
  first_name: string;
  position: string;
}

export default defineComponent({
  props: {
    selectedPlayer: Object as () => Player | null,
    modalOpen: Boolean,
  },
  data() {
    return {
      editedPlayer: { ...this.selectedPlayer } as Player,
    };
  },
  watch: {
    selectedPlayer(newValue) {
      this.editedPlayer = { ...newValue } as Player;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async submitForm() {
      try {
        // Chamada à API para editar o jogador
        const updatedPlayer = await editPlayer(
          this.selectedPlayer.id,
          this.editedPlayer
        );
        console.log("Jogador editado:", updatedPlayer);
        //  ação após a edição
      } catch (error) {
        notify(
          {
            group: "white",
            title: `${error}`,
            type: "error",
          },
          4000
        );
      }

      this.closeModal();
    },
  },
});
</script>
