// import axios from 'axios';

// const instance = axios.create({
//     baseURL: process.env.REACT_APP_API
// });

// instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// export default instance;
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

// ✅ REQUEST: Attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ RESPONSE: Catch token expiry
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
        ) {
            // 🔐 Token expired / invalid
            localStorage.clear();
            window.location.href = '/'; // redirect immediately
        }
        return Promise.reject(error);
    }
);

export default api;
