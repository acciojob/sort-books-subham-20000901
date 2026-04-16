import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async () => {
    const res = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=harry+potter"
    );

    const data = await res.json();
    return data.items || [];
})

const bookSlice = createSlice({
    name:"books",
    initialState:{
        list: [],
        loading: false,
        error: null,
        sortBy: "title",
        order: "asc",
    },
    reducers : {
        setSortBy: (state,action) => {
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
            state.error = null;
        })
        .addCase(fetchBooks.fulfilled, (state,action) => {
            state.loading = false;
            state.list = action.payload;
        })
        .addCase(fetchBooks.rejected,(state) => {
            state.loading = false;
            state.error = "Error"
        });
    },
});

export const {setSortBy, setOrder} = bookSlice.actions;
export default bookSlice.reducer;
