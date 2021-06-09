import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import classes from './Items.css'

const items = (props) =>{
    
    const [bucketListItem, setBucketListItem] = useState('')
    const [bucketList, setBucketList] = useState([])

    const bucketListItemHandler=(event) =>{
        setBucketListItem(event.target.value)
    }
    
    useEffect(() => {
        const queryParams = "?auth=" + props.token +'&orderBy="userId"&equalTo="' + props.userId  + '"'
        const fetchData = async () =>{ axios.get('https://balti-list-default-rtdb.asia-southeast1.firebasedatabase.app/bucketList.json' + queryParams)
        .then(response =>{
            let items = []
            for(let key in response.data){
                items.push({id : key, name : response.data[key].name})
            }
            setBucketList(items)
        })
        .catch(error => console.log(error))
    }
    const timer  =setTimeout(() =>{
        fetchData();
    },2000)
    return () => clearTimeout(timer);
      }, [bucketListItem]);
    
    
    const bucketListArrayHandler = () =>{
        let listItem = {name :bucketListItem, userId : props.userId}
        axios.post('https://balti-list-default-rtdb.asia-southeast1.firebasedatabase.app/bucketList.json?auth='+props.token,listItem)
        setBucketList(bucketList)
        setBucketListItem("")
    }
    
    const itemDeleteHandler =(itemId)=>{
        console.log("[DELETE HANDLET]" , itemId)
        axios.delete(`https://balti-list-default-rtdb.asia-southeast1.firebasedatabase.app/bucketList/${itemId}.json?auth=${props.token}`)
        let updatedBucketList = bucketList.filter((item) => item.id !== itemId)
        setBucketList(updatedBucketList)
        setBucketListItem("")
        console.log(bucketList)
    }
    return (
        <div className  ={classes.Content}>
            <input 
                className = {classes.Input} 
                onChange ={event => bucketListItemHandler(event)} placeholder ="Bucket List 🚀">
                </input>
                <br></br>
            <button className = {classes.Button} onClick ={bucketListArrayHandler}>Add <span role = "img" aria-label = "rocket">📝</span></button>
            <ul>
            {bucketList.map((item) => {
                return(
                    <div className={classes.List} key = {Math.random()}>
                        <div>
                            <li className ={classes.Items} key = {item.id}> {item.name} </li>
                        </div>
                        <div >
                            <button className ={classes.Delete} key= {item.id} onClick ={() => itemDeleteHandler(item.id)}>delete</button>
                        </div>
                    </div>
                )
            })}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        token : state.token,
        userId : state.userId
    }
}

export default connect(mapStateToProps)(items)