import api from "./api"

export const login = (email: string, password: string) => {
    return api.post("/user/login", { email, password });
}

export const register = (name: string, email: string, password: string) => {
    return api.post("/user/register", { name, email, password });
}

export const currentUser = () => {
    return api.get("/user/profile");
}