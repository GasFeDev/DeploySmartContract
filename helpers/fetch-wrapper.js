import getConfig from 'next/config';

import { userService } from '../services';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    postFile,
    put,
    patch,
    delete: _delete
};

function get(url) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors', 
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },        
        mode: 'cors', 
        body: JSON.stringify(body)
    };    
    
    return fetch(url, requestOptions).then(handleResponse);
}

function postFile(url,body,file){
    const json = JSON.stringify(body);
    const blob = new Blob([json], {
        type: 'application/json'
    });

    let data = new FormData();
    data.append('file', file);
    data.append('contract', blob);

    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(url) },        
        mode: 'cors', 
        body: data
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        mode: 'cors', 
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

function patch(url, body) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        mode: 'cors', 
        body: JSON.stringify(body)
    };
    console.log(requestOptions)
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url),
        mode: 'cors', 
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    const isLoggedIn = user && user.idToken;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.idToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}