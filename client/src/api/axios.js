import axios from "axios";

const baseURL = process.env.BACKEND_API || "https://api-rental-hub.vercel.app/api/";
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

let instance = axios.create({
    baseURL,
    headers: {
        'x-user-timezone': timeZone,  // Custom header for timezone
        'Content-Type': 'application/json',  // Default content type
        'Authorization': 'Bearer token_here',  // Add authorization token if needed
    },
    withCredentials: false // Ensure this is false unless you're sending cookies to another domain
});

export default instance;
