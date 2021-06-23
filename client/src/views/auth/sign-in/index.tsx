import React from 'react';
import { Link } from 'react-router-dom';
import classes from './index.module.css';

import FormGroup from '../../../shared/ui/form/group/FormGroup';
import FormLabel from '../../../shared/ui/form/label/FormLabel';
import FormInput from '../../../shared/ui/form/input/FormInput';
import Button from '../../../shared/ui/button/Button';
import useFormHook from '../../../shared/ui/form/utils/useFormHook';

interface FormValues {
    username: string;
    password: string;
}

const Page: React.FC = () => {
    const { onInputChange, values } = useFormHook<FormValues>({
        initialValues: {
            username: '',
            password: '',
        },
    });

    // Handlers
    const handleSubmit = () => {
        console.log(values);
    };

    return (
        <div className={classes.page}>

            <header className={classes.header}>
                <h1 className={classes.header__title}>
                    SIGN IN
                </h1>
                <p className={classes.header__subtitle}>
                    Access your account.
                </p>
            </header>

            <div className={classes.form}>
                <FormGroup>
                    <FormLabel label="USERNAME" htmlFor="username" />
                    <FormInput name="username" onChange={onInputChange} value={values.username} />
                </FormGroup>

                <FormGroup>
                    <FormLabel label="PASSWORD" htmlFor="password" />
                    <FormInput name="password" onChange={onInputChange} value={values.password} />
                </FormGroup>

                <div className={classes.form__footer}>
                    <Link to="/auth/sign-up">
                        Don&apos;t have an account? Register here.
                    </Link>
                    <Button onClick={handleSubmit}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Page;
