import React from 'react';
import classNames from 'classnames';
import classes from './FormLabel.module.css';

interface FormLabelProps {
    htmlFor: string;
    label: string;
    className?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({
    label,
    htmlFor,
    className,
}) => {
    const containerStyles = classNames({
        [classes.label]: true,
        [className as string]: className,
    });

    return (
        <label htmlFor={htmlFor} className={containerStyles}>
            { label }
        </label>
    );
};

export default FormLabel;
