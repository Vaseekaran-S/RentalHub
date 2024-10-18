import axios from "axios";

const baseURL = process.env.BACKEND_API || "https://api-rental-hub.vercel.app/api/";
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

let instance = axios.create({
    baseURL,
    headers: {
        // This is a custom header, but CORS needs to be allowed on the server for it
        'x-user-timezone': timeZone,
        // Add Content-Type if you're sending JSON data
        'Content-Type': 'application/json',
    }
});

// Default headers can be set globally for all requests
instance.defaults.headers.common['x-user-timezone'] = timeZone;

// Optionally, handle preflight for cross-origin requests
instance.interceptors.request.use((config) => {
    config.headers['Access-Control-Allow-Origin'] = '*'; // Set to '*' or specific origin
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, x-user-timezone';
    return config;
});

export default instance;