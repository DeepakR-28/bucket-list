import React,{ useState } from 'react'

import {connect} from 'react-redux'
import {withRouter } from 'react-router';

import * as actions from '../Store/actions'
import classes from './Auth.css'

const auth = (props) =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignup,setSignUp] = useState(false)

    const emailChangeHandler =(event) =>{
        setEmail(event.target.value)
    }
    const passwordChangeHandler =(event) =>{
        setPassword(event.target.value)
    }

    const submitHandler = (event) =>{
        event.preventDefault()
       props.onAuth(email,password,isSignup)
    }
    

    const loginHandler =() =>{
        setSignUp(!isSignup)
    }
    return(
        <div className = {classes.main}>
            <form  className = {classes.form1} onSubmit = {(event) =>submitHandler(event)}>
                
                <h1 className = {classes.sign}>{isSignup ? "SignUp 🔑" : "SignIn 🔑"}</h1>
                <h3 style ={{color:"red"}}>{props.error}</h3>
                
                <input className={classes.un}
                        type = "email" 
                        onChange ={event => emailChangeHandler(event)} 
                        placeholder= "Email">
                </input>

                <input 
                    className={classes.pass} 
                    type = "password" 
                    onChange ={event => passwordChangeHandler(event)} 
                    placeholder = "Password">    
                    </input>
                <center>
                    <button className={classes.submit} type = "submit" >Submit</button>
                </center>
                <h3 className={classes.switch} 
                    onClick= {loginHandler} >Switch to {isSignup ? "SignIn" : "SignUp"}
                </h3>
            </form>
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        token : state.token,
        error: state.error
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(auth))