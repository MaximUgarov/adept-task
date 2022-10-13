import { createSelector } from "@reduxjs/toolkit";
import type { Staff } from "../types";
import type { RootState } from "./../index";



export const getStaffByCompaniesId = createSelector(
    [
        (state: RootState) => state.staff,
        (_: RootState, companyIds: Array<number>) => companyIds
    ],
    (staff, companyIds) => staff.filter((staff: Staff) => companyIds.find((companyId: number) => companyId === staff.companyId)) as Array<Staff>
);