import {combineReducers} from "redux"
import {reducer as userReducer} from '../slices/user'
import {reducer as websiteReducer} from '../slices/website'


export default combineReducers(
    {
        user: userReducer,
        website: websiteReducer
    }
)

