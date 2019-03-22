import React from 'react';

const ProCard = props => {
    return (
        <div>
            <h1>Name: {props.project.name}</h1>
            <p>Description: {props.project.description}</p>
        </div>
    )
}


export default ProCard;