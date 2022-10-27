import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskList: {},
  authorList: {},
  author_team_id: {},
  playerList: {},
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskList(state, action) {
      const { quest_id, data } = action.payload;
      state.taskList = { ...state.taskList, [quest_id]: data };
    },
    setAuthorList(state, action) {
      const { quest_id, data } = action.payload;
      state.authorList = { ...state.authorList, [quest_id]: data };
    },
    setPlayerList(state, action) {
      const { quest_id, data } = action.payload;
      state.playerList = { ...state.playerList, [quest_id]: data };
    },
    setAuthorTeamId(state, action) {
      const { quest_id, data } = action.payload;
      state.author_team_id = { ...state.author_team_id, [quest_id]: data };
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice.reducer;
