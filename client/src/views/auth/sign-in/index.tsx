import React from 'react';
import { Link } from 'react-router-dom';
import classes from './index.module.css';

import FormGroup from '../../../shared/ui/form/group/FormGroup';
import FormLabel from '../../../shared/ui/form/label/FormLabel';
import FormInput from '../../../shared/ui/form/input/FormInput';
import Button from '../../../shared/ui/button/Button';

const Page: React.FC = () => (
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
                <FormInput name="username" />
            </FormGroup>

            <FormGroup>
                <FormLabel label="PASSWORD" htmlFor="password" />
                <FormInput name="password" />
            </FormGroup>

            <div className={classes.form__footer}>
                <Link to="/auth/sign-up">
                    Don&apos;t have an account? Register here.
                </Link>
                <Button>
                    Login
                </Button>
            </div>
        </div>
    </div>
);

export default Page;
