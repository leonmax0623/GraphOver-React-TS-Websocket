import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  topics: [],
  statusFilter: 'A',
  filters: {
    complexity: '',
    date: '',
    min_price: null,
    max_price: null,
    topic: '',
  },
  page: 1,
  pageCnt: 1,
  isNextPage: true,
  loading: false,
  catalogType: 'cells',
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setTopics(state, action) {
      state.topics = action.payload;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageCnt(state, action) {
      state.pageCnt = action.payload;
    },
  },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;
