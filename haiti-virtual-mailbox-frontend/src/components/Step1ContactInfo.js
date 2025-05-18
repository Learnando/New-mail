import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from "react-i18next"; // ✅
const Step1ContactInfo = ({ formData, onChange }) => {
    const { t } = useTranslation(); // ✅
    return (_jsxs("div", { className: "step-container", children: [_jsxs("h3", { children: ["\uD83D\uDC64 ", t("step1.title")] }), _jsx("input", { type: "text", name: "customerName", value: formData.customerName, onChange: onChange, placeholder: t("step1.customerName"), required: true }), _jsx("input", { type: "text", name: "whatsapp", value: formData.whatsapp, onChange: onChange, placeholder: t("step1.phone"), required: true })] }));
};
export default Step1ContactInfo;
