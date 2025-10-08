"use client";

import React from "react";
import { useState, useEffect } from "react";
import { MovieDetails } from "@/types/movieDetails";
import { fetchMovieDetails } from "@/lib/movie/api";

const cache = new Map<number, MovieDetails>();

interface PageProps {
  params: Promise<{
    movie_id: string;
  }>;
}

export default function MovieDetailPage({ params }: PageProps) {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const resolvedParams = React.use(params);

  useEffect(() => {
    const movieId = Number(resolvedParams.movie_id);
    if (cache.has(movieId)) {
      setMovieDetails(cache.get(movieId) ?? null);
    } else {
      fetchMovieDetails(movieId).then((data) => {
        setMovieDetails(data);
        cache.set(movieId, data);
      });
    }
  }, []);

  if (!movieDetails) return <div>Loading...</div>;
  if (movieDetails)
    return (
      <ul>
        <li>Title: {movieDetails.title}</li>
        <li>Tagline: {movieDetails.tagline}</li>
        <li>Average rating: {movieDetails.vote_average}</li>
        <li>Release: {movieDetails.release_date}</li>
        <li>Runtime: {movieDetails.runtime} minutes</li>
      </ul>
    );
}
