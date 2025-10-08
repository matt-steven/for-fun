"use client"

import Link from "next/link";

export default function HomePage() {
  return (
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Link href="/movies">Movies</Link>
          <Link href="/pokemon">Pokemon</Link>
      </div>
  );
}
