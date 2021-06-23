import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Head from '../../shared/head/Head';

// Views
import SignIn from '../../views/auth/sign-in';
import SignUp from '../../views/auth/sign-up';

const TemplateAuth: React.FC = () => (
    <main className="template--auth">

        <Head />

        <Switch>
            <Route path="/auth/sign-in" component={SignIn} />
            <Route path="/auth/sign-up" component={SignUp} />
            <Redirect to="/auth/sign-in" />
        </Switch>

    </main>
);

export default TemplateAuth;
