"use client"

import { useState, useEffect } from "react";
import { checkAuth } from "@/lib/movie/api";

import Link from "next/link";

export default function Home() {
  const [isAuth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth().then(setAuth);
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Hello API</h1>
        <h2>{isAuth ? "Connected to TMDB" : "Not Connected to TMDB"}</h2>
        <Link href="/movies">Movies</Link>
        <Link href="/pokemon">Pokemon</Link>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        API app
      </footer>
    </div>
  );
}
