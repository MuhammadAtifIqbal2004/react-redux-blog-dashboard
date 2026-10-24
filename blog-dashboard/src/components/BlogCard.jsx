import React from "react";

function BlogCard({ blog, onDelete, onToggleFeatured }) {
  return (
    <article className="blog-card">
      <div className="card-top">
        <span className="category">{blog.category}</span>

        {blog.featured && (
          <span className="featured">★ Featured</span>
        )}
      </div>

      <h3>{blog.title}</h3>

      <p className="author">By {blog.author}</p>

      <p className="reading-time">
        📖 {blog.readingTime} min read
      </p>

      <div className="card-actions">
        <button
          className="favorite-btn"
          onClick={() => onToggleFeatured(blog.id)}
        >
          {blog.featured ? "★ Featured" : "☆ Feature"}
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(blog.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default React.memo(BlogCard);