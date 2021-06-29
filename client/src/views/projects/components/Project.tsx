import React from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton, Text, IContextualMenuProps, Link as Anchor,
} from '@fluentui/react';
import classes from './Project.module.css';

import { IProject } from '../utils/projectMapper';

export interface ProjectProps extends IProject {
    // eslint-disable-next-line no-unused-vars
    onProjectEdit: (values: IProject) => void;
}

const Project: React.FC<ProjectProps> = ({ ID, name, onProjectEdit }) => {
    // Handlers
    const handleProjectEdit = () => {
        onProjectEdit({ ID, name });
    };

    const menuProps: IContextualMenuProps = {
        items: [
            {
                key: 'editProject',
                text: 'Edit Project',
                iconProps: { iconName: 'Edit' },
                onClick: handleProjectEdit,
            },
        ],
        directionalHintFixed: true,
    };

    const path = `/projects/${ID}`;

    return (
        <div className={classes.project}>
            <Anchor as={Link} to={path}>
                <Text variant="mediumPlus">
                    { name }
                </Text>
            </Anchor>
            <IconButton
                menuProps={menuProps}
                iconProps={{ iconName: 'MoreVertical' }}
                title="Edit Project"
                ariaLabel="Edit Project"
                onRenderMenuIcon={() => <div />}
            />
        </div>
    );
};

export default Project;
