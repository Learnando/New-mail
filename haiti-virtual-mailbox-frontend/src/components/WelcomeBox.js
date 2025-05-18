import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import "../styles/WelcomeBox.css";
const WelcomeBox = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    if (!user)
        return null;
    const { name, virtualAddress } = user;
    const firstName = name?.split(" ")[0] || t("welcome.user");
    return (_jsxs("div", { className: "welcome-box", children: [_jsx("h2", { children: t("welcome.greeting", { name: firstName }) }), " ", _jsx("p", { children: t("welcome.addressLabel") }), _jsxs("div", { className: "address-block", children: [_jsxs("pre", { children: [name, " #", virtualAddress, "\n", "1234 NW 55th St", "\n", "Miami, FL ", _jsx("span", { className: "highlight", children: "33142" })] }), _jsxs("button", { className: "copy-btn", onClick: () => {
                            navigator.clipboard.writeText(`${name} #${virtualAddress}\n1234 NW 55th St\nMiami, FL 33142`);
                            toast.success(t("welcome.copied"));
                        }, children: ["\uD83D\uDCCB ", t("welcome.copy")] })] })] }));
};
export default WelcomeBox;
