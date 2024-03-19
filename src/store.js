import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { api } from "./slice/apiSlice";
import authSlice from "./slice/authSlice";
import todosSlice from "./slice/todosSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    todos: todosSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
