import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/SupportModal.css";
const SupportModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { t } = useTranslation();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const toggleModal = () => {
        setIsOpen(!isOpen);
        setSubmitted(false);
    };
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setSubmitted(true);
                setForm({ name: "", email: "", phone: "", message: "" });
            }
            else {
                alert(t("support.error"));
            }
        }
        catch (err) {
            alert(t("support.error"));
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("button", { className: "support-icon", onClick: toggleModal, children: ["\uD83D\uDCAC ", _jsx("span", { className: "support-label", children: t("support.needHelp") })] }), isOpen && (_jsx("div", { className: "support-modal", children: _jsxs("div", { className: "support-modal-content", children: [_jsx("button", { className: "close-btn", onClick: toggleModal, children: "\u2716" }), _jsxs("h3", { children: ["\uD83D\uDCE8 ", t("support.title")] }), submitted ? (_jsxs("p", { className: "success-message", children: ["\u2705 ", t("support.success")] })) : (_jsxs("form", { onSubmit: handleSubmit, className: "support-form", children: [_jsx("input", { type: "text", name: "name", placeholder: t("support.name"), value: form.name, onChange: handleChange, required: true }), _jsx("input", { type: "email", name: "email", placeholder: t("support.email"), value: form.email, onChange: handleChange, required: true }), _jsx("input", { type: "tel", name: "phone", placeholder: t("support.phone"), value: form.phone, onChange: handleChange, required: true }), _jsx("textarea", { name: "message", placeholder: t("support.message"), rows: 4, value: form.message, onChange: handleChange, required: true }), _jsx("button", { type: "submit", children: t("support.send") })] }))] }) }))] }));
};
export default SupportModal;
