import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PackageCard from "../components/PackageCard";
import { fetchUserPackages } from "../services/packageService";
import api from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useTranslation } from "react-i18next";
import ReviewForm from "../components/ReviewForm"; // ✅ NEW
import "../styles/Dashboard.css";
const Dashboard = () => {
    const { user } = useAuth();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    useEffect(() => {
        const fetchPackages = async () => {
            if (!user)
                return;
            try {
                const data = await fetchUserPackages(user._id);
                const sorted = [...data].sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
                setPackages(sorted);
            }
            catch (err) {
                console.error("Failed to load packages:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, [user]);
    const handleDelete = async (id) => {
        const confirm = window.confirm(t("confirmRemove"));
        if (!confirm)
            return;
        try {
            await api.delete(`/packages/user-delete/${id}`);
            setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
            toast.success(t("removed"));
        }
        catch (err) {
            console.error("Failed to remove package from user view:", err);
            toast.error(t("removeFail"));
        }
    };
    const handleCancel = async (id) => {
        const confirm = window.confirm(t("confirmCancel"));
        if (!confirm)
            return;
        try {
            await api.patch(`/packages/${id}/cancel`);
            setPackages((prev) => prev.map((pkg) => pkg._id === id ? { ...pkg, status: "Cancelled" } : pkg));
            toast.success(t("cancelled"));
        }
        catch (err) {
            console.error("Failed to cancel package:", err);
            toast.error(t("cancelFail"));
        }
    };
    const firstName = user?.name?.split(" ")[0] || t("user");
    const totalPackages = packages.length;
    const pending = packages.filter((p) => p.status === "Pending").length;
    const inTransit = packages.filter((p) => p.status === "Purchased" || p.status === "Shipped").length;
    const delivered = packages.filter((p) => p.status === "Delivered").length;
    let badgeText = t("badge.newbie");
    let badgeClass = "newbie";
    if (totalPackages >= 7) {
        badgeText = t("badge.vip");
        badgeClass = "vip";
    }
    else if (totalPackages >= 6) {
        badgeText = t("badge.gold");
        badgeClass = "gold";
    }
    else if (totalPackages >= 5) {
        badgeText = t("badge.silver");
        badgeClass = "silver";
    }
    else if (totalPackages >= 4) {
        badgeText = t("badge.bronze");
        badgeClass = "bronze";
    }
    return (_jsxs("div", { className: "dashboard", children: [_jsxs("h2", { children: ["\uD83D\uDC4F", t("welcome.greeting", { name: firstName })] }), _jsx("div", { className: "badge-container", children: _jsx("div", { className: `loyalty-badge ${badgeClass}`, children: badgeText }) }), _jsx("div", { className: "referral-credits-box", children: _jsxs("p", { children: ["\uD83D\uDCB3 ", _jsxs("strong", { children: [t("referral.credits"), ":"] }), " ", _jsx("span", { children: user?.credits ?? 0 })] }) }), user?.referralCode && (_jsxs("div", { className: "referral-box", children: [_jsxs("p", { children: ["\uD83D\uDD17 ", _jsxs("strong", { children: [t("referral.code"), ":"] }), " ", _jsx("code", { children: user.referralCode })] }), _jsxs("p", { children: [t("referral.share"), " ", _jsx("code", { children: `${window.location.origin}/register?ref=${user.referralCode}` })] }), _jsxs("button", { onClick: () => {
                            navigator.clipboard.writeText(`${window.location.origin}/register?ref=${user.referralCode}`);
                            toast.success(t("referral.copied"));
                        }, children: ["\uD83D\uDCCB ", t("referral.copyButton")] })] })), _jsxs("div", { className: "greeting-container", children: [_jsx("p", { children: t("addressTitle") }), _jsxs("div", { className: "address-box", children: [_jsxs("pre", { children: [user?.name, " #", user?.virtualAddress, "\n", "1234 NW 55th St", "\n", "Miami, FL ", _jsx("span", { className: "highlight", children: "33142" })] }), _jsxs("button", { className: "copy-btn", onClick: () => {
                                    navigator.clipboard.writeText(`${user?.name} #${user?.virtualAddress}\n1234 NW 55th St\nMiami, FL 33142`);
                                    toast.success(t("copied"));
                                }, children: ["\uD83D\uDCCB ", t("copy")] })] })] }), _jsxs("div", { className: "stats-cards", children: [_jsxs("div", { className: "card total", children: [_jsxs("h3", { children: [t("total"), " \uD83D\uDCE6"] }), _jsx("p", { children: totalPackages })] }), _jsxs("div", { className: "card pending", children: [_jsxs("h3", { children: [t("pending"), " \uD83D\uDED2"] }), _jsx("p", { children: pending })] }), _jsxs("div", { className: "card in-transit", children: [_jsxs("h3", { children: [t("inTransit"), " \u2708\uFE0F"] }), _jsx("p", { children: inTransit })] }), _jsxs("div", { className: "card delivered", children: [_jsxs("h3", { children: [t("delivered"), " \uD83D\uDE9A"] }), _jsx("p", { children: delivered })] })] }), _jsxs("div", { className: "dashboard-actions", children: [_jsx(Link, { to: "/submit", children: _jsxs("button", { className: "submit-package-button", children: ["\u2795 ", t("submitPackage")] }) }), _jsx(Link, { to: "/buy-for-me", children: _jsxs("button", { className: "submit-package-button", children: ["\uD83D\uDECD\uFE0F ", t("buyForMe")] }) }), _jsx(Link, { to: "/my-requests", children: _jsxs("button", { className: "submit-package-button", children: ["\uD83D\uDED2 ", t("myRequests")] }) })] }), _jsxs("h3", { children: [t("yourPackages"), ":"] }), loading ? (_jsx(Spinner, {})) : packages.length === 0 ? (_jsx("p", { children: t("noPackages") })) : (packages.map((pkg) => (_jsxs("div", { style: { marginBottom: "30px" }, children: [pkg.status === "Delivered" && !pkg.rating && (_jsx(ReviewForm, { packageId: pkg._id, onSubmitted: () => {
                            toast.success("Thank you for your feedback!");
                            setPackages((prev) => prev.map((p) => p._id === pkg._id
                                ? { ...p, rating: 5, review: "submitted" }
                                : p));
                        } })), _jsx(PackageCard, { _id: pkg._id, trackingNumber: pkg.trackingNumber || "N/A", status: pkg.status, sender: pkg.sender || t("unknown"), description: pkg.description || t("noDescription"), createdAt: pkg.createdAt, screenshotUrl: pkg.screenshotUrl || undefined, onDelete: handleDelete, onCancel: handleCancel })] }, pkg._id))))] }));
};
export default Dashboard;
