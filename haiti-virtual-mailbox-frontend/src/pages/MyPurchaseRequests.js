import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/MyPurchaseRequests.css";
import ReadMore from "../components/ReadMore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // ✅
const MyPurchaseRequests = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const { t } = useTranslation(); // ✅
    useEffect(() => {
        const fetchMyRequests = async () => {
            if (!user?._id)
                return;
            try {
                const res = await api.get(`/purchase-requests/user/${user._id}`);
                setRequests(res.data);
            }
            catch (err) {
                console.error("Failed to fetch user requests:", err);
            }
        };
        fetchMyRequests();
    }, [user]);
    const handleReceiptUpload = async (id, e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const formData = new FormData();
        formData.append("receipt", file);
        try {
            const res = await api.patch(`/purchase-requests/${id}/receipt`, formData);
            setRequests((prev) => prev.map((r) => r._id === id ? { ...r, receiptUrl: res.data.receiptUrl } : r));
            toast.success("✅ " + t("receiptUploaded"));
        }
        catch (err) {
            console.error("Upload failed", err);
            toast.error(t("uploadFail"));
        }
    };
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this request?");
        if (!confirm)
            return;
        try {
            await api.patch(`/purchase-requests/${id}/soft-delete`);
            // 🔥 Filter out deleted item from UI
            setRequests((prev) => prev.filter((r) => r._id !== id));
            toast.success("Request deleted successfully");
        }
        catch (err) {
            console.error("Delete failed", err);
            toast.error("Failed to delete request.");
        }
    };
    const handleCancel = async (id) => {
        const confirm = window.confirm(t("confirmCancel"));
        if (!confirm)
            return;
        try {
            await api.patch(`/purchase-requests/${id}/cancel`);
            setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status: "Cancelled" } : r)));
            toast.info("❌ " + t("cancelledMsg"));
        }
        catch (err) {
            console.error("Cancel failed", err);
            toast.error(t("cancelFail"));
        }
    };
    const translateStatus = (status) => {
        const key = status.toLowerCase().replace(/\s+/g, "");
        return t(key);
    };
    return (_jsxs("div", { className: "dashboard", children: [_jsxs("h2", { children: ["\uD83D\uDCDF ", t("myPurchaseRequests")] }), requests.length === 0 ? (_jsx("p", { children: t("noRequests") })) : (_jsx("ul", { className: "purchase-list", children: requests.map((r) => (_jsxs("li", { className: "purchase-card", children: [_jsxs("div", { className: "card-header", children: [_jsxs("p", { children: [_jsxs("strong", { children: ["\uD83C\uDF4E ", t("itemLink"), ":"] }), " ", _jsx("a", { href: r.itemUrl, target: "_blank", rel: "noreferrer", children: t("viewProduct") })] }), _jsx("button", { onClick: () => handleDelete(r._id), className: "delete-btn", children: "\uD83D\uDD91\uFE0F" })] }), _jsxs("p", { children: [_jsxs("strong", { children: ["\uD83D\uDCB5 ", t("estimatedPrice"), ":"] }), " $", r.estimatedPrice.toFixed(2)] }), _jsxs("p", { children: [_jsxs("strong", { children: ["\uD83D\uDCE6 ", t("quantity"), ":"] }), " ", r.quantity] }), r.notes && (_jsxs("div", { className: "line-item", children: [_jsxs("strong", { children: ["\uD83D\uDCDD ", t("notes"), ":"] }), " ", _jsx(ReadMore, { text: r.notes, maxLength: 80 })] })), _jsxs("p", { children: [_jsxs("strong", { children: ["\uD83D\uDCCC ", t("status"), ":"] }), " ", _jsx("span", { className: `status-badge status-${r.status
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`, children: translateStatus(r.status) })] }), ["Pending", "Awaiting Payment"].includes(r.status) && (_jsxs("button", { className: "cancel-btn", onClick: () => handleCancel(r._id), children: ["\u274C ", t("cancelRequest")] })), typeof r.finalFee === "number" && (_jsxs("div", { className: "payment-alert-box", children: [_jsx("p", { children: _jsxs("strong", { children: ["\uD83D\uDCB5 ", t("yourPackageArrived")] }) }), _jsxs("p", { children: [t("shippingFee"), " ", _jsxs("strong", { children: ["$", r.finalFee.toFixed(2)] })] }), _jsxs("p", { children: [t("paymentInstructions"), " ", _jsx("strong", { children: t("cashAppTag") }), _jsx("br", {}), t("uploadReceipt")] }), r.receiptUrl ? (_jsxs(_Fragment, { children: [_jsxs("p", { style: { color: "green", marginTop: "10px" }, children: ["\u2705 ", t("receiptUploaded")] }), r.isPaid && (_jsxs("p", { style: { color: "blue", fontWeight: "bold" }, children: ["\uD83D\uDCE6 ", t("itemPaid")] }))] })) : (_jsx("input", { type: "file", className: "file-input", accept: "image/*", onChange: (e) => handleReceiptUpload(r._id, e) }))] })), r.screenshotUrl && (_jsxs("p", { children: [_jsx("strong", { children: "\uD83D\uDCF7 Screenshot:" }), " ", _jsx("a", { href: `http://localhost:5000${r.screenshotUrl}`, target: "_blank", rel: "noreferrer", children: t("viewProduct") })] })), _jsxs("p", { children: [_jsxs("strong", { children: ["\uD83D\uDCC5 ", t("submitted"), ":"] }), " ", new Date(r.createdAt || "").toLocaleDateString()] })] }, r._id))) }))] }));
};
export default MyPurchaseRequests;
