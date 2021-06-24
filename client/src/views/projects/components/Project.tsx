import React from 'react';

export interface ProjectProps {
    ID: number;
    name: string;
}

const Project: React.FC<ProjectProps> = ({ ID, name }) => (
    <div>
        {`${ID} - ${name}`}
    </div>
);

export default Project;
