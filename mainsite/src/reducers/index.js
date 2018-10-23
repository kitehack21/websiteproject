import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import QueueReducer from './QueueReducer';


//Creates Global State
export default combineReducers({
    auth: AuthReducer,
    queue: QueueReducer
})
