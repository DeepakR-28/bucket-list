import React from 'react'
// import { connect } from 'react-redux'
import classes from './Input.css'
const input = (props) =>{
        return(
            <div>
                <input
                    className ={classes.Input}
                    onChange = {props.value}
                    >
                </input>
                <button className ={classes.Button} onClick = {props.onItemAdded}>Enter</button>
            </div>
        )
}

  
  export default input;
  