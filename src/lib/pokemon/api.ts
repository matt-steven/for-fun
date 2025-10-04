import { Pokemon } from "@/types/pokemon";

export async function fetchPokemon(): Promise<Pokemon[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
  if (!response.ok) {
    throw new Error("Failed to fetch pokemon");
  }
  const data = await response.json();
  return data.results;
}