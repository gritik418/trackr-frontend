import organizationApi from "@/features/organization/organization.api";
import organizationsSlice from "@/features/organization/organization.slice";
import workspaceApi from "@/features/workspace/workspace.api";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [organizationsSlice.reducerPath]: organizationsSlice.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(organizationApi.middleware)
      .concat(workspaceApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
