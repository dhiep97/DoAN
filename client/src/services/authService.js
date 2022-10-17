import axios from '../axios';

const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword});
}

const handleRegister = (data) => {
    return axios.post('/api/register', data);
}

export { handleLogin, handleRegister }