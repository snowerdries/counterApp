import * as axios from 'axios';
const authUrl = `${window.location.origin}/api/user`;
const logOutUrl = `${window.location.origin}/api/user/logout`;

export const doAuthenticate = () => axios.get(authUrl);

export const doLogout = () => axios.get(logOutUrl);

export const updateTask = (task) => axios.put(`${window.location.origin}/api/task/${task.id}`, task);
