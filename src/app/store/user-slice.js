import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  uid64: '',
  resetToken: '',
  friends: [],
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    },
    setUserAvatar(state, action) {
      state.avatar = action.payload;
    },
    setUid64(state, action) {
      state.uid64 = action.payload;
    },
    setResetToken(state, action) {
      state.resetToken = action.payload;
    },
    setFriends(state, action) {
      state.friends = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
