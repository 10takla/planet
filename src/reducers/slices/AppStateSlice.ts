import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthFormType} from "../../types/appTypes";

interface IAppState {
    activeAuthForm: AuthFormType | null
}

const initialState: IAppState = {
    activeAuthForm: null
}

export const appStateSlice = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {
        setActiveForm(state, action: PayloadAction<AuthFormType | null>) {
            state.activeAuthForm = action.payload
        },
    }
})

export const appStateReducer = appStateSlice.reducer


