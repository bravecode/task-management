import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Head from '../../shared/head/Head';

// Views
import Home from '../../views/home';

const TemplateDefault: React.FC = () => (
    <main className="template--default">

        <Head />

        <Switch>
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
        </Switch>

    </main>
);

export default TemplateDefault;
