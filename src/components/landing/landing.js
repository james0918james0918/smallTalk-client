import React from 'react'
import Cards from '../cards/cards'
import './landing.css';

export default () => {
    return (
        <React.Fragment>
            <div className="masthead">
                <div className="container d-flex h-100 align-items-center">
                    <div className="mx-auto text-center">
                        <h1 className="mx-auto my-0 text-uppercase">SmallTalk</h1>
                        <h2 className="text-white-50 mx-auto mt-2 mb-5">Manage Team Like a Country</h2>
                    </div>
                </div>
            </div>
            <Cards  headerText="Why smallTalk?" 
                    textGroup={ 
                        [
                            {
                                title: "Fully configurable",
                                description: "She literature discovered increasing how diminution understood. Though and highly the enough county for man. Of it up he still court alone widow seems. Suspected he remainder rapturous my sweetness. All vanity regard sudden nor simple can. World mrs and vexed china since after often."
                            },
                            {
                                title: "Manage the team easily",
                                description: "Same an quit most an. Admitting an mr disposing sportsmen. Tried on cause no spoil arise plate. Longer ladies valley get esteem use led six. Middletons resolution advantages e"
                            },
                            {
                                title: "Never miss stuffs again!",
                                description: "Promotion an ourselves up otherwise my. High what each snug rich far yet easy. In companions inhabiting mr principles at insensible do. Heard their sex hoped enjoy vexed child for. Prosperous so occasional assistance it discovered especially no. Provision of he residence"
                            }
                        ]  
            }/>
        </React.Fragment>
    )
}
