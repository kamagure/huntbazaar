import axios from "axios";

const APP_URL = process.env.MIX_APP_URL;
const BASE_API_URL = process.env.MIX_BASE_API_URL;

//async function to post login
//with 2 parameter (email, pasword)
export const login = async (email, password) => {
    try {
        const res = await axios.post(`${APP_URL}/login`, {      //call post login endpoint with parameter that given (email, password)
            email: email,
            password: password
        });
        return true;
    } catch (err) {
        const message = (err.response 
                        && err.response.data 
                        && err.response.data.message) ? err.response.data.message : err.message;    //get message error from exception handling
        throw new Error(message);                                                                   //throw the error message
    }
};

//async function to post logout
export const logout = async () => {
    try {
        const res = await axios.post(`${APP_URL}/logout`);     //call post logout endpoint
        return true;
    } catch (err) {
        throw new Error(err.message);
    }
};

//async function to post request forgot password
 //with 1 parameter (email)
export const forgotPassword = async (email) => {
    try {
        const res = await axios.post(`${APP_URL}/forgot-password`, {              //call post forgot password endpoint with parameter that given (email)
            email: email
        });
        const message = (res.data 
            && res.data.message) ? res.data.message : "Email sent!";   //check respon have data and message then set message to Email Sent
        return {
            message: message
        };
    } catch (err) {
        const message = (err.response 
            && err.response.data 
            && err.response.data.message) ? err.response.data.message : err.message;    //get message error from exception handling
        throw new Error(message);                                                       //throw the error message
    }
};

//async function to post request reset password
 //with 4 parameter (token, email, password, password_confirmation)
export const resetPassword = async (token, email, password, password_confirmation) => {
    try {
        const res = await axios.post(`${APP_URL}/reset-password`, {                              //call post reset password endpoint with parameter given (token, email, password, password_confirmation)
            token: token,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        });
    } catch (err) {
        const message = (err.response 
            && err.response.data 
            && err.response.data.message) ? err.response.data.message : err.message;    //get message error from exception handling
        throw new Error(message);                                                       //throw the error message
    }
};

//async function to check if user is authenticated
export const isAuthenticated = async () => {
    try {
        const res = await axios.get(`${BASE_API_URL}/check/auth`);                                //call get check auth endpoint
        return res.data.is_auth;                                                       //get return from request
    } catch (err) {
        throw Error(err.message);                                                      //throw error message if error encountered
    }
}