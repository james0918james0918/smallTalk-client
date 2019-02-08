import React, { Component } from 'react'
import Searchbar from './searchbar'
import AddButton from './add-button'
export default class Tools extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="tools">
                <Searchbar  findGroups={ this.props.findGroups }
                            setqueryMatchToFalse={ this.props.setqueryMatchToFalse }
                            queryMatched={this.props.queryMatched}/>
                <AddButton />
            </div>
        )
    }
}