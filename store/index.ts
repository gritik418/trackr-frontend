import organizationApi from "@/features/organization/organization.api";
import organizationsSlice from "@/features/organization/organization.slice";
import workspaceApi from "@/features/workspace/workspace.api";
import workspacesSlice from "@/features/workspace/workspace.slice";
import projectApi from "@/features/project/project.api";
import projectsSlice from "@/features/project/project.slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [organizationsSlice.name]: organizationsSlice.reducer,
    [workspacesSlice.name]: workspacesSlice.reducer,
    [projectsSlice.name]: projectsSlice.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(organizationApi.middleware)
      .concat(workspaceApi.middleware)
      .concat(projectApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
