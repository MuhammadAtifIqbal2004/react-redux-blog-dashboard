import { useMemo } from "react";

export default function useFilteredBlogs(
  blogs,
  searchText,
  selectedCategory
) {
  return useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchText.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchText, selectedCategory]);
}