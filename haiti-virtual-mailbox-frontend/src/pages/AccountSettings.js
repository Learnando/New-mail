import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "../styles/AccountSettings.css";
const AccountSettings = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?._id) {
            toast.error(t("account.userIdMissing"));
            return;
        }
        try {
            await api.patch(`/users/${user._id}/update-account`, { email, password });
            toast.success(t("account.success"));
        }
        catch (err) {
            console.error(err);
            toast.error(t("account.error"));
        }
    };
    return (_jsxs("div", { className: "account-settings", children: [_jsxs("h2", { children: ["\u2699\uFE0F ", t("account.title")] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["\uD83D\uDCE7 ", t("account.email")] }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["\uD83D\uDD12 ", t("account.newPassword")] }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: t("account.passwordPlaceholder") })] }), _jsxs("button", { type: "submit", children: ["\uD83D\uDCBE ", t("account.saveChanges")] })] })] }));
};
export default AccountSettings;
