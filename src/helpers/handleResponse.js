import { authenticationService } from '../services/authentication';

export function handleResponse(response) {
    return response.text().then(text => {
        //console.log('handleResponse: ', text);
        //console.log('handleResponse json: ', JSON.parse(text));
        console.log('handleResponse', text);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        //console.log('handleResponse text: ', text);    
        //console.log('handleResponse result: ', data);
        return data;
    });
}