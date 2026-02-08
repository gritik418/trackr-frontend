import { createSlice } from "@reduxjs/toolkit";
import projectApi from "./project.api";
import { Project } from "@/types/project/project.interface";
import { RootState } from "@/store";

interface ProjectState {
  projects: Project[];
  project: Project | null;
}

const initialState: ProjectState = {
  projects: [],
  project: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        projectApi.endpoints.getProjects.matchFulfilled,
        (state, action) => {
          state.projects = action.payload.projects;
        },
      )
      .addMatcher(
        projectApi.endpoints.getProjectById.matchFulfilled,
        (state, action) => {
          state.project = action.payload.project;
        },
      );
  },
});

export const selectProjects = (state: RootState) =>
  state.projects?.projects || [];

export const selectProject = (state: RootState) =>
  state.projects?.project || null;

export default projectSlice;
