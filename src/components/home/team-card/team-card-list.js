import React from 'react';
import TeamCard from './team-card/team-card'

export default (props) => {
    let cards = props.teams.map((team) => {
        return (
            <TeamCard teamName="{team.name}"
                      teamDescription="{team.description}"></TeamCard>
        );
    });

    return (
        <div>
            {cards}
        </div>
    )
}
