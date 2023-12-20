<template>
  <div class="ring-black rounded-lg">
    <div class="flex items-center justify-center flex-col">
      <div class="relative">
        <Input
          :model-value="searchTerm"
          @input="searchPlayers"
          classInput="classBase p-2"
          class="w-[200px] mb-4 mt-4 absolute right-8"
          :hiddenInput="false"
          @update:model-value="(newValue) => (searchTerm = newValue)"
          placeholder="Buscar..."
        >
        </Input>
        <div class="px-8 mt-[70px]">
          <div
            class="shadow ring-1 ring-black ring-opacity-5 rounded-lg mb-5 overflow-y-scroll h-auto p-[32px]"
            style="max-height: calc(100vh - 300px); padding-top: 8px"
          >
            <table class="table-fixed divide-y divide-gray-300">
              <thead>
                <tr class="pb-4">
                  <th @click="sortPlayers('first_name')">Nome</th>
                  <th @click="sortPlayers('position')">Posição</th>
                  <th @click="sortPlayers('height_inches')">
                    Polegadas de altura
                  </th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <br />
                <tr v-for="(player, index) in players" :key="index">
                  <td>{{ player.first_name }} {{ player.last_name }}</td>
                  <td>{{ player.position || "-" }}</td>
                  <td>{{ player.height_inches || "-" }}</td>
                  <td>
                    <div
                      class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
                    >
                      <button
                        @click="openModal(player)"
                        class="w-full sm:w-auto px-2 py-1 bg-gray-500 text-white rounded"
                      >
                        Editar
                      </button>
                      <button
                        @click="confirmDelete(player)"
                        class="w-full sm:w-auto px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-4">
        <button
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="px-3 py-1 bg-gray-300 rounded mr-4"
        >
          Anterior
        </button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
          class="px-3 py-1 bg-gray-300 rounded ml-4"
        >
          Próxima
        </button>
      </div>
    </div>
  </div>
  <PlayerModal
    :selectedPlayer="selectedPlayer"
    :modalOpen="modalOpen"
    @close="closeModal"
  />
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
