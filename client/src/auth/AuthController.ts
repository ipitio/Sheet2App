import Cookies from 'js-cookie';
import { googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const { TextEncoder, TextDecoder } = require('text-encoding-utf-8');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const jose = require('jose')

const DJANGO_HOST = process.env.REACT_APP_DJANGO_HOST;
const DJANGO_PORT = process.env.REACT_APP_DJANGO_PORT;
const DJANGO_PROTOCOL = process.env.REACT_APP_DJANGO_PROTOCOL;
const DJANGO_URL = `${DJANGO_PROTOCOL}://${DJANGO_HOST}:${DJANGO_PORT}`;

/**
 * Requests OAuth access/refresh tokens, and user email from backend server, then stores them as cookies.
 * @param {string} authCode - The authorization code provided by the GoogleLogin component on login.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function getLoggedIn(authCode: string): Promise<void>{
    /* Specify authorization code in request body. */
    const reqForm: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"authCode": authCode})
    }
    
    /* Send request and set tokens in response as cookies. */
    try {
        const res = await fetch(`${DJANGO_URL}/getLoggedIn`, reqForm);
        if(!res.ok)
            return Promise.reject("Request failed");
            
        const data = await res.json();
        Cookies.set("email", data.email);
        Cookies.set("accessToken", data.access_token);
        Cookies.set("refreshToken", data.refresh_token);
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(err);
    }
}

/**
 * Deletes all user cookies stored during login.
 */
function getLoggedOut(): void {
    Cookies.remove("email");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    googleLogout();
}

/**
 * Checks whether the current access token has expired.
 * @return {boolean} - True if the token is still valid, False otherwise.
 */
function checkAccess(): boolean {
     /* Check if cookie with token exists. */
     const accessToken: string | undefined = Cookies.get("accessToken");
     if(!accessToken)
         return false;
     
     /* Parse out the expiration date from the access token. */
     try {
         const tokenData = jose.JWT.decode(accessToken);
         const exp: number = tokenData.exp * 1000; 
         const curr: number = Date.now();
 
         return exp > curr;
     }
     catch(err) {
         return false;
     }
}

/**
 * Requests a new access token from the server if necessary.
 * @return {Promise<void>} - A promise that resolves on success, rejects on failure.
 */
async function refreshAccess(): Promise <void> {
    /* Check if token expired. */
    if(checkAccess())
        return Promise.resolve();
    
    /* Check if refresh token exists. */
    const refreshToken: string | undefined = Cookies.get("refreshToken");
    if(!refreshToken)
        return Promise.reject("Refresh token missing.")

    /* Specify refresh token in request body. */
    const reqForm: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"refreshToken": Cookies.get("refreshToken")})
    }

    /* Send request and set token in response as cookie. */
    try {
        const res = await fetch(`${DJANGO_URL}/refreshAccess`, reqForm);
        if(!res.ok)
            return Promise.reject("Request failed");
            
        const data = await res.json();
        Cookies.set("accessToken", data.accessToken, { httpOnly: true });
        return Promise.resolve();
    }
    catch(err) {
        return Promise.reject(err);
    }
}

export {getLoggedIn, getLoggedOut, refreshAccess, checkAccess};