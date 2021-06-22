import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import SignIn from '../../views/auth/sign-in';
import SignUp from '../../views/auth/sign-up';

const TemplateAuth: React.FC = () => (
    <main className="template--auth">

        <Switch>
            <Route path="/auth/sign-in" component={SignIn} />
            <Route path="/auth/sign-up" component={SignUp} />
            <Redirect to="/auth/sign-in" />
        </Switch>

    </main>
);

export default TemplateAuth;
