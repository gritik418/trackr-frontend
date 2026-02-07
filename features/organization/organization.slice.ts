import { createSlice } from "@reduxjs/toolkit";
import { OrganizationState } from "./organization.interface";
import organizationApi from "./organization.api";
import { RootState } from "@/store";

const initialState: OrganizationState = {
  organization: null,
  members: [],
  invites: [],
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
      )
      .addMatcher(
        organizationApi.endpoints.getOrganizationMembers.matchFulfilled,
        (state, action) => {
          if (action.payload.members) {
            state.members = action.payload.members;
          }
        },
      )
      .addMatcher(
        organizationApi.endpoints.getOrganizationInvites.matchFulfilled,
        (state, action) => {
          if (action.payload.invitations) {
            state.invites = action.payload.invitations;
          }
        },
      );
  },
});

export const selectOrganization = (state: RootState) =>
  state.organizations.organization;
export const selectMembers = (state: RootState) => state.organizations.members;
export const selectInvites = (state: RootState) => state.organizations.invites;

export default organizationSlice;
