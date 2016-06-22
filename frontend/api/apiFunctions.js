import * as axios from 'axios';
const authUrl = `${window.location.origin}/api/user`;
const logOutUrl = `${window.location.origin}/api/user/logout`;

export const doAuthenticate = () => axios.get(authUrl);

export const doLogout = () => axios.get(logOutUrl);

export const updateTask = (task) => axios.put(`${window.location.origin}/api/task/${task._id}`, task);

export const insertTask = (task) => axios.post(`${window.location.origin}/api/task`, task);

export const getTasks = () => axios.get(`${window.location.origin}/api/task`);

export const deleteTaskOnServer = (task) => axios.delete(`${window.location.origin}/api/task/${task._id}`);
