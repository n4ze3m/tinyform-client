import api from "./api"

export const getUserForms = () => {
    return api.get("/user/form/");
}

export const getUserFormSnippet = (formId: string) => {
    return api.get(`/user/form/html/${formId}`);
}

export const getUsersSubmissions = (formId: string) =>{
    return api.get(`/user/form/${formId}`)
}