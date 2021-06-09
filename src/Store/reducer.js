const initialState = {
    items : [],
    changed : false
}

const reducer = (state = initialState, action) =>{
    
    switch(action.type){
        case "PUSHED":
            console.log(state.items)
            break
        default:
            return state
    }
    
}

export default reducer