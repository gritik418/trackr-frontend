import organizationApi from "@/features/organization/organization.api";
import organizationsSlice from "@/features/organization/organization.slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [organizationsSlice.reducerPath]: organizationsSlice.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(organizationApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
