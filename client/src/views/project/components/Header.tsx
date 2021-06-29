import React from 'react';
import { Text } from '@fluentui/react';
import classes from './Header.module.css';

import useFetch from '../../../utils/hooks/useFetch';
import { IProject } from '../../projects/utils/projectMapper';

interface IHeaderProps {
    projectID: string;
}

const Header: React.FC<IHeaderProps> = ({ projectID }) => {
    // Get Project's name
    const { data } = useFetch<IProject>({
        url: `/projects/${projectID}`,
        includeToken: true,
    });

    return (
        <header className={classes.header}>
            <Text variant="xxLarge">
                { data?.name }
            </Text>
        </header>
    );
};

export default Header;
