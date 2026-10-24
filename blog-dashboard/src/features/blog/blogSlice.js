import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const initialBlogs = [
  {
    id: 1,
    title: "Understanding React Hooks",
    category: "React",
    author: "Ali Khan",
    readingTime: 6,
    featured: true,
  },
  {
    id: 2,
    title: "Redux Toolkit Basics",
    category: "Redux",
    author: "Sara Ahmed",
    readingTime: 8,
    featured: false,
  },
  {
    id: 3,
    title: "Building Blog UI in React",
    category: "React",
    author: "Hamza Malik",
    readingTime: 5,
    featured: false,
  },
  {
    id: 4,
    title: "Node.js and Express Introduction",
    category: "Node",
    author: "Ayesha Noor",
    readingTime: 7,
    featured: true,
  },
];

// Simulated API request
export const loadBlogs = createAsyncThunk(
  "blogs/loadBlogs",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return initialBlogs;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: initialBlogs,
    searchText: "",
    selectedCategory: "All",
    loading: false,
    error: null,
  },
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push({
        ...action.payload,
        id: Date.now(),
        featured: false,
      });
    },

    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter(
        (blog) => blog.id !== action.payload
      );
    },

    toggleFeatured: (state, action) => {
      const blog = state.blogs.find(
        (item) => item.id === action.payload
      );

      if (blog) {
        blog.featured = !blog.featured;
      }
    },

    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(loadBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load blogs";
      });
  },
});

export const {
  addBlog,
  deleteBlog,
  toggleFeatured,
  setSearchText,
  setCategory,
} = blogSlice.actions;

export default blogSlice.reducer;