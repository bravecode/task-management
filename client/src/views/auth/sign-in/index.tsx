import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from './index.module.css';

import FormGroup from '../../../shared/ui/form/group/FormGroup';
import FormLabel from '../../../shared/ui/form/label/FormLabel';
import FormInput from '../../../shared/ui/form/input/FormInput';
import Button from '../../../shared/ui/button/Button';
import useForm from '../../../shared/ui/form/utils/useFormHook';
import AuthService, { LoginValues } from '../../../services/authService';

const Page: React.FC = () => {
    const history = useHistory();

    const [error, setError] = useState('');

    // Handlers
    const handleSuccess = () => {
        history.push('/');
    };

    const handleFail = (value: string) => {
        setError(value);
    };

    // State
    const authService = new AuthService({
        onSuccess: handleSuccess,
        onFail: handleFail,
    });

    const { onInputChange, values } = useForm<LoginValues>({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = () => {
        authService.login(values);
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
                    {
                        error && (
                            <p>
                                { error }
                            </p>
                        )
                    }
                </FormGroup>

                <FormGroup>
                    <FormLabel label="USERNAME" htmlFor="username" />
                    <FormInput name="email" onChange={onInputChange} value={values.email} />
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
