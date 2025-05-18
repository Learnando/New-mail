import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserPackages } from "../services/packageService";
import PackageProgress from "../components/PackageProgress";
import "../styles/TrackPackage.css";
import ReadMore from "../components/ReadMore";
import { useTranslation } from "react-i18next"; // ✅
const TrackPackage = () => {
    const { user } = useAuth();
    const [packages, setPackages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation(); // ✅
    useEffect(() => {
        const fetchPackages = async () => {
            if (!user)
                return;
            try {
                const data = await fetchUserPackages(user._id);
                setPackages(data);
            }
            catch (err) {
                console.error("Failed to load packages:", err);
            }
        };
        fetchPackages();
    }, [user]);
    const handleReceiptUpload = async (e, packageId) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const formData = new FormData();
        formData.append("receipt", file);
        try {
            const res = await fetch(`http://localhost:5000/api/packages/${packageId}/upload-receipt`, {
                method: "PATCH",
                body: formData,
            });
            const updated = await res.json();
            setPackages((prev) => prev.map((pkg) => pkg._id === packageId
                ? { ...pkg, receiptUrl: updated.receiptUrl }
                : pkg));
        }
        catch (err) {
            console.error("Failed to upload receipt", err);
        }
    };
    const filteredPackages = packages.filter((pkg) => (pkg.trackingNumber?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (pkg.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()));
    const getStatusBadge = (status) => {
        const normalized = status.toLowerCase();
        if (normalized === "pending")
            return "badge pending";
        if (normalized === "in transit")
            return "badge transit";
        if (normalized === "delivered")
            return "badge delivered";
        if (normalized === "awaiting payment")
            return "badge warning";
        return "badge default";
    };
    return (_jsxs("div", { className: "track-package", children: [_jsxs("h2", { children: ["\u2708\uFE0F ", t("trackYourPackages")] }), _jsx("input", { type: "text", className: "search-input", placeholder: t("searchPlaceholder"), value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), filteredPackages.length === 0 ? (_jsx("p", { children: t("noPackagesFound") })) : (_jsx("div", { className: "package-list", children: filteredPackages.map((pkg) => (_jsxs("div", { className: "package-item", children: [_jsxs("div", { children: [_jsx("strong", { children: pkg.trackingNumber || t("noTracking") }), _jsx(ReadMore, { text: pkg.description || t("noDescription"), maxLength: 100 }), pkg.status === "Awaiting Payment" && pkg.finalFee && (_jsxs("div", { className: "payment-alert", children: [_jsxs("p", { style: { marginTop: "8px", fontWeight: "bold" }, children: ["\uD83D\uDCB5 ", t("yourPackageArrived")] }), _jsxs("p", { children: [t("shippingFee"), " ", _jsxs("strong", { children: ["$", pkg.finalFee.toFixed(2)] })] }), _jsxs("p", { children: [t("paymentInstructions"), " ", _jsx("strong", { children: t("cashAppTag") }), _jsx("br", {}), t("uploadReceipt")] }), pkg.receiptUrl ? (_jsxs("p", { style: { color: "green", fontWeight: "bold" }, children: ["\u2705 ", t("receiptUploaded")] })) : (_jsx("div", { children: _jsx("input", { type: "file", accept: "image/*", onChange: (e) => handleReceiptUpload(e, pkg._id) }) }))] }))] }), _jsx("span", { className: getStatusBadge(pkg.status), children: t(pkg.status.toLowerCase().replace(/\s+/g, "")) }), _jsx(PackageProgress, { status: pkg.status })] }, pkg._id))) }))] }));
};
export default TrackPackage;
