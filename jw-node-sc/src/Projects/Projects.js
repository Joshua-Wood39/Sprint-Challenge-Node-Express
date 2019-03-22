import React from 'react';
import ProCard from './ProCard';

const Projects = props => {
    return (
        <div>
            {props.projects.map(pro => {
                return <ProCard project={pro} actions={props.actions} />
            })}
        </div>
    )
}


export default Projects;