import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { register } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Register.css"; // Adjust path if different
const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [ref, setRef] = useState(null);
    const [agreedToTerms, setAgreedToTerms] = useState(false); // ✅ New state
    // ✅ Get ?ref=... from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const referral = params.get("ref");
        if (referral)
            setRef(referral);
    }, [location.search]);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            toast.error("You must agree to the Terms and Conditions.");
            return;
        }
        try {
            const user = (await register(form.name, form.email, form.password, ref));
            login(user);
            navigate("/dashboard");
        }
        catch (err) {
            console.error("AxiosError", err);
            if (err.response?.status === 409) {
                toast.success("You already have an account. Redirecting to login...");
                navigate("/login");
                return;
            }
            setMessage("Registration failed. Please try again.");
        }
    };
    return (_jsxs("div", { className: "auth-container", children: [_jsx("h2", { children: "Create Account" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { name: "name", type: "text", placeholder: "Full Name", onChange: handleChange, required: true }), _jsx("input", { name: "email", type: "email", placeholder: "Email", onChange: handleChange, required: true }), _jsx("input", { name: "password", type: "password", placeholder: "Password", onChange: handleChange, required: true }), _jsx("div", { className: "terms-checkbox", children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: agreedToTerms, onChange: () => setAgreedToTerms(!agreedToTerms), required: true }), "\u00A0 I agree to the", " ", _jsx(Link, { to: "/terms", target: "_blank", rel: "noopener noreferrer", children: "\uD83D\uDCC4 Read our full Terms and Conditions" })] }) }), _jsx("button", { type: "submit", disabled: !agreedToTerms, children: "Register" })] }), message && _jsx("p", { children: message })] }));
};
export default Register;
