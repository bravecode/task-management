import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Templates
import TemplateDefault from '../templates/default';
import TemplateAuth from '../templates/auth';

function Router() {
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
