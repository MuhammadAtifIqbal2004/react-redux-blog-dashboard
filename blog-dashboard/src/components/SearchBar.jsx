import { useEffect, useRef } from "react";

export default function SearchBar({
  searchText,
  setSearchText,
  selectedCategory,
  setCategory,
}) {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <div className="search-bar">
      <input
        ref={searchRef}
        type="text"
        placeholder="Search by title or author..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="React">React</option>
        <option value="Redux">Redux</option>
        <option value="Node">Node</option>
      </select>
    </div>
  );
}