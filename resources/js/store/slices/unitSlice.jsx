import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    units: [],
    currentPage: 1,
    perPage: 10,
    searchQuery: '',
    isLoading: false,
    total: 0,
    from: 0,
    to: 0,
    lastPage: 1,
    error: null
};

export const unitSlice = createSlice({
    name: 'units',
    initialState,
    reducers: {
        fetchUnitsStart: (state) => {
            state.isLoading = true;
        },
        fetchUnitsSuccess: (state, action) => {
            state.isLoading = false;
            state.currentPage = action.payload.current_page;
            state.perPage = action.payload.per_page;
            state.lastPage = action.payload.last_page;
            state.from = action.payload.from;
            state.to = action.payload.to;
            state.total = action.payload.total;
        },
        fetchUnitsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setPerPage: (state, action) => {
            state.perPage = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    },
});

export const {
    setBudgetYear,
    fetchProjectsStart,
    fetchProjectsSuccess,
    fetchProjectsFailure,
    setPerPage,
    setCurrentPage,
    setSearchQuery,
    setExpandedRows
} = unitSlice.actions;

export default unitSlice.reducer;
