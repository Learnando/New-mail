import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { toast } from "react-toastify"; // ✅ Import toast
import "../styles/AdminPanel.css";
const AdminGenerateResetLink = () => {
    const [email, setEmail] = useState("");
    const [resetUrl, setResetUrl] = useState("");
    const [error, setError] = useState("");
    const handleGenerate = async (e) => {
        e.preventDefault();
        setError("");
        setResetUrl("");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/generate-reset-link`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error(data.message || "Failed to generate reset link");
            const token = data.resetUrl.split("/reset/")[1];
            const fullUrl = `https://bwatlakay.com/reset/${token}`;
            setResetUrl(fullUrl);
            toast.success("✅ Reset link generated!");
        }
        catch (err) {
            setError(err.message);
            toast.error("❌ " + err.message);
        }
    };
    const handleCopy = async () => {
        if (!resetUrl)
            return;
        await navigator.clipboard.writeText(resetUrl);
        toast.info("📋 Link copied to clipboard!");
        // ✅ Clear everything after copy
        setEmail("");
        setResetUrl("");
        setError("");
    };
    return (_jsxs("div", { className: "admin-panel", children: [_jsx("h2", { children: "\uD83D\uDD10 Generate Password Reset Link" }), _jsxs("form", { onSubmit: handleGenerate, children: [_jsx("input", { type: "email", placeholder: "Enter user email", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx("button", { type: "submit", children: "Generate Reset Link" })] }), resetUrl && (_jsxs("div", { className: "reset-link-output", style: { marginTop: "15px" }, children: [_jsx("p", { children: "\u2705 Reset Link:" }), _jsxs("div", { style: { display: "flex", gap: "10px" }, children: [_jsx("input", { readOnly: true, value: resetUrl, style: { flex: 1 } }), _jsx("button", { onClick: handleCopy, children: "\uD83D\uDCCB Copy" })] })] })), error && _jsxs("p", { style: { color: "red" }, children: ["\u274C ", error] })] }));
};
export default AdminGenerateResetLink;
