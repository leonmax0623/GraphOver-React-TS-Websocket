import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationList: [],
  newNotificationCount: 0,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationList(state, action) {
      state.notificationList = action.payload;
    },
    addNotificationItem(state, action) {
      state.notificationList = [...state.notificationList, action.payload];
    },
    removeNotificationItem(state, action) {
      state.notificationList = state.notificationList.filter(n => n !== action.payload);
    },
    setNewNotificationCount(state, action) {
      state.newNotificationCount = action.payload;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
