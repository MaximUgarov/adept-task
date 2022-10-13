import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./../index";
import type { Company } from "./../types";



export const getCompanies = createSelector(
    [
        (state: RootState) => state.companies,
        (state: RootState) => state.staff
    ],
    (companies, staff) => companies.map((company) =>
        ({ ...company, staffCount: staff.filter(({ companyId }) => companyId === company.id).length }) as Company)
);