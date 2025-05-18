import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/AdminPanel.css"; // reuse admin styles
import { toast } from "react-toastify";
const AdminPurchaseRequests = () => {
    const [requests, setRequests] = useState([]);
    const [feeInputs, setFeeInputs] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/purchase-requests");
                setRequests(res.data);
            }
            catch (err) {
                console.error("Failed to fetch purchase requests:", err);
            }
        };
        fetchData();
    }, []);
    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.patch(`/purchase-requests/${id}/status`, { status: newStatus });
            setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r)));
            toast.success("Status updated");
        }
        catch (err) {
            console.error("Failed to update status", err);
            toast.error("Could not update status.");
        }
    };
    const handleSetFee = async (id) => {
        const finalFee = parseFloat(feeInputs[id]);
        if (isNaN(finalFee) || finalFee <= 0) {
            toast.error("Please enter a valid fee.");
            return;
        }
        try {
            await api.patch(`/purchase-requests/${id}/fee`, { finalFee });
            setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, finalFee } : r)));
            toast.success("Fee set successfully.");
        }
        catch (err) {
            console.error("Failed to set fee", err);
            toast.error("Could not set final fee.");
        }
    };
    const handleMarkAsPaid = async (id) => {
        try {
            await api.patch(`/purchase-requests/${id}/paid`);
            setRequests((prev) => prev.map((r) => r._id === id ? { ...r, isPaid: true, status: "Delivered" } : r));
            toast.success("Marked as paid and delivered.");
        }
        catch (err) {
            console.error("Failed to mark as paid", err);
            toast.error("Could not mark as paid.");
        }
    };
    return (_jsxs("div", { className: "admin-panel", children: [_jsx("h2", { children: "\uD83D\uDECD\uFE0F We Buy For You Requests" }), requests.length === 0 ? (_jsx("p", { children: "No requests yet." })) : (_jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "User" }), _jsx("th", { children: "Item" }), _jsx("th", { children: "Est. Price" }), _jsx("th", { children: "Qty" }), _jsx("th", { children: "Notes" }), _jsx("th", { children: "Screenshot" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Link" }), _jsx("th", { children: "Set Fee" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: requests.map((req) => (_jsxs("tr", { children: [_jsx("td", { children: req.userId.name }), _jsxs("td", { children: ["$", req.estimatedPrice] }), _jsx("td", { children: req.quantity }), _jsx("td", { children: req.notes || "—" }), _jsx("td", { children: req.screenshotUrl ? (_jsx("a", { href: `http://localhost:5000${req.screenshotUrl}`, target: "_blank", rel: "noreferrer", children: "\uD83D\uDCF7 View" })) : ("—") }), _jsx("td", { children: _jsxs("select", { value: req.status, onChange: (e) => handleStatusChange(req._id, e.target.value), children: [_jsx("option", { value: "Pending", children: "Pending" }), _jsx("option", { value: "Ordered", children: "Ordered" }), _jsx("option", { value: "Delivered", children: "Delivered" }), _jsx("option", { value: "Cancelled", children: "Cancelled" })] }) }), _jsx("td", { children: _jsx("a", { href: req.itemUrl, target: "_blank", rel: "noreferrer", children: "\uD83D\uDD17 Link" }) }), _jsxs("td", { children: [_jsx("input", { type: "number", placeholder: "Fee", value: feeInputs[req._id] || "", onChange: (e) => setFeeInputs((prev) => ({
                                                ...prev,
                                                [req._id]: e.target.value,
                                            })), style: { width: "70px" } }), _jsx("button", { onClick: () => handleSetFee(req._id), children: "Set" })] }), _jsx("td", { children: !req.isPaid && req.finalFee && (_jsx("button", { onClick: () => handleMarkAsPaid(req._id), children: "\u2705 Mark Paid" })) })] }, req._id))) })] }))] }));
};
export default AdminPurchaseRequests;
