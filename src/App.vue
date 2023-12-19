<template>
  <div class="p-6 bg-gray-50">
    <Input
      :model-value="searchTerm"
      @input="searchPlayers"
      classInput="alredy_register text-gray-700 "
      :hiddenInput="true"
      @update:model-value="(newValue) => (searchTerm = newValue)"
    >
      <template #icon>
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </template>
    </Input>
    <div class="w-full">
      <table class="w-full">
        <thead>
          <tr>
            <th @click="sortPlayers('first_name')">Nome</th>
            <th @click="sortPlayers('position')">Posição</th>
            <th @click="sortPlayers('height_inches')">Polegadas de altura</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in players" :key="index">
            <td>{{ player.first_name }} {{ player.last_name }}</td>
            <td>{{ player.position || "-" }}</td>
            <td>{{ player.height_inches || "-" }}</td>
            <td>
              <button
                @click="confirmDelete(player)"
                class="px-2 py-1 bg-red-500 text-white rounded mr-2"
              >
                Excluir
              </button>
              <button
                @click="openModal(player)"
                class="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Editar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PlayerModal
      :selectedPlayer="selectedPlayer"
      :modalOpen="modalOpen"
      @close="closeModal"
    />
    <div class="flex justify-between mt-4">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="px-3 py-1 bg-gray-300 rounded"
      >
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        class="px-3 py-1 bg-gray-300 rounded"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayerModal from "@/components/PlayerModal.vue";
import { getPlayers, deletePlayer } from "@/services/services";
import Input from "@/components/input/input.vue";
import { SearchIcon } from "@heroicons/vue/solid";

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
}

export default defineComponent({
  components: {
    PlayerModal,
    Input,
    SearchIcon,
  },
  data() {
    return {
      searchTerm: "",
      players: [] as Player[],
      currentPage: 1,
      totalPages: 1,
      perPage: 25, // Results per page
      selectedPlayer: null as Player | null,
      modalOpen: false,
    };
  },
  async created() {
    try {
      await this.fetchPlayers();
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
    }
  },
  computed: {
    filteredPlayers(): Player[] {
      return this.players;
    },
  },
  methods: {
    async fetchPlayers() {
      try {
        const response = await getPlayers(
          this.currentPage,
          this.perPage,
          this.searchTerm
        );
        this.players = response.data;
        this.totalPages = response.meta.total_pages;
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
      }
    },
    async searchPlayers() {
      this.currentPage = 1;
      await this.fetchPlayers();
    },
    async changePage(page: number) {
      this.currentPage = page;
      await this.fetchPlayers();
    },
    openModal(player: Player) {
      this.selectedPlayer = player;
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
      this.selectedPlayer = null;
    },
    async confirmDelete(player: Player) {
      if (
        confirm(
          `Tem certeza que deseja excluir ${player.first_name} ${player.last_name}?`
        )
      ) {
        try {
          await deletePlayer(player.id);
          const index = this.players.findIndex((p) => p.id === player.id);
          if (index !== -1) {
            this.players.splice(index, 1);
          }
          console.log("Jogador excluído com sucesso!");
        } catch (error) {
          console.error("Erro ao excluir jogador:", error);
        }
      }
    },
    sortPlayers(field: keyof Player) {
      this.players.sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      });
    },
  },
});
</script>
