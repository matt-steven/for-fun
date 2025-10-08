"use client";

import { SearchBar } from "@/components/SearchBar";
import MovieResults from "./MovieResults";
import { useEffect, useState } from "react";
import { fetchFavourites, sendFavourite } from "@/lib/movie/api";

export default function MoviesPage() {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");

  function toggleFavourite(movieId: number) {
    let isFavourite: boolean = false;
    if (favourites.includes(movieId)) {
      setFavourites((prev) => prev.filter((n) => n !== movieId));
    } else {
      setFavourites((prev) => [...prev, movieId]);
      isFavourite = true;
    }
    if (!sendFavourite(movieId, isFavourite)) {
      console.log("fail :(");
      //undo above things
    }
  }

  useEffect(() => {
    fetchFavourites().then(setFavourites);
  }, []);

  return (
    <div>
      <SearchBar clickSearch={setSearch} />
      <MovieResults
        searchTerm={search}
        favourites={favourites}
        clickFavourite={toggleFavourite}
      />
    </div>
  );
}
