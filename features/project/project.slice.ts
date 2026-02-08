import { createSlice } from "@reduxjs/toolkit";
import projectApi from "./project.api";
import { Project } from "@/types/project/project.interface";
import { RootState } from "@/store";

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      projectApi.endpoints.getProjects.matchFulfilled,
      (state, action) => {
        state.projects = action.payload.projects;
      },
    );
  },
});

export const selectProjects = (state: RootState) =>
  state.projects?.projects || [];

export default projectSlice;
