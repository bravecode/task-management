/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import classes from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    className,
    type,
    ...props
}) => {
    const containerStyles = classNames({
        [classes.button]: true,
        [className as string]: className,
    });

    return (
        <button {...props} type={type || 'button'} className={containerStyles}>
            { children }
        </button>
    );
};

export default Button;
