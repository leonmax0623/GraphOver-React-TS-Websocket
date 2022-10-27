import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questData: [],
  questStatus: { 0: 'E' },
  questVoteStatus: { 0: 'N' },
  voited: { 0: 'N' },
};

export const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    setQuestData(state, action) {
      state.questData = action.payload;
    },
    setQuestStatus(state, action) {
      const { id, data } = action.payload;
      state.questStatus = { ...state.questStatus, [id]: data };
    },
    setQuestVoteStatus(state, action) {
      const { id, data } = action.payload;
      state.questVoteStatus = { ...state.questVoteStatus, [id]: data };
    },
    setQuestVoited(state, action) {
      const { id, data } = action.payload;
      state.voited = { ...state.voited, [id]: data };
    },
  },
});

export const questActions = questSlice.actions;
export default questSlice.reducer;
