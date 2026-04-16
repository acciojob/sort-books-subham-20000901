import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { fetchBooksAPI } from './bookApi';

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    return await fetchBooksAPI();
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
    sortBy: "title",
    order: "asc",
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch books";
      });
  },
});

export const { setSortBy, setOrder } = booksSlice.actions;
export default booksSlice.reducer;
