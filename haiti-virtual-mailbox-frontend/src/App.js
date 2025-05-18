import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PackageDetails from "./pages/PackageDetails";
import PackageForm from "./pages/PackageForm";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import TrackPackage from "./pages/TrackPackage";
import AdminPanel from "./pages/AdminPanel";
import AdminUsers from "./pages/AdminUsers";
import AdminDashboard from "./pages/AdminDashboard";
import PurchaseRequestForm from "./components/PurchaseRequestForm";
import AdminPurchaseRequests from "./pages/AdminPurchaseRequests";
import MyPurchaseRequests from "./pages/MyPurchaseRequests";
import AdminManageRequests from "./pages/AdminManageRequests";
import AdminGlobalMessage from "./pages/AdminGlobalMessage";
import AdminSupportMessages from "./pages/AdminSupportMessages";
import HelpPage from "./pages/HelpPage";
import TermsPage from "./pages/TermsPage";
import AboutPage from "./pages/AboutPage";
import AccountSettings from "./pages/AccountSettings";
import FAQPage from "./pages/FAQPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminGenerateResetLink from "./pages/AdminGenerateResetLink";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";
import "./styles/GlobalBanner.css";
import api from "./services/api";
const App = () => {
    const [globalMessage, setGlobalMessage] = useState("");
    useEffect(() => {
        const fetchGlobalMessage = async () => {
            try {
                const res = await api.get("/settings/global-message");
                setGlobalMessage(res.data.message);
            }
            catch (err) {
                console.error("Failed to fetch global message:", err);
            }
        };
        fetchGlobalMessage();
    }, []);
    return (_jsxs(Router, { children: [_jsx(ToastContainer, { position: "top-center", autoClose: 4000 }), globalMessage.trim() !== "" && (_jsx("div", { className: "global-banner", children: globalMessage })), _jsx(Navbar, {}), _jsx("div", { className: "main-content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/package/:id", element: _jsx(PackageDetails, {}) }), _jsx(Route, { path: "/track", element: _jsx(TrackPackage, {}) }), _jsx(Route, { path: "/help", element: _jsx(HelpPage, {}) }), _jsx(Route, { path: "/terms", element: _jsx(TermsPage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "/account", element: _jsx(AccountSettings, {}) }), _jsx(Route, { path: "/faq", element: _jsx(FAQPage, {}) }), _jsx(Route, { path: "/forgot-password", element: _jsx(ForgotPassword, {}) }), _jsx(Route, { path: "/reset/:token", element: _jsx(ResetPassword, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(PrivateRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/submit", element: _jsx(PrivateRoute, { children: _jsx(PackageForm, {}) }) }), _jsx(Route, { path: "/buy-for-me", element: _jsx(PrivateRoute, { children: _jsx(PurchaseRequestForm, {}) }) }), _jsx(Route, { path: "/my-requests", element: _jsx(PrivateRoute, { children: _jsx(MyPurchaseRequests, {}) }) }), _jsx(Route, { path: "/admin", element: _jsx(AdminRoute, { children: _jsx(AdminPanel, {}) }) }), _jsx(Route, { path: "/admin/requests", element: _jsx(AdminRoute, { children: _jsx(AdminPurchaseRequests, {}) }) }), _jsx(Route, { path: "/admin/users", element: _jsx(AdminRoute, { children: _jsx(AdminUsers, {}) }) }), _jsx(Route, { path: "/admin/dashboard", element: _jsx(AdminRoute, { children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/admin/manage-requests", element: _jsx(AdminRoute, { children: _jsx(AdminManageRequests, {}) }) }), _jsx(Route, { path: "/admin/support", element: _jsx(AdminSupportMessages, {}) }), _jsx(Route, { path: "/admin/global-message", element: _jsx(AdminRoute, { children: _jsx(AdminGlobalMessage, {}) }) }), _jsx(Route, { path: "/admin/generate-reset", element: _jsx(AdminRoute, { children: _jsx(AdminGenerateResetLink, {}) }) })] }) }), _jsx("footer", { className: "app-footer", children: _jsx(Link, { to: "/terms", children: " \uD83D\uDCC4 Read our full Terms and Conditions" }) })] }));
};
export default App;
