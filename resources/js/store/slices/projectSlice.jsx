import { createSlice } from '@reduxjs/toolkit';

const getCurrentYear = () => {
    const now = new Date(); // วันที่ปัจจุบัน
    const currentYear = now.getFullYear(); // ปีปัจจุบัน
    const isAfterSeptember30 = now.getMonth() > 8 || (now.getMonth() === 8 && now.getDate() > 30); // ตรวจสอบว่าหลัง 30 กันยายน
    return isAfterSeptember30 ? currentYear + 1 : currentYear; // เพิ่มปีถ้าเป็นหลังวันที่ 30 กันยายน
};

const initialState = {
    budgetYear: getCurrentYear(),
    baseUrl:'',
    projects: [],
    currentPage: 1,
    perPage: 10,
    searchQuery: '',
    isLoading: false,
    total: 0,
    from: 0,
    to: 0,
    lastPage: 1,
    expandedRows: [],
    error: null
};

export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setBudgetYear: (state, action) => {
            state.budgetYear = action.payload;
        },
        setBaseUrl: (state, action) => {
            state.baseUrl = action.payload;
        },
        fetchProjectsStart: (state) => {
            state.isLoading = true;
        },
        fetchProjectsSuccess: (state, action) => {
            state.isLoading = false;
            state.projects = action.payload.data;
            state.currentPage = action.payload.current_page;
            state.perPage = action.payload.per_page;
            state.lastPage = action.payload.last_page;
            state.from = action.payload.from;
            state.to = action.payload.to;
            state.total = action.payload.total;
        },
        fetchProjectsFailure: (state, action) => {
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
        },
        setExpandedRows: (state, action) => {
            state.expandedRows = action.payload;
        }
    },
});

export const {
    setBudgetYear,
    setBaseUrl,
    fetchProjectsStart,
    fetchProjectsSuccess,
    fetchProjectsFailure,
    setPerPage,
    setCurrentPage,
    setSearchQuery,
    setExpandedRows
} = projectSlice.actions;

export default projectSlice.reducer;
