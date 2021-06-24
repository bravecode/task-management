import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthService from '../../services/authService';
import Head from '../../shared/head/Head';

// Views
import Home from '../../views/home';
import Logout from '../../views/logout';

const TemplateDefault: React.FC = () => {
    const authService = new AuthService({});
    const token = authService.getToken();

    if (!token) {
        return <Redirect to="/auth/sign-in" />;
    }

    return (
        <main className="template--default">

            <Head />

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/logout" component={Logout} />
                <Redirect to="/" />
            </Switch>

        </main>
    );
};

export default TemplateDefault;
