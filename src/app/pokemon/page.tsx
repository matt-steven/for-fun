"use client"

import { fetchPokemon } from "@/lib/pokemon/api";
import { Pokemon } from "@/types/pokemon";
import { useState, useEffect } from "react";

export default function Pokemons() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 20;
  const [search, setSearch] = useState<string>("");

  function getPage(page: number): Pokemon[] {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return pokemon.slice(start, end);
  }

  function filtered(list: Pokemon[]) {
    return list.filter((poke) =>
      poke.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  useEffect(() => {
    fetchPokemon().then((data) => {
      setPokemon(data);
      setTotalPages(Math.ceil(data.length / pageSize));
    });
  }, []);
  if (pokemon.length !== 0)
    return (
      <div>
        <input
          placeholder="filter results"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <ul>
          {filtered(getPage(page)).map((poke) => (
            <li key={poke.name}>{poke.name}</li>
          ))}
        </ul>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          next
        </button>
      </div>
    );
}
