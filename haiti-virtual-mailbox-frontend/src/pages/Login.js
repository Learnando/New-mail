import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Link added
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authService";
import "../styles/Auth.css";
const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const { login: loginUser } = useAuth();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(form.email, form.password);
            if (!user.token) {
                setMessage("Login failed. No token received.");
                return;
            }
            localStorage.setItem("haitiUserToken", user.token);
            loginUser(user);
            if (user.isAdmin) {
                navigate("/admin/dashboard");
            }
            else {
                navigate("/dashboard");
            }
        }
        catch (err) {
            console.error("Login failed:", err);
            setMessage("Login failed. Please check your credentials.");
        }
    };
    return (_jsxs("div", { className: "auth-container", children: [_jsx("h2", { children: "Login" }), message && _jsx("p", { className: "error-message", children: message }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { name: "email", type: "email", value: form.email, onChange: handleChange, placeholder: "Email", required: true }), _jsx("input", { name: "password", type: "password", value: form.password, onChange: handleChange, placeholder: "Password", required: true }), _jsx("button", { type: "submit", children: "Login" })] }), _jsx("div", { style: { marginTop: "1rem" }, children: _jsx(Link, { to: "/forgot-password", className: "forgot-link", children: "Forgot Password?" }) })] }));
};
export default Login;
