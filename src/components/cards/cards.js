import React, { Component } from 'react'
import Card from '../../common/card/card'
import svgIcons from '../../common/svgIcons/svgIcons';

class Cards extends Component{
    constructor(props){
        super(props);
        this.createCards.bind(this);
    }

    createCards(){
        // key attributes are required in an array of JSX elements 
        return this.props.textGroup.map( (item,index) => <Card title={item.title} description={item.description} icon={svgIcons[index]} key={index} />);
    }

    render(){
        return(
            <section className="cards">
                <h1 className="cards__header">{this.props.headerText}</h1>
                <p className="cards__intro"> Manage the team in the way you can't even imagine. </p>
                <div className="cards__cardsArea">
                    {this.createCards()}
                </div>
            </section>
        );
    }

}

export default Cards
