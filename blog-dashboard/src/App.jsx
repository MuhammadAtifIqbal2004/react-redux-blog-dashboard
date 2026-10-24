import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import BlogList from "./components/BlogList";
import BlogStats from "./components/BlogStats";

import useFilteredBlogs from "./hooks/useFilteredBlogs";

import {
  addBlog,
  deleteBlog,
  toggleFeatured,
  setSearchText,
  setCategory,
  loadBlogs,
} from "./features/blog/blogSlice";

export default function App() {
  const dispatch = useDispatch();

  const {
    blogs,
    searchText,
    selectedCategory,
    loading,
    error,
  } = useSelector((state) => state.blogs);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setNewCategory] = useState("React");
  const [readingTime, setReadingTime] = useState(5);

  const filteredBlogs = useFilteredBlogs(
    blogs,
    searchText,
    selectedCategory
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteBlog(id));
    },
    [dispatch]
  );

  const handleToggleFeatured = useCallback(
    (id) => {
      dispatch(toggleFeatured(id));
    },
    [dispatch]
  );

  const handleSearch = useCallback(
    (value) => {
      dispatch(setSearchText(value));
    },
    [dispatch]
  );

  const handleCategoryFilter = useCallback(
    (value) => {
      dispatch(setCategory(value));
    },
    [dispatch]
  );

  const handleAddBlog = (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      return;
    }

    dispatch(
      addBlog({
        title: title.trim(),
        author: author.trim(),
        category,
        readingTime: Number(readingTime),
      })
    );

    setTitle("");
    setAuthor("");
    setReadingTime(5);
  };

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="welcome">
          <div>
            <h2>Dashboard Overview</h2>
            <p>Manage, search, and organize your blog posts.</p>
          </div>

          <button
            className="reload-btn"
            onClick={() => dispatch(loadBlogs())}
            disabled={loading}
          >
            {loading ? "Loading..." : "Simulate API Load"}
          </button>
        </section>

        <BlogStats blogs={blogs} />

        <section className="panel">
          <h2>Search Blogs</h2>

          <SearchBar
            searchText={searchText}
            setSearchText={handleSearch}
            selectedCategory={selectedCategory}
            setCategory={handleCategoryFilter}
          />
        </section>

        <section className="panel">
          <h2>Add New Blog</h2>

          <form className="add-form" onSubmit={handleAddBlog}>
            <input
              type="text"
              placeholder="Blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />

            <select
              value={category}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="React">React</option>
              <option value="Redux">Redux</option>
              <option value="Node">Node</option>
            </select>

            <input
              type="number"
              min="1"
              max="120"
              value={readingTime}
              onChange={(e) => setReadingTime(e.target.value)}
              aria-label="Reading time in minutes"
              required
            />

            <button type="submit">+ Add Blog</button>
          </form>
        </section>

        {loading && (
          <p className="status-message">Loading blogs from the API...</p>
        )}

        {error && (
          <p className="error-message">Error: {error}</p>
        )}

        <section className="blog-section">
          <div className="section-heading">
            <h2>All Blogs</h2>
            <span>{filteredBlogs.length} posts</span>
          </div>

          <BlogList
            blogs={filteredBlogs}
            onDelete={handleDelete}
            onToggleFeatured={handleToggleFeatured}
          />
        </section>
      </main>

      <footer className="footer">
        React Blog Dashboard · Built with React and Redux Toolkit
      </footer>
    </div>
  );
}