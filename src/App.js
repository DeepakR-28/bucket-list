import React, { useEffect } from 'react';
import {Route,Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Items from './Components/Items/Items'
import classes from './App.css';
import Auth from './Auth/Auth'
import Logout from './Auth/Logout'
import * as actions from './Store/actions'

const app =(props) => {

  useEffect(() =>{
    props.onTryAutoSignIn();
  },[])
  return (
    <div className = {classes.App}>
      {props.isAuthenticated ? 
      <Link to = "/logout"><button className ={classes.LogoutButton}>Logout<span role = "img" aria-label= "techie">🚪</span></button></Link>:
      <Link to = "/auth"><button className= {classes.AuthButton}>Authentication <span role = "img" aria-label= "techie">👨‍💻</span></button></Link>}
      
      <Route path = "/auth" exact component ={Auth} />
      {props.isAuthenticated ? <Route path = "/bucketList" exact component ={Items} /> : null}
      <Route path = "/logout" exact component = {Logout} />
      {props.isAuthenticated ? <Redirect to = '/bucketList'/> : null}
    </div>
  )
}

const mapStateToProps = state =>{
  return{
    isAuthenticated : state.token !== null
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignIn : () => dispatch(actions.checkAuthState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(app);