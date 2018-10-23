const INITIAL_STATE = [];

//INITIAL_STATE => default parameter
export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "ADD_TO_QUEUE" :
            return [...state, ...action.payload]
        default :   
            return state;
    }
}