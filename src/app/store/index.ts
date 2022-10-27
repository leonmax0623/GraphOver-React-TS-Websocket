import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { unauthenticatedMiddleware } from '../middleware/unauth-middleware';
import userReducer from './user-slice';
import chatReducer from './chat-slice';
import notesReducer from './notes-slice';
import aucReducer from './auc-slice';
import filesReducer from './files-slice';
import ordersReducer from './orders-slice';
import questReducer from './quest-slice';
import notificateReducer from './notificate-slice';
import tasksReducer from './task-slice';

const rootReducer = combineReducers({
  // [baseAPI.reducerPath]: baseAPI.reducer,
  userReducer,
  chatReducer,
  aucReducer,
  notesReducer,
  filesReducer,
  ordersReducer,
  questReducer,
  notificateReducer,
  tasksReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([]),
    // }).concat([unauthenticatedMiddleware]),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
