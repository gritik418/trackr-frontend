import { createSlice } from "@reduxjs/toolkit";
import { OrganizationState } from "./organization.interface";
import organizationApi from "./organization.api";
import { RootState } from "@/store";

const initialState: OrganizationState = {
  organization: null,
};

const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        organizationApi.endpoints.getOrganizationDetails.matchFulfilled,
        (state, action) => {
          if (action.payload.organization) {
            state.organization = action.payload.organization;
          }
        },
      )
      .addMatcher(
        organizationApi.endpoints.getOrganizationDetails.matchRejected,
        (state, action) => {
          state.organization = null;
        },
      );
  },
});

export const selectOrganization = (state: RootState) =>
  state.organizations.organization;

export default organizationSlice;
