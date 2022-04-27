import api from "./api"

export const deleteUserSubmission =  (formId: string, submissionId: string) => {
    return api.delete(`/user/form/${formId}/${submissionId}`)
}

export const deleteUserForm = (formId: string) => {
    return api.delete(`/user/form/${formId}`)
}