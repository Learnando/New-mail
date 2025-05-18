import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles/VirtualAddress.css";
import { useTranslation } from "react-i18next"; // ✅
const VirtualAddress = ({ address }) => {
    const { t } = useTranslation(); // ✅
    return (_jsxs("div", { className: "virtual-address", children: [_jsx("h2", { children: t("virtualAddress.label") }), _jsx("code", { children: address })] }));
};
export default VirtualAddress;
