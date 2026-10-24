import BlogCard from "./BlogCard";

export default function BlogList({
  blogs,
  onDelete,
  onToggleFeatured,
}) {
  if (blogs.length === 0) {
    return (
      <div className="empty-state">
        <h3>No blogs found</h3>
        <p>Try another search or add a new blog.</p>
      </div>
    );
  }

  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onDelete={onDelete}
          onToggleFeatured={onToggleFeatured}
        />
      ))}
    </div>
  );
}