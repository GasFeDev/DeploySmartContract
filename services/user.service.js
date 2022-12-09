import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'

import { fetchWrapper } from '../helpers';


const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    createReactor,
    getReactors,
    updateReactor,
    generateRandomID,
    logout
};

function login(email, password) {    
    return fetchWrapper.post(`${baseUrl}auth/sign-in`, { email, password })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            if(user.data.groups){                
                if(!user.data.groups.includes('admin') || user.data.groups.length == 0){
                    throw new Error("No eres administrador, contáctese con soporte técnico")    
                }
                
            }else{
                throw new Error("Error en la respuesta autenticación")
            }
            userSubject.next(user.data);
            localStorage.setItem('user', JSON.stringify(user.data));
            return user.data;
        });
}

function createReactor(reactor,file){
    return fetchWrapper.postFile(`${baseUrl}api/reactor`, reactor, file)
}

function getReactors(){
    return fetchWrapper.get(`${baseUrl}api/reactor`)
}

function updateReactor(id,reactor){
    return fetchWrapper.patch(`${baseUrl}api/reactor/${id}`,reactor)
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

function generateRandomID(length){
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}