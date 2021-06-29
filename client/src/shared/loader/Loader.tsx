import React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import classes from './Loader.module.css';

const Loader: React.FC = () => (
    <div className={classes.container}>
        <Spinner size={SpinnerSize.large} />
    </div>
);

export default Loader;
