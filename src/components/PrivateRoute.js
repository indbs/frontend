import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services/authentication';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        console.log('currentUser when route: ', currentUser);
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/welcomePage', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)