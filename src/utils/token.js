export const storeToken = (token) => {
    localStorage.setItem("jwt-auth", token);
};

export const getToken = () => {
    return localStorage.getItem("jwt-auth") ?? null;
};

export const deleteToken = () => {
    localStorage.removeItem("jwt-auth");
};