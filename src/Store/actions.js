//eslint-disable-next-line
import axios from 'axios'

import * as actions from './actionTypes'

export const authStart = () =>{
    
    return {
        type : actions.AUTH_START
    }
}

export const authSuccess = (token,userId) =>{
    return {
        type : actions.AUTH_SUCCESS,
        token:token,
        userId : userId
    }
}

export const authFail = (error) =>{
    console.log(error)
    return{
        type : actions.AUTH_FAIL,
        error:error
    }
}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type : actions.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        },expirationTime*100)
    }
}

export const auth = (email, password,isSignUp) => {
    // console.log(`[ACTIONS : AUTH] ${email} ${password}`)
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNKBlVZh1uSTBG5MfNkHVJfkPRkwVF52U'
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNKBlVZh1uSTBG5MfNkHVJfkPRkwVF52U'
        }
        axios.post(url,authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error.response);
                dispatch(authFail(error.response.data.error.message));
            });
    };
};

export const checkAuthState = () =>{
    return dispatch => {
        const authToken = localStorage.getItem('token')
        if(!authToken){
            dispatch(logout())
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } 
        else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(authToken, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }   
}
