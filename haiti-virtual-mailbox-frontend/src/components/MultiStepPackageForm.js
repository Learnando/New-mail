import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/MultiStepPackageForm.css"; // We'll style later
const MultiStepPackageForm = () => {
    const [step, setStep] = useState(1);
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        customerName: "",
        whatsapp: "",
        description: "",
        price: "",
        shipping: "air",
        delivery: "pickup",
        note: "",
        screenshot: null,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const nextStep = () => setStep((prev) => prev + 1);
    return (_jsxs("div", { className: "multi-step-form", children: [_jsxs("h2", { children: ["\uD83D\uDCE6 ", t("submit.title"), " (", t("step"), " ", step, "/4)"] }), step === 1 && (_jsxs(_Fragment, { children: [_jsx("label", { children: t("submit.nameLabel") }), _jsx("input", { type: "text", name: "customerName", value: formData.customerName, onChange: handleChange, placeholder: t("submit.namePlaceholder"), required: true }), _jsx("label", { children: t("submit.whatsappLabel") }), _jsx("input", { type: "text", name: "whatsapp", value: formData.whatsapp, onChange: handleChange, placeholder: t("submit.whatsappPlaceholder"), required: true }), _jsx("div", { className: "button-group", children: _jsxs("button", { onClick: nextStep, children: [t("next"), " \u27A1\uFE0F"] }) })] }))] }));
};
export default MultiStepPackageForm;
