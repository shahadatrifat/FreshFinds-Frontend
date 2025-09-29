import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Search by name or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none w-full"
      />
      <button
        type="submit"
        className="bg-emerald text-beige px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
      >
        <Search size={18} /> Search
      </button>
    </form>
  );
};

export default SearchBar;
