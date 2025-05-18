import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SupportModal from "../components/SupportModal"; // ✅ import modal
const Home = () => {
    const { t } = useTranslation();
    return (_jsxs("div", { className: "home-page", children: [_jsx("h1", { children: t("home.title") }), _jsx("p", { children: t("home.subtitle") }), _jsx(Link, { to: "/register", className: "btn", children: t("home.getStarted") }), _jsx(SupportModal, {}), " "] }));
};
export default Home;
