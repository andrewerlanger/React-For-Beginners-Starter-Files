// Even the Router is a component in React.js
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* This says mount the StorePicker component for the root path */}
                <Route exact path="/" component={StorePicker} />
                <Route path="/store/:storeId" component={App} />
                {/* This renders out a catch-all component (with no path) */}
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;
