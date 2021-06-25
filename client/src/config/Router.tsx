import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { initializeIcons } from '@fluentui/react/lib/Icons';

// Templates
import TemplateDefault from '../templates/default';
import TemplateAuth from '../templates/auth';

function Router() {
    useEffect(() => {
        initializeIcons();
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/auth" component={TemplateAuth} />
                <Route path="/" component={TemplateDefault} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
