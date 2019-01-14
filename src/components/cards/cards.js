import React, { Component } from 'react'
import Card from '../../common/card/card'

class Cards extends Component{
   
    constructor(props){
        super(props);
        this.createCards.bind(this);
    }

    createCards(){
        const cards=this.props.textGroup.map( (item,index) => <Card title={item.title} description={item.description} key={index} />);
        return cards;
    }

    render(){
        return(
            <section className="cards">
                <h1 className="title_h1">{this.props.headerText}</h1>
                <div className="cards__cardsArea">
                    {this.createCards()}
                </div>
            </section>
        );
    }

}

export default Cards