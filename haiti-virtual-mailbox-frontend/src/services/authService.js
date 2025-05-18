// services/authService.ts
import api from "./api";
export const register = async (name, email, password, ref) => {
    const res = await api.post("/auth/register", {
        name,
        email,
        password,
        ref, // ✅ include referral
    });
    return res.data;
};
export const login = async (email, password) => {
    const res = await api.post("/users/login", { email, password });
    return res.data; // ✅ explicitly cast
};
