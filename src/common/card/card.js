import React, {Component} from 'react'

class Card extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="customedCard">
                <figure className="customedCard__titleBox">
                    {this.props.icon}
                    <h4 className="customedCard__title">{this.props.title}</h4>
                </figure>
                <p className="customedCard__description">
                    {this.props.description}
                </p>
                <button className="customedCard__btn">Learn more</button>
            </div>
        )
    }
}
export default Card;
