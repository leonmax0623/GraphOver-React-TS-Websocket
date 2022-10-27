import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  pureChats: [],
  adminInfo: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setPureChats(state, action) {
      state.pureChats = action.payload;
    },
    setChats(state, action) {
      state.chats = action.payload;
    },
    setAdminInfo(state, action) {
      state.adminInfo = action.payload;
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

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
