import axios from 'axios'
import {API_URL_1, API_URL_ALBUM_COVERS, API_URL_TRACKS} from '../supports/api-url/apiurl'

export const onLogin = (user) =>{
    return(dispatch) => {
        axios.get(API_URL_1 + "/users", {
            params: {
                email: user.email,
                password: user.password
            }
        }).then(res => {
            console.log(res)
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: {username: res.data.user.username, email: res.data.user.email, id: res.data.user.id, subscription: res.data.subscription.status, error: ""}
                })
        }).catch(err => {
            console.log(err);
                dispatch({
                    type: "USER_LOGIN_FAIL"
                })
        })
    }
};

export const onLogout = () =>{
    return(dispatch) =>{
        dispatch({
            type: "USER_LOGOUT"
        })
        dispatch({
            type: "COOKIES_CHECKED"
        })
    }
};

export const onRegister = (user) =>{
    return(dispatch) => {
        axios.post(API_URL_1 + "/users", user)
        .then((res) => {
            console.log(res)
            if(res.data.error === 1){
                dispatch({
                    type: "USER_REGISTER_FAIL"
                })
            }
            else{
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: {username: res.data.username, email: res.data.email, id: res.data.id, subscription:"inactive", error:""}
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const keepLogin = (email) =>{
    return(dispatch) => {
        axios.get(API_URL_1 + "/keeplogin", {
            params: {
                email: email,
            }
        }).then(res => {
            console.log(res)
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: {username: res.data.user.username, email: res.data.user.email, id: res.data.user.id, subscription: res.data.subscription.status, error: ""}
                })
                dispatch({
                    type: "COOKIES_CHECKED"
                })
        }).catch(err => {
            console.log(err);
            //returns an object (action)
            dispatch({
                type: "USER_LOGIN_FAIL"
            })
        })
    }
}

export const cookieChecked = () =>{
    return({
        type: "COOKIES_CHECKED"
    })
};

export const addQueue = (id) =>{
    return(dispatch) => {
        axios.get(API_URL_1 + "/addPlaylist/" + id)
        .then((res)=>{
            console.log("ADD QUEUE")
            dispatch ({
                type: "ADD_TO_QUEUE",
                payload: [{
                    name: res.data[0].track_name,
                    singer: res.data[0].artist_name,
                    cover: `${API_URL_ALBUM_COVERS}/${res.data[0].album_art}`,
                    musicSrc: `${API_URL_TRACKS}/${res.data[0].artist_name}/${res.data[0].album_name}/${res.data[0].source}`
                }]
            })
        })
        .catch((err)=>{
            console.log(err)
            console.log("Add Queue error")
        })
    }
}

export const addQueueCookie = (cookie) =>{
    return(dispatch) => {
        dispatch ({
            type: "ADD_TO_QUEUE",
            payload: cookie
        })
    }
}