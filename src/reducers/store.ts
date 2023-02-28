import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {appStateReducer} from "./slices/AppStateSlice";


const rootReducer = combineReducers({
    appStateReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']