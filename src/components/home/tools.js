import React, { Component } from 'react'
import Searchbar from './searchbar'
import AddButton from './add-button'
import './tools.scss'
export default class Tools extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="tools">
                <Searchbar  findGroups={ this.props.findGroups }
                            queryMatched={this.props.queryMatched}/>
                <AddButton />
            </div>
        )
    }
}