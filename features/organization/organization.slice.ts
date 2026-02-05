import { createSlice } from "@reduxjs/toolkit";

const organizationSlice = createSlice({
    name: 'organizations',
    initialState: {
        organizations: [],
    },
    reducers: {
        setOrganizations: (state, action) => {
            state.organizations = action.payload;
        },
    },
});

export default organizationSlice