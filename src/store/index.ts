import { bindActionCreators, configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as compainesActions from "./reducers/companies";
import * as staffActions from "./reducers/staff";
import { rootReducer as reducer } from "./root.reducer";
import type { TypedUseSelectorHook } from "react-redux";


const store = configureStore({
    devTools: process.env.NODE_ENV === "development",
    reducer,
});

const allActions = {
    ...compainesActions,
    ...staffActions
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(allActions, dispatch);
};

export default store;