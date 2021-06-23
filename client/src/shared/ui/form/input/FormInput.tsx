import React from 'react';
import classNames from 'classnames';
import classes from './FormInput.module.css';

interface FormInputProps {
    name: string;
    className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    name,
    className,
}) => {
    const containerStyles = classNames({
        [classes.input]: true,
        [className as string]: className,
    });

    return (
        <input name={name} id={name} className={containerStyles} />
    );
};

export default FormInput;
