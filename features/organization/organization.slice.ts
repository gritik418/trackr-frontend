import { createSlice } from "@reduxjs/toolkit";
import { OrganizationState } from "./organization.interface";

const initialState: OrganizationState = {
  organizations: [],
};

const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default organizationSlice;
