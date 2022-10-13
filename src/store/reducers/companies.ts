import { createSlice } from "@reduxjs/toolkit";
import { mokData } from "../../data";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Company, CompanyUpdate } from "../types";

const initialState: Array<Company> = mokData[0];



const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        createCompany(state, action: PayloadAction<Company>): void {
            state.push(action.payload);
        },
        deleteCompany(state, action: PayloadAction<Array<number>>): void {
            const ids = action.payload;
            for (let i = 0; i < ids.length; i++) {
                const index = state.findIndex((company) => company.id === ids[i]);
                if (index !== -1) state.splice(index, 1);
            }
        },
        updateCompany(state, action: PayloadAction<CompanyUpdate>): void {
            const index = state.findIndex((company) => company.id === action.payload.id);
            if (index === -1) return;
            state[index] = { ...state[index], ...action.payload };
        }
    },
});

export const { createCompany, deleteCompany, updateCompany } = companiesSlice.actions;
export default companiesSlice.reducer;