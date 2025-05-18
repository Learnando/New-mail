import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children, }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("haitiUser");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            }
            catch {
                localStorage.removeItem("haitiUser");
            }
        }
    }, []);
    const login = (userData) => {
        // Ensure token is included and stored
        const fullUser = { ...userData, token: userData.token };
        localStorage.setItem("haitiUser", JSON.stringify(fullUser));
        setUser(fullUser);
    };
    const logout = () => {
        localStorage.removeItem("haitiUser");
        //localStorage.removeItem("haitiUserToken"); // ✅ Clear token explicitly
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: { user, login, logout }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
