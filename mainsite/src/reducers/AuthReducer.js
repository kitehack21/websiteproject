const INITIAL_STATE = 
    {username: "", email: "", error:"", cookieCheck: false}
;

//INITIAL_STATE => default parameter
export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "USER_LOGIN_SUCCESS" :
            return {...action.payload, cookieCheck: true};
        case "USER_LOGIN_FAIL":
            return {...state, error: "Authentication Error"}
        case "COOKIES_CHECKED":
            return {...state, cookieCheck: true}
        case "USER_LOGOUT" :
            return INITIAL_STATE;
        default :   
            return state;
    }
}