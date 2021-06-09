import * as actionTypes from './actionTypes'

let initialState = {
    token : null,
    userId : null,
    error: null,
}

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                userId:action.userId,
                token : action.token,
                error: null
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error : action.error,
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                userId : null,
                token: null
            }
        default:
            return state
    }
}

export default reducer