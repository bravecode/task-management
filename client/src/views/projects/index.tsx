import React, { useState } from 'react';
import { PrimaryButton } from '@fluentui/react';

import useFetch from '../../utils/hooks/useFetch';
import Project, { ProjectProps } from './components/Project';
import projectMapper from './utils/projectMapper';
import CreateProject from './components/CreateProject';

type ProjectsModal = 'none' | 'create' | 'edit';

const Projects: React.FC = () => {
    const [modal, setModal] = useState<ProjectsModal>('none');

    // Get Projects
    const { data, loading, refetch } = useFetch<ProjectProps[]>({
        url: 'http://localhost:8000/projects',
        options: {
            method: 'GET',
        },
        includeToken: true,
        mapper: projectMapper,
    });

    // Handlers
    const handleModalClose = () => {
        setModal('none');
    };

    const handleProjectCreate = () => {
        setModal('create');
    };

    if (loading) {
        return <div>Loading data...</div>;
    }

    return (
        <div>
            <PrimaryButton text="New Project" onClick={handleProjectCreate} />

            <CreateProject onProjectsRefetch={refetch} open={modal === 'create'} onModalClose={handleModalClose} />

            {
                data?.map((project) => (
                    <Project key={project.ID} ID={project.ID} name={project.name} />
                ))
            }
        </div>
    );
};

export default Projects;
