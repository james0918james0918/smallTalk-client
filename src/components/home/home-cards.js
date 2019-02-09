import React, {Component} from 'react'
import Card from './home-card'
//import './home.scss'
export default class Cards extends Component{
    constructor(props){
        super(props);
        this.createCards = this.createCards.bind(this);
    }

    createCards(){
        return this.props.groups.map( (item,index) => <Card title={item.title} key={index} />)
    }

    render(){
        return (
            <div className="home__cards">
               {this.createCards()}
            </div>
        )
    }
}