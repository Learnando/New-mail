import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (!user.isAdmin) {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    return _jsx(_Fragment, { children: children }); // ✅ Wrap children inside fragment
};
export default AdminRoute;
