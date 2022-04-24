import axios from "axios"
import { getAccessToken, getRefreshToken, removeTokens, setTokens } from "./token";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers!['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        if (originalConfig.url !== "/user/login" && originalConfig.url !== "/user/register") {
            if (error.response.status === 401 && !originalConfig.__isRetryRequest) {
                originalConfig.__isRetryRequest = true;
                const refreshToken = getRefreshToken();
                try {
                    const { data } = await instance.post('/user/refresh', { refresh_token: refreshToken });
                    setTokens(data.tokens.access_token, data.tokens.refresh_token);
                    // originalConfig.headers!['Authorization'] = `Bearer ${data.tokens.access_token}`;
                    return await instance.request(originalConfig);
                } catch (err) {
                    console.log(err)
                    removeTokens();
                    window.location.href = "/#/login";
                }
            }
        }
        return Promise.reject(error);
    }
)

export default instance;