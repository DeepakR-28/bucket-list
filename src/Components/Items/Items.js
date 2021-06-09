import React from 'react'

import classes from './Items.css'
import Item from './Item/Item'

const items = (props) =>{
    return(
        <div>
            <p className = {classes.Title}>Bucket List</p>
            <Item>{props.children}</Item>
        </div>
    )
}

export default items