/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import classes from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className }) => {
    const containerStyles = classNames({
        [classes.button]: true,
        [className as string]: className,
    });

    return (
        <button type="button" className={containerStyles}>
            { children }
        </button>
    );
};

export default Button;
