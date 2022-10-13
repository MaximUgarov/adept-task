import { combineReducers } from "@reduxjs/toolkit";
import companies from "./reducers/companies";
import staff from "./reducers/staff";



export const rootReducer = combineReducers({
    companies,
    staff
});