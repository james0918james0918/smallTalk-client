import React, {Component} from 'react'

class Card extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="card">
                <figure className="card__imgContainer">
                    <img className="card__img"></img>
                </figure>
                <h4 className="card__title">{this.props.title}</h4>
                <p className="card__description">
                    {this.props.description}
                </p>
            </div>
        )
    }
}
export default Card;