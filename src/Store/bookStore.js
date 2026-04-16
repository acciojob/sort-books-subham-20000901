import {configureStore} from '@reduxjs/toolkit';
import bookReducer from '../State/bookSlice';

const bookStore = configureStore({
    reducer: {
       books: bookReducer,
    }   
});

export default bookStore;