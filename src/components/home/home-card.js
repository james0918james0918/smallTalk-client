import React, {Component} from 'react'
//import './home.scss'
export default class Card extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="home__card">
                <img className="home__card__img"></img>
                <p className="home__card__title"> {this.props.title} </p>
            </div>
        )
    }
}