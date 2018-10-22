const INITIAL_STATE = [{
    name: "Im your girl",
    singer: "KHAN",
    cover: "http://localhost:1994/dreamcatcher-prequel.jpg",
    musicSrc: "http://localhost:1994/KHAN/01.%20I%60m%20Your%20Girl%20_.mp3"
}];

//INITIAL_STATE => default parameter
export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "ADD_TO_QUEUE" :
            return [...state, action.payload]
        default :   
            return state;
    }
}