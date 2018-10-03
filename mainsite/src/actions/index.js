import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'

export const onLogin = (user) =>{
    return(dispatch) => {
        axios.get(API_URL_1 + "/users", {
            params: {
                email: user.email,
                password: user.password
            }
        }).then(user => {
            console.log(user)
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: {username: user.data[0].username, email: user.data[0].email, error: ""}
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
            dispatch ({
                type: "USER_LOGIN_SUCCESS",
                payload: {username: res.data.username, email: res.data.email, error:""}
            })
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
        }).then(user => {
            console.log(user)
                dispatch ({
                    type: "USER_LOGIN_SUCCESS",
                    payload: {username: user.data[0].username, email: user.data[0].email, error: ""}
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