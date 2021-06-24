import React from 'react';

import useFetch from '../../utils/hooks/useFetch';
import Project, { ProjectProps } from './components/Project';
import projectMapper from './utils/projectMapper';
import CreateProject from './components/CreateProject';

const Projects: React.FC = () => {
    // Get Projects
    const { data, loading, refetch } = useFetch<ProjectProps[]>({
        url: 'http://localhost:8000/projects',
        options: {
            method: 'GET',
        },
        includeToken: true,
        mapper: projectMapper,
    });

    if (loading) {
        return <div>Loading data...</div>;
    }

    return (
        <div>
            <CreateProject onCreate={refetch} />

            {
                data?.map((project) => (
                    <Project key={project.ID} ID={project.ID} name={project.name} />
                ))
            }
        </div>
    );
};

export default Projects;
