import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'


//Creates Global State
export default combineReducers({
    auth: AuthReducer
})
