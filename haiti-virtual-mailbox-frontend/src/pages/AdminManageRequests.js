import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "../styles/AdminPanel.css";
const AdminManageRequests = () => {
    const [requests, setRequests] = useState([]);
    const [feeInputs, setFeeInputs] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await api.get("/purchase-requests");
                setRequests(res.data);
            }
            catch (err) {
                console.error("Failed to fetch purchase requests:", err);
            }
        };
        fetchRequests();
    }, []);
    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.patch(`/purchase-requests/${id}/status`, { status: newStatus });
            setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r)));
            toast.success("Status updated");
        }
        catch (err) {
            toast.error("Could not update status.");
        }
    };
    const handleSetFee = async (id) => {
        const fee = parseFloat(feeInputs[id]);
        if (isNaN(fee) || fee <= 0) {
            toast.error("Please enter a valid fee.");
            return;
        }
        try {
            await api.patch(`/purchase-requests/${id}/fee`, {
                finalFee: fee,
                status: "Awaiting Payment",
            });
            setRequests((prev) => prev.map((r) => r._id === id ? { ...r, finalFee: fee, status: "Awaiting Payment" } : r));
            toast.success("Fee set and status updated.");
        }
        catch (err) {
            toast.error("Could not set fee.");
        }
    };
    const handleMarkAsPaid = async (id) => {
        try {
            await api.patch(`/purchase-requests/${id}/paid`, {
                isPaid: true,
                status: "Ordered",
            });
            setRequests((prev) => prev.map((r) => r._id === id ? { ...r, isPaid: true, status: "Ordered" } : r));
            toast.success("Marked as paid and updated to 'Ordered'.");
        }
        catch (err) {
            toast.error("Could not update payment.");
        }
    };
    const handleDeleteRequest = async (id) => {
        const confirm = window.confirm("Are you sure you want to hide this request from admin view?");
        if (!confirm)
            return;
        try {
            await api.patch(`/purchase-requests/${id}`, { isHiddenFromAdmin: true });
            setRequests((prev) => prev.filter((r) => r._id !== id));
            toast.success("Request hidden from admin view.");
        }
        catch (err) {
            toast.error("Could not hide request.");
        }
    };
    const filteredRequests = requests.filter((r) => r.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    const activeRequests = filteredRequests.filter((r) => r.status !== "Cancelled");
    const cancelledRequests = filteredRequests.filter((r) => r.status === "Cancelled");
    return (_jsx("div", { className: "admin-wrapper", children: _jsxs("div", { className: "admin-panel", children: [_jsx("h2", { children: "\uD83D\uDD10 Manage Purchase Requests" }), _jsx("input", { type: "text", placeholder: "Search by name...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "search-bar" }), _jsx("h3", { children: "\uD83D\uDFE2 Active Requests" }), _jsx("div", { className: "table-wrapper", children: _jsx(RequestTable, { data: activeRequests, feeInputs: feeInputs, setFeeInputs: setFeeInputs, handleStatusChange: handleStatusChange, handleSetFee: handleSetFee, handleMarkAsPaid: handleMarkAsPaid, handleDeleteRequest: handleDeleteRequest }) }), _jsx("h3", { style: { marginTop: "2rem", color: "crimson" }, children: "\u274C Cancelled Requests" }), _jsx("div", { className: "table-wrapper", children: _jsx(RequestTable, { data: cancelledRequests, handleDeleteRequest: handleDeleteRequest, isReadOnly: true }) })] }) }));
};
export default AdminManageRequests;
const RequestTable = ({ data, feeInputs, setFeeInputs, handleStatusChange, handleSetFee, handleMarkAsPaid, handleDeleteRequest, isReadOnly = false, }) => {
    return (_jsxs("table", { className: "request-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "User" }), _jsx("th", { children: "Ref #" }), _jsx("th", { children: "Item" }), _jsx("th", { children: "Qty" }), _jsx("th", { children: "Est. Price" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Fee" }), _jsx("th", { children: "Receipt" }), _jsx("th", { children: "Screenshot" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: data.map((r) => (_jsxs("tr", { children: [_jsxs("td", { children: [r.userId.name, _jsx("br", {}), _jsx("small", { children: r.userId.email })] }), _jsx("td", { children: r.referenceNumber }), _jsx("td", { children: _jsx("a", { href: r.itemUrl, target: "_blank", rel: "noreferrer", children: "View" }) }), _jsx("td", { children: r.quantity }), _jsxs("td", { children: ["$", r.estimatedPrice.toFixed(2)] }), _jsx("td", { children: isReadOnly ? (r.status) : (_jsxs("select", { value: r.status, onChange: (e) => handleStatusChange?.(r._id, e.target.value), children: [_jsx("option", { value: "Pending", children: "Pending" }), _jsx("option", { value: "Awaiting Payment", children: "Awaiting Payment" }), _jsx("option", { value: "Ordered", children: "Ordered" }), _jsx("option", { value: "Shipped", children: "Shipped" }), _jsx("option", { value: "Delivered", children: "Delivered" }), _jsx("option", { value: "Cancelled", children: "Cancelled" })] })) }), _jsx("td", { children: r.finalFee ? (`$${r.finalFee}`) : !isReadOnly ? (_jsxs(_Fragment, { children: [_jsx("input", { type: "number", placeholder: "Set Fee", value: feeInputs?.[r._id] || "", onChange: (e) => setFeeInputs?.((prev) => ({
                                            ...prev,
                                            [r._id]: e.target.value,
                                        })), style: { width: "70px", marginRight: "6px" } }), _jsx("button", { onClick: () => handleSetFee?.(r._id), children: "Set" })] })) : ("—") }), _jsx("td", { children: r.receiptUrl ? (_jsx("a", { href: `http://localhost:5000${r.receiptUrl}`, target: "_blank", rel: "noreferrer", children: "\uD83E\uDDFE View" })) : ("—") }), _jsx("td", { children: r.screenshotUrl ? (_jsx("a", { href: `http://localhost:5000${r.screenshotUrl}`, target: "_blank", rel: "noreferrer", children: "\uD83D\uDCF7 View" })) : ("—") }), _jsxs("td", { children: [!isReadOnly && (_jsxs(_Fragment, { children: [!r.isPaid && r.status === "Awaiting Payment" && (_jsx("button", { onClick: () => handleMarkAsPaid?.(r._id), children: "\u2705 Mark as Paid" })), _jsx("br", {})] })), _jsx("button", { onClick: () => handleDeleteRequest?.(r._id), className: "delete-btn", children: "\uD83D\uDDD1 Delete" })] })] }, r._id))) })] }));
};
