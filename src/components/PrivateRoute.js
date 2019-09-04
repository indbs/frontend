import   React                                    from 'react';
import { Route, Redirect }                        from 'react-router-dom';
import { authenticationService }                  from '../services/authentication';

// PrivateRoute to allow browsing only for correctly logged in users

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            return <Redirect to={{ pathname: '/welcomePage', state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)