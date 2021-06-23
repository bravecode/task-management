import React from 'react';
import classNames from 'classnames';
import classes from './FormInput.module.css';

interface FormInputProps extends React.HTMLProps<HTMLInputElement> {
    name: string;
    className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    name,
    className,
    ...props
}) => {
    const containerStyles = classNames({
        [classes.input]: true,
        [className as string]: className,
    });

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <input {...props} name={name} id={props.id || name} className={containerStyles} />
    );
};

export default FormInput;
