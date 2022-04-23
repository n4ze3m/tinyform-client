export const getRefreshToken =  () => {
    const token =  localStorage.getItem("refreshToken");
    return token;
}

export const getAccessToken =  () => {
    const token =  localStorage.getItem("accessToken");
    return token;
}

export const setTokens = (accessToken:string, refreshToken:string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}