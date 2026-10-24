export default function BlogStats({ blogs }) {
  const totalBlogs = blogs.length;

  const featuredBlogs = blogs.filter(
    (blog) => blog.featured
  ).length;

  const totalReadingTime = blogs.reduce(
    (total, blog) => total + blog.readingTime,
    0
  );

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span>Total Blogs</span>
        <h2>{totalBlogs}</h2>
      </div>

      <div className="stat-card">
        <span>Featured Blogs</span>
        <h2>{featuredBlogs}</h2>
      </div>

      <div className="stat-card">
        <span>Total Reading Time</span>
        <h2>{totalReadingTime} min</h2>
      </div>
    </div>
  );
}