import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import PlaylistReducer from './PlaylistReducer';


//Creates Global State
export default combineReducers({
    auth: AuthReducer,
    playlist: PlaylistReducer
})
