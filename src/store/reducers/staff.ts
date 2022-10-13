import { createSlice } from "@reduxjs/toolkit";
import { mokData } from "../../data";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Staff, StaffUpdate } from "../types";

const initialState: Array<Staff> = mokData[1];



const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        createStaff(state, action: PayloadAction<Staff>): void {
            state.push(action.payload);
        },
        deleteStaff(state, action: PayloadAction<Array<number>>): void {
            const ids = action.payload;
            for (let i = 0; i < ids.length; i++) {
                const index = state.findIndex((staff) => staff.id === ids[i]);
                if (index !== -1) state.splice(index, 1);
            }
        },
        updateStaff(state, action: PayloadAction<StaffUpdate>): void {
            const index = state.findIndex((staff) => staff.id === action.payload.id);
            if (index === -1) return;
            state[index] = { ...state[index], ...action.payload };
        }
    },
});

export const { createStaff, deleteStaff, updateStaff } = staffSlice.actions;
export default staffSlice.reducer;