import React, {Component} from 'react'
import './add-button.scss'

export default class AddButton extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <button className="add-button"></button>
        )
    }
}