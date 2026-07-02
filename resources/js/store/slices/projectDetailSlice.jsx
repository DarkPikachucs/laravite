import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    project: null,
    activeTab: 'project-intro',
    isLoading: false,
    error: null
};

export const projectDetailSlice = createSlice({
    name: 'projectDrtail',
    initialState,
    reducers: {
        fetchProjectStart: (state) => {
            state.isLoading = true;
        },
        fetchProjectSuccess: (state, action) => {
            state.isLoading = false;
            state.project = action.payload;
        },
        fetchProjectFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        updatePrincipleAndReason: (state, action) => {
            if (state.project) {
                state.project.principle_and_reason = action.payload;
            }
        },
        updateProjectType: (state, action) => {
            if (state.project) {
                state.project.project_type = action.payload;
            }
        },
        updateOwner: (state, action) => {
            if (state.project) {
                state.project.owner = action.payload;
            }
        },
        updateOperationPlan: (state, action) => {
            if (state.project) {
                state.project.operational_plan = action.payload;
            }
        },
        updateSections: (state, action) => {
            if (state.project) {
                state.project.sections = action.payload;
            }
        },
        updateExpectedResult: (state, action) => {
            if (state.project) {
                state.project.expected_result = action.payload;
            }
        },
        updateActivity: (state, action) => {
            if (state.project) {
                state.project.activity = action.payload;
            }
        },
        updateProjectApprover: (state, action) => {
            if (state.project) {
                state.project.approver = action.payload;
            }
        },
        resetState: () => {
            return initialState;
        },
        updateProjectStatus: (state, action) => {
            if (state.project) {
                state.project.status = action.payload;
            }
        },
        updateSchedule: (state, action) => {
            if (state.project) {
                state.project.schedule = action.payload;
            }
        },
        updateActionPlans: (state, action) => {
            if (state.project) {
                state.project.action_plans = action.payload;
            }
        },
    },
});

export const {
    fetchProjectStart,
    fetchProjectSuccess,
    fetchProjectFailure,
    setActiveTab,
    updatePrincipleAndReason,
    updateProjectType,
    resetState,
    updateOwner,
    updateOperationPlan,
    updateSections,
    updateExpectedResult,
    updateActivity,
    updateProjectApprover,
    updateProjectStatus,
    updateSchedule,
    updateActionPlans
} = projectDetailSlice.actions;

export default projectDetailSlice.reducer;
