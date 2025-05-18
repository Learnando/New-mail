import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import "../styles/Navbar.css";
const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return (_jsxs("nav", { className: "navbar", children: [_jsxs("div", { className: "navbar-left", children: [_jsx(Link, { to: "/", className: "navbar-logo", children: "\uD83D\uDCE6 Bwat Lakay" }), _jsxs("div", { className: "language-toggle", children: [_jsxs("label", { className: "switch", children: [_jsx("input", { type: "checkbox", checked: i18n.language === "ht", onChange: (e) => changeLanguage(e.target.checked ? "ht" : "en") }), _jsx("span", { className: "slider round" })] }), _jsx("span", { className: "lang-label", children: i18n.language === "ht" ? "Kreyòl" : "English" })] })] }), _jsx("div", { className: "navbar-links", children: user ? (_jsxs(_Fragment, { children: [user.isAdmin ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/admin/dashboard", children: t("nav.dashboard") }), _jsx(Link, { to: "/admin/users", children: t("nav.manageUsers") }), _jsx(Link, { to: "/admin", children: t("nav.managePackages") }), _jsx(Link, { to: "/admin/manage-requests", children: t("nav.manageRequests") }), _jsx(Link, { to: "/admin/support", children: "\uD83D\uDCE8 Support Messages" }), _jsx(Link, { to: "/admin/global-message", children: t("nav.globalMessage") }), _jsx(Link, { to: "/admin/generate-reset", children: "\uD83D\uDD10 Reset User Password" }), " "] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/dashboard", children: t("nav.dashboard") }), _jsx(Link, { to: "/submit", children: t("nav.submit") }), _jsx(Link, { to: "/track", children: t("nav.track") })] })), _jsxs(Link, { to: "/account", children: ["\u2699\uFE0F ", t("nav.accountSettings")] }), _jsxs(Link, { to: "/help", children: ["\u2753 ", t("nav.help")] }), _jsx("button", { onClick: handleLogout, className: "logout-btn", children: t("nav.logout") })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", children: t("nav.login") }), _jsx(Link, { to: "/register", children: t("nav.register") }), _jsx(Link, { to: "/about", children: t("nav.about") }), " ", _jsxs(Link, { to: "/faq", children: ["\u2753 ", t("nav.faq")] }), _jsxs(Link, { to: "/help", children: ["\u2753 ", t("nav.help")] })] })) })] }));
};
export default Navbar;
