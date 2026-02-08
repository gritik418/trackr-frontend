import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";
import workspaceApi from "./workspace.api";
import { WorkspaceState } from "./workspace.interface";

const initialState: WorkspaceState = {
  workspace: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        workspaceApi.endpoints.getWorkspaceDetails.matchFulfilled,
        (state, action) => {
          if (action.payload.workspace) {
            state.workspace = action.payload.workspace;
          }
        },
      )
      .addMatcher(
        workspaceApi.endpoints.getWorkspaceDetails.matchRejected,
        (state) => {
          state.workspace = null;
        },
      );
  },
});

export const selectWorkspace = (state: RootState) => state.workspace.workspace;

export default workspaceSlice;
