import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Or reuse Auth.css
const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }
            setMessage("✅ Password reset successful. Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        }
        catch (err) {
            setMessage(err.message || "Failed to reset password");
        }
    };
    return (_jsxs("div", { className: "form-container", children: [_jsx("h2", { children: "\uD83D\uDD10 Reset Password" }), message && (_jsx("p", { style: { color: message.startsWith("✅") ? "green" : "red" }, children: message })), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "password", placeholder: "New password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx("input", { type: "password", placeholder: "Confirm password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true }), _jsx("button", { type: "submit", children: "Reset Password" })] })] }));
};
export default ResetPassword;
