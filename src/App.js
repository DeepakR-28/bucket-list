import React, { Component } from 'react';

import classes from './App.css';
import Items from './Components/Items/Items'
import Input from './Components/Input/Input'

class App extends Component {
  state = {
    items : [],
    currItem : ""
  }
  
  inputItemHandler(event){
    // let updatedState = {...this.state}
    // updatedState.currItem = newItem
    this.setState({
      currItem : event.target.value
    })
    console.log(this.state)
  }
  submitHandler =() =>{
      let updatedState = {...this.state}
      updatedState.items = updatedState.items.concat(updatedState.currItem)
      // console.log(updatedState.items,this.state.items)
      this.setState({
        items : updatedState.items,
        currItem : ""
  })
console.log(this.state)
}
  render(){
    return (
      <div className={classes.App}>
        <Items />
        <Input value = {event => this.inputItemHandler(event)} onItemAdded= {this.submitHandler} />
      </div>
    );
  }
}

export default App;