import React from 'react';
import { Text, PrimaryButton } from '@fluentui/react';
import classes from './Header.module.css';

import useFetch from '../../../utils/hooks/useFetch';
import { IProject } from '../../projects/utils/projectMapper';

interface IHeaderProps {
    projectID: string;
    onProjectCreate: () => void;
}

const Header: React.FC<IHeaderProps> = ({ projectID, onProjectCreate }) => {
    // Get Project's name
    const { data } = useFetch<IProject>({
        url: `/projects/${projectID}`,
        includeToken: true,
    });

    // Handlers
    const handleTaskCreate = () => {
        onProjectCreate();
    };

    return (
        <header className={classes.header}>
            <Text variant="xxLarge">
                { data?.name }
            </Text>
            <PrimaryButton
                text="Create Task"
                onClick={handleTaskCreate}
            />
        </header>
    );
};

export default Header;
