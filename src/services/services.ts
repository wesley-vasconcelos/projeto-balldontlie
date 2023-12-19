import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://www.balldontlie.io/api/v1",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
});

async function getPlayers(
  page: number,
  perPage: number,
  searchTerm: string
): Promise<any> {
  try {
    const response = await axiosInstance.get(`/players`, {
      params: {
        page,
        per_page: perPage,
        search: searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar jogadores:", error);
    throw new Error("Erro ao buscar jogadores");
  }
}

async function getPlayerById(playerId: number): Promise<Player | null> {
  try {
    const response = await axiosInstance.get(`/players/${playerId}`);
    return response.data as Player;
  } catch (error) {
    console.error("Erro ao buscar jogador:", error);
    throw new Error("Erro ao buscar jogador");
  }
}

async function editPlayer(
  playerId: number,
  updatedPlayer: Player
): Promise<Player> {
  try {
    const response = await axiosInstance.put(
      `/players/${playerId}`,
      updatedPlayer
    );
    return response.data as Player;
  } catch (error) {
    console.error("Erro ao editar jogador:", error);
    throw new Error("Erro ao editar jogador");
  }
}

async function deletePlayer(playerId: number): Promise<void> {
  try {
    await axiosInstance.delete(`/players/${playerId}`);
    console.log("Jogador excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir jogador:", error);
    throw new Error("Erro ao excluir jogador");
  }
}
async function searchPlayers(term: string): Promise<Player[]> {
  try {
    const response = await axiosInstance.get(`/players?search=${term}`);
    return response.data.data as Player[];
  } catch (error) {
    console.error("Erro ao buscar jogadores:", error);
    throw new Error("Erro ao buscar jogadores");
  }
}
interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
}

export { getPlayers, getPlayerById, editPlayer, deletePlayer, searchPlayers };
