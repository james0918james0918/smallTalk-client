import React, {Component} from 'react'
export default class Card extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="home__card">
                <img src="../../../../assets/img/logo-test.png" className="home__card__img"></img>
                <p className="home__card__title"> {this.props.title} </p>
            </div>
        )
    }
}