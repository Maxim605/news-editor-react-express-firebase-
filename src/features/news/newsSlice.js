// src/features/news/newsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [], 
  currentArticle: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addArticle: (state, action) => {
      state.articles.push(action.payload);
    },
    updateArticle: (state, action) => {
      const index = state.articles.findIndex((article) => article.id === action.payload.id);
      if (index !== -1) {
        state.articles[index] = action.payload;
      }
    },
    setCurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
    },
  },
});


export const { addArticle, updateArticle, setCurrentArticle } = newsSlice.actions;
export default newsSlice.reducer;
