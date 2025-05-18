import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../styles/PurchaseRequestForm.css";
import { useTranslation } from "react-i18next"; // ✅
const PurchaseRequestForm = () => {
    const { user } = useAuth();
    const { t } = useTranslation(); // ✅
    const [form, setForm] = useState({
        itemUrl: "",
        estimatedPrice: "",
        quantity: "1",
        notes: "",
        screenshot: null,
        referenceNumber: "", // ✅ NEW
    });
    const [screenshot, setScreenshot] = useState(null);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleFileChange = (e) => {
        setScreenshot(e.target.files?.[0] || null);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error(t("purchaseForm.loginRequired"));
            return;
        }
        const data = new FormData();
        data.append("userId", user._id);
        data.append("itemUrl", form.itemUrl);
        data.append("estimatedPrice", form.estimatedPrice);
        data.append("quantity", form.quantity);
        data.append("notes", form.notes);
        if (form.referenceNumber) {
            data.append("referenceNumber", form.referenceNumber); // ✅ No parsing
        }
        if (screenshot) {
            data.append("screenshot", screenshot);
        }
        try {
            await api.post("/purchase-requests", data);
            toast.success(t("purchaseForm.success"));
            setForm({
                itemUrl: "",
                estimatedPrice: "",
                quantity: "1",
                notes: "",
                screenshot: null,
                referenceNumber: "",
            });
            setScreenshot(null);
        }
        catch (err) {
            console.error("Error submitting purchase request:", err);
            toast.error(t("purchaseForm.error"));
        }
    };
    return (_jsxs("div", { className: "purchase-form-wrapper", children: [_jsxs("h2", { children: ["\uD83D\uDED2 ", t("purchaseForm.title")] }), _jsxs("form", { className: "purchase-form", onSubmit: handleSubmit, children: [_jsxs("label", { children: ["\uD83D\uDD22 Reference Number", _jsx("input", { type: "text" // ✅ allows characters like + and -
                                , name: "referenceNumber", value: form.referenceNumber, onChange: (e) => setForm({ ...form, referenceNumber: e.target.value }), placeholder: "Enter your reference number", required: true })] }), _jsxs("label", { children: ["\uD83D\uDD17 ", t("purchaseForm.link"), _jsx("input", { type: "url", name: "itemUrl", value: form.itemUrl, onChange: handleChange, placeholder: t("purchaseForm.linkPlaceholder"), required: true })] }), _jsxs("label", { children: ["\uD83D\uDCB5 ", t("purchaseForm.price"), _jsx("input", { type: "number", name: "estimatedPrice", value: form.estimatedPrice, onChange: handleChange, placeholder: t("purchaseForm.pricePlaceholder"), required: true })] }), _jsxs("label", { children: ["\uD83D\uDCE6 ", t("purchaseForm.quantity"), _jsx("input", { type: "number", name: "quantity", value: form.quantity, onChange: handleChange, min: 1, required: true })] }), _jsxs("label", { children: ["\u270F\uFE0F ", t("purchaseForm.notes"), _jsx("textarea", { name: "notes", value: form.notes, onChange: handleChange, placeholder: t("purchaseForm.notesPlaceholder") })] }), _jsxs("label", { children: ["\uD83D\uDCF8 ", t("purchaseForm.screenshot"), _jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange })] }), _jsx("button", { type: "submit", className: "submit-btn", children: t("purchaseForm.submit") })] })] }));
};
export default PurchaseRequestForm;
