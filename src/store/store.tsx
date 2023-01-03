import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { usersApi } from "../services/usersApi";
import userSlice, { userAuth } from "./slices/userSlice";

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: userAuth,
  effect: async (action, listenerApi) => {
    console.table({ payload: action.payload });
    //listener provide access to
    // state
    // dispatch
    // cancelActiveListeners() Can cancel other running instances
    listenerApi.dispatch(userAuth(false));
    // refetch data base on a condition
    // re-auth app
  },
});

export const store = configureStore({
  reducer: {
    user: userSlice,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  // Middleware allows you to intercept every action sent to the reducer so
  // you can make changes to the action or cancel the action.
  // Middleware helps you with logging, errors, making asynchronous requests, and a whole lot more.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
