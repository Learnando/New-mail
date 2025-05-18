import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Step1ContactInfo from "./Step1ContactInfo";
import Step2PackageDetails from "./Step2PackageDetails";
import Step3ShippingDelivery from "./Step3ShippingDelivery";
import Step4ConfirmSubmit from "./Step4ConfirmSubmit";
import ProgressBar from "./ProgressBar";
import "../styles/MultiStepForm.css";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const MultiStepForm = () => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        customerName: user?.name || "",
        whatsapp: "",
        sender: "",
        description: "",
        price: "",
        shipping: "air",
        delivery: "pickup",
        note: "",
        screenshot: null,
        creditsToUse: "", // ✅ Add credits field
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "price") {
            const numericValue = value.replace(/,/g, "").replace(/[^\d.]/g, "");
            if (numericValue === "") {
                setFormData((prev) => ({ ...prev, [name]: "" }));
                return;
            }
            const parts = numericValue.split(".");
            const integerPart = parts[0];
            const decimalPart = parts[1] || "";
            const formattedInteger = parseInt(integerPart, 10).toLocaleString("en-US");
            const formatted = decimalPart.length > 0
                ? `${formattedInteger}.${decimalPart.slice(0, 2)}`
                : formattedInteger;
            setFormData((prev) => ({ ...prev, [name]: formatted }));
            return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, screenshot: file }));
    };
    const handleNext = () => {
        if (step === 1 && !formData.whatsapp.trim()) {
            toast.error("📞 " + t("error.phoneRequired"));
            return;
        }
        if (step === 2) {
            if (!formData.description.trim()) {
                toast.error("🛍️ " + t("error.descriptionRequired"));
                return;
            }
            const rawPrice = formData.price.replace(/,/g, "");
            if (!rawPrice || isNaN(Number(rawPrice))) {
                toast.error("💵 " + t("error.priceRequired"));
                return;
            }
            if (formData.creditsToUse &&
                (isNaN(Number(formData.creditsToUse)) ||
                    Number(formData.creditsToUse) < 0)) {
                toast.error("💳 Invalid referral credits value.");
                return;
            }
        }
        if (step < 4) {
            setStep((prev) => prev + 1);
        }
    };
    const handleBack = () => {
        if (step > 1)
            setStep((prev) => prev - 1);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.screenshot) {
            toast.error("📸 " + t("error.screenshotRequired"));
            return;
        }
        const data = new FormData();
        for (const key in formData) {
            let value = formData[key];
            if (value !== null) {
                if (key === "price" && typeof value === "string") {
                    value = value.replace(/,/g, "");
                }
                if (key === "creditsToUse" && value === "") {
                    value = "0"; // default to 0
                }
                data.append(key, value);
            }
        }
        if (user?._id) {
            data.append("userId", user._id);
        }
        try {
            const res = await fetch("http://localhost:5000/api/packages", {
                method: "POST",
                body: data,
            });
            const result = await res.json();
            console.log("📦 Package submitted:", result);
            toast.success("✅ " + t("submit.success"));
            setFormData({
                customerName: user?.name || "",
                whatsapp: "",
                sender: "",
                description: "",
                price: "",
                shipping: "air",
                delivery: "pickup",
                note: "",
                screenshot: null,
                creditsToUse: "",
            });
            setStep(1);
        }
        catch (err) {
            console.error("❌ Failed to submit package:", err);
            toast.error(t("submit.failed"));
        }
    };
    return (_jsxs("div", { className: "multi-step-form", children: [_jsx(ProgressBar, { currentStep: step }), step === 1 && (_jsx(Step1ContactInfo, { formData: formData, onChange: handleChange })), step === 2 && (_jsx(Step2PackageDetails, { formData: formData, onChange: handleChange, availableCredits: user?.credits ?? 0 })), step === 3 && (_jsx(Step3ShippingDelivery, { formData: formData, onChange: handleChange })), step === 4 && (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx(Step4ConfirmSubmit, { formData: formData, onFileChange: handleFileChange }), _jsxs("div", { className: "navigation-buttons", children: [_jsxs("button", { type: "button", onClick: handleBack, children: ["\u2B05\uFE0F ", t("back")] }), _jsx("button", { type: "submit", children: t("submit.finalize") })] })] })), step < 4 && (_jsxs("div", { className: "navigation-buttons", children: [step > 1 && (_jsxs("button", { type: "button", onClick: handleBack, children: ["\u2B05\uFE0F ", t("back")] })), _jsxs("button", { type: "button", onClick: handleNext, children: [t("next"), " \u27A1\uFE0F"] })] }))] }));
};
export default MultiStepForm;
