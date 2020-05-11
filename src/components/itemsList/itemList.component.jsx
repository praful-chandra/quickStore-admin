import React, { Component } from 'react';

import ItemsListItem from "./itemsList-item.component";

class ItemsList extends Component {
    state = { 
        itemCount:50
     }

     renderItems = ()=>{
         const result = [];

         for(let i=0;i<this.state.itemCount;i++)
            result.push(<ItemsListItem />)

        return result;
     }

    render() {
        return (
            <div className="itemsList-wrapper">
                <div className="itemsList-title">{this.props.title} </div>
                <div className="itemsList-body">

             {
                this.renderItems()
             }

                </div>

              {
                  this.props.additems ?   <div className="itemsList-addBtn" onClick={()=>this.setState({itemCount : this.state.itemCount+1})}>
                    +
                </div> : null
              }
            </div>
        );
    }
}

export default ItemsList;