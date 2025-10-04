import { useState } from "react";

interface SearchBarProps {
  clickSearch: (input: string) => void;
}

export const SearchBar = ({ clickSearch }: SearchBarProps) => {
  const [input, setInput] = useState<string>("");

  return (
    <div>
      <input
        placeholder="Search movie title"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          clickSearch(input);
        }}
      >
        Search
      </button>
    </div>
  );
};
