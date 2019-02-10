import React, {Component} from 'react'
import './add-button.scss'
import { Link } from 'react-router-dom'

export default class AddButton extends Component{
    constructor(props){
        super(props);
        this.addTeam = this.addTeam.bind(this);
    }


    addTeam(e){

    }

    render(){
        return (
            <Link to="/addTeam" className="add-button"></Link>
        )
    }
}