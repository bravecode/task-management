import React from 'react';
import classNames from 'classnames';
import classes from './FormGroup.module.css';

interface FormGroupProps {
    children: React.ReactNode;
    className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ children, className }) => {
    const containerStyles = classNames({
        [classes.group]: true,
        [className as string]: className,
    });

    return (
        <div className={containerStyles}>
            { children }
        </div>
    );
};

export default FormGroup;
