import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Auth.css"; // You can reuse your auth styles
const ForgotPassword = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.message || "Something went wrong");
            setSuccess(true);
        }
        catch (err) {
            setError(err.message || "Failed to send reset email");
        }
    };
    return (_jsxs("div", { className: "form-container", children: [_jsx("h2", { children: t("auth.forgotTitle", "Forgot Password") }), success ? (_jsxs("p", { style: { color: "green" }, children: ["\u2705 ", t("auth.resetSent", "Check your email for reset instructions.")] })) : (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "email", placeholder: t("auth.email", "Your email"), value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx("button", { type: "submit", children: t("auth.sendReset", "Send Reset Link") })] })), error && _jsxs("p", { style: { color: "red" }, children: ["\u26A0\uFE0F ", error] })] }));
};
export default ForgotPassword;
