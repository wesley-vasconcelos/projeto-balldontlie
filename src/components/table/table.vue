<template>
  <table class="table-fixed divide-y divide-gray-300">
    <thead>
      <tr class="pb-4">
        <th @click="sortPlayers('first_name')">Nome</th>
        <th @click="sortPlayers('position')">Posição</th>
        <th class="pl-4" @click="sortPlayers('height_inches')">
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
        <td class="pl-4">{{ player.height_inches || "-" }}</td>
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
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

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
  props: {
    players: {
      type: Array as PropType<Player[]>,
      required: true,
    },
    currentPage: {
      type: Number as PropType<number>,
      required: true,
    },
    totalPages: {
      type: Number as PropType<number>,
      required: true,
    },
    searchTerm: {
      type: String as PropType<string>,
      required: true,
    },
    searchPlayers: {
      type: Function as PropType<() => Promise<void>>,
      required: true,
    },
    changePage: {
      type: Function as PropType<(page: number) => Promise<void>>,
      required: true,
    },
    openModal: {
      type: Function as PropType<(player: Player) => void>,
      required: true,
    },
    confirmDelete: {
      type: Function as PropType<(player: Player) => Promise<void>>,
      required: true,
    },
    sortPlayers: {
      type: Function as PropType<(field: keyof Player) => void>,
      required: true,
    },
  },
});
</script>
