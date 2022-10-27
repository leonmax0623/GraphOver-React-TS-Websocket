import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes(state, action) {
      state.notes = action.payload;
    },
    // setUserData(state, action) {
    //   state.user = action.payload;
    // },
    // setUserAvatar(state, action) {
    //   state.avatar = action.payload;
    // },
    // setNewChat(state, action) {
    //   state.chats[action.payload.id] = { data: action.payload.data, page: 1 };
    // },
    // setChat(state, action) {
    //   state.chats[action.payload.id].data = action.payload.data;
    // },
    // addMessage(state, action) {
    //   const _messages = state.chats[action.payload.id].data.messages;
    //   state.chats[action.payload.id].data.messages = [..._messages, action.payload.data];
    // },
    // setChatPage(state, action) {
    //   state.chats[action.payload.id].page = action.payload.data;
    // },
  },
});

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
