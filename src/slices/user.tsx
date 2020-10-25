import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { TAction } from 'src/store'
import { User } from '../types/User'



interface State {
    user?: User
}

const initialState : State = {
    user:undefined
};

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchCurrentUser(state, action: PayloadAction<User>) {
            state.user = action.payload
        },
        updateSelf(state, action: PayloadAction<User>) {
            state.user = action.payload;
        }
    }
})


export const reducer = slice.reducer

export const fetchCurrentUser = ():TAction<User[]> => async  (dispatch) => {
    const response = await axios.get(`/api/self`)
    dispatch(slice.actions.fetchCurrentUser({id:response.data.ref.id, ...response.data.data}))
}

export const updateSelf = (data:any):TAction<User> => async (dispatch) => {
    const response = await axios.patch(`/api/user/self`, data)
    dispatch(slice.actions.updateSelf(response.data))
}


export default slice