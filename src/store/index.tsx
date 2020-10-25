import reducers from "./rootReducer"
import {Action, configureStore} from '@reduxjs/toolkit'
import { ENABLE_REDUX_DEV_TOOLS } from '../constants'
import {ThunkAction} from 'redux-thunk'


const store = configureStore({
    reducer: reducers,
    devTools: ENABLE_REDUX_DEV_TOOLS
});

export type TAction<T> = ThunkAction<void, T, void, Action>

export type RootState = ReturnType<typeof reducers>

export default store

