<template>
  <div class="ring-black rounded-lg overflow-hidden">
    <div class="flex items-center justify-center flex-col">
      <div class="relative">
        <Input
          :model-value="searchTerm"
          @input="searchPlayers"
          classInput="classBase p-2"
          class="max-w-[200px] mb-4 mt-4 absolute right-8"
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
            <TableComponent
              :players="players"
              :currentPage="currentPage"
              :totalPages="totalPages"
              :searchTerm="searchTerm"
              :searchPlayers="searchPlayers"
              :changePage="changePage"
              :openModal="openModal"
              :confirmDelete="confirmDelete"
              :sortPlayers="sortPlayers"
            />
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

  <Loading v-if="isLoading" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayerModal from "@/components/PlayerModal.vue";
import { getPlayers, deletePlayer } from "@/services/services";
import Input from "@/components/input/input.vue";
import { SearchIcon } from "@heroicons/vue/solid";
import TableComponent from "@/components/table/table.vue";
import Loading from "@/components/loading/loadingComponent.vue";
import { notify } from "notiwind";

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
    TableComponent,
    Loading,
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
      isLoading: false,
    };
  },
  async created() {
    try {
      await this.fetchPlayers();
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
  },
  computed: {
    filteredPlayers(): Player[] {
      return this.players;
    },
  },
  methods: {
    async fetchPlayers() {
      this.isLoading = true;
      try {
        const response = await getPlayers(
          this.currentPage,
          this.perPage,
          this.searchTerm
        );
        this.players = response.data;
        this.totalPages = response.meta.total_pages;
        this.isLoading = false;
        notify(
          {
            group: "white",
            title: `Lista de jogadores carregada com sucesso`,
            type: "success",
          },
          4000
        );
      } catch (error) {
        this.isLoading = false;

        notify(
          {
            group: "white",
            title: `${error}`,
            type: "error",
          },
          4000
        );
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
          notify(
            {
              group: "white",
              title: `${error}`,
              type: "error",
            },
            4000
          );
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
