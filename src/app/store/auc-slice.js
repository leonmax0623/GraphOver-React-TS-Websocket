import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  terms: [],
};

export const aucSlice = createSlice({
  name: 'auc',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setTerms(state, action) {
      state.terms = action.payload;
    },
  },
});

export const aucActions = aucSlice.actions;
export default aucSlice.reducer;
