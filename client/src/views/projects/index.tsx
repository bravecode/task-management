import React, { useState } from 'react';
import { PrimaryButton } from '@fluentui/react';
import classes from './index.module.css';

import useFetch from '../../utils/hooks/useFetch';
import Project from './components/Project';
import projectMapper, { IProject } from './utils/projectMapper';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';
import Loader from '../../shared/loader/Loader';

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
        url: '/projects',
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
        return <Loader />;
    }

    return (
        <div>
            <PrimaryButton text="New Project" onClick={handleProjectCreate} />

            {
                modal.type === 'create' && (
                    <CreateProject
                        open
                        onProjectsRefetch={refetch}
                        onModalClose={handleModalClose}
                    />
                )
            }

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
