import api from "./api";


export const createForm =  (data:any) => {
    return api.post("/user/form/create", {...data});
}