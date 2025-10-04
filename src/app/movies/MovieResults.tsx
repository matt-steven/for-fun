import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import { Pagination } from "@/components/Pagination";
import { searchMovies } from "@/lib/movie/api";
import Link from "next/link";

type SearchProps = {
  searchTerm: string;
  favourites: number[];
  clickFavourite: (movieId: number) => void;
};

export default function MovieResults({
  searchTerm,
  favourites,
  clickFavourite,
}: SearchProps) {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (searchTerm !== search) {
      setPage(1);
    }
    if (searchTerm !== "") {
      try {
        searchMovies(searchTerm, page).then(setResults);
        setSearch(searchTerm);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  }, [searchTerm, page]);

  if (searchTerm && results.length === 0) return <div>Loading...</div>;

  if (searchTerm)
    return (
      <div>
        <table style={{ border: "2px solid blue" }}>
          <thead>
            <tr>
              <th style={{ fontWeight: "bold" }}>Name</th>
              <th style={{ fontWeight: "bold" }}>Overview</th>
              <th style={{ fontWeight: "bold" }}>Favourite?</th>
            </tr>
          </thead>
          <tbody>
            {results.map((movie) => (
              <tr key={movie.id}>
                <td style={{ borderBottom: "2px solid blue" }}>
                  <Link href={`/movies/${movie.id}/`}>{movie.title}</Link>
                </td>
                <td style={{ borderBottom: "2px solid blue" }}>
                  {movie.overview}
                </td>
                <td style={{ borderBottom: "2px solid blue" }}>
                  <button onClick={() => clickFavourite(movie.id)}>
                    {favourites.includes(movie.id)
                      ? "Remove from Favourites"
                      : "Add to Favourites"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          page={page}
          setPage={setPage}
          hasNext={results.length === 20}
        />
      </div>
    );
}
