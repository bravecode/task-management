import React, { useState } from 'react';
import { PrimaryButton } from '@fluentui/react';
import classes from './index.module.css';

import useFetch from '../../utils/hooks/useFetch';
import Project from './components/Project';
import projectMapper, { IProject } from './utils/projectMapper';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';

type ProjectsModal = {
    type: 'none'
} | {
    type: 'create'
} | {
    type: 'edit',
    data: IProject
}

const Projects: React.FC = () => {
    const [modal, setModal] = useState<ProjectsModal>({ type: 'none' });

    // Get Projects
    const { data, loading, refetch } = useFetch<IProject[]>({
        url: 'http://localhost:8000/projects',
        options: {
            method: 'GET',
        },
        includeToken: true,
        mapper: projectMapper,
    });

    // Handlers
    const handleModalClose = () => {
        setModal({ type: 'none' });
    };

    const handleProjectCreate = () => {
        setModal({ type: 'create' });
    };

    const handleProjectEdit = (values: IProject) => {
        setModal({
            type: 'edit',
            data: values,
        });
    };

    if (loading) {
        return <div>Loading data...</div>;
    }

    return (
        <div>
            <PrimaryButton text="New Project" onClick={handleProjectCreate} />

            <CreateProject onProjectsRefetch={refetch} open={modal.type === 'create'} onModalClose={handleModalClose} />

            {
                modal.type === 'edit' && (
                    <EditProject
                        initialValues={modal.data}
                        onModalClose={handleModalClose}
                        onProjectsRefetch={refetch}
                    />
                )
            }

            <div className={classes.projects__list}>
                {
                    data?.map((project) => (
                        <Project
                            key={project.ID}
                            ID={project.ID}
                            name={project.name}
                            onProjectEdit={handleProjectEdit}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Projects;
