import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/AdminPanel.css";
import { toast } from "react-toastify";
import ReadMore from "../components/ReadMore";
const AdminPanel = () => {
    const [packages, setPackages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [feeInputs, setFeeInputs] = useState({});
    const fetchPackages = async (currentPage = 1) => {
        try {
            const res = await api.get(`/packages/all?page=${currentPage}&limit=10`);
            setPackages(res.data.data);
            setTotalPages(res.data.pages);
        }
        catch (err) {
            console.error("Failed to load packages", err);
        }
    };
    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.patch(`/packages/${id}/status`, { status: newStatus });
            setPackages((prev) => prev.map((pkg) => pkg._id === id ? { ...pkg, status: newStatus } : pkg));
        }
        catch (err) {
            console.error("Failed to update status", err);
            toast.error("Could not update package status.");
        }
    };
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this package?");
        if (!confirmed)
            return;
        try {
            await api.delete(`/packages/${id}`);
            setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
        }
        catch (err) {
            console.error("Failed to delete package", err);
            toast.error("Could not delete package.");
        }
    };
    const handleSetFee = async (id) => {
        const finalFee = parseFloat(feeInputs[id]);
        if (isNaN(finalFee) || finalFee <= 0) {
            toast.error("Please enter a valid fee.");
            return;
        }
        try {
            await api.patch(`/packages/${id}/fee`, {
                finalFee,
                status: "Awaiting Payment",
            });
            setPackages((prev) => prev.map((pkg) => pkg._id === id
                ? { ...pkg, finalFee, status: "Awaiting Payment" }
                : pkg));
            toast.success("Final fee set successfully.");
        }
        catch (err) {
            console.error("Failed to set fee", err);
            toast.error("Could not set final fee.");
        }
    };
    const handleMarkAsPaid = async (id) => {
        try {
            await api.patch(`/packages/${id}/paid`, {
                isPaid: true,
                status: "Shipped",
            });
            setPackages((prev) => prev.map((pkg) => pkg._id === id ? { ...pkg, isPaid: true, status: "Shipped" } : pkg));
            toast.success("Marked as paid and marked as shipped.");
        }
        catch (err) {
            console.error("Failed to mark as paid", err);
            toast.error("Could not mark as paid.");
        }
    };
    useEffect(() => {
        fetchPackages(page);
    }, [page]);
    const filteredPackages = packages.filter((pkg) => pkg.customerName.toLowerCase().includes(search.toLowerCase()) ||
        pkg.description.toLowerCase().includes(search.toLowerCase()) ||
        pkg.trackingNumber?.toLowerCase().includes(search.toLowerCase()));
    return (_jsxs("div", { className: "admin-panel", children: [_jsx("h2", { children: "Admin Panel - Submitted Packages" }), _jsx("input", { type: "text", className: "search-bar", placeholder: "Search by name, description or tracking #", value: search, onChange: (e) => setSearch(e.target.value) }), _jsx("div", { className: "table-wrapper", children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Customer" }), _jsx("th", { children: "Product" }), _jsx("th", { children: "Price" }), _jsx("th", { children: "Shipping" }), _jsx("th", { children: "Delivery" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Cancelled?" }), _jsx("th", { children: "Submitted" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Receipt" }), _jsx("th", { children: "Credits Used" }), _jsx("th", { children: "Credits Remaining" }), _jsx("th", { children: "Rating" }), _jsx("th", { children: "Review" }), _jsx("th", { children: "Set Fee" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: filteredPackages.map((pkg) => (_jsxs("tr", { className: `status-${pkg.status
                                    ?.toLowerCase()
                                    .replace(/\s+/g, "-")}`, children: [_jsx("td", { children: pkg.customerName }), _jsx("td", { style: { maxWidth: "300px" }, children: _jsx(ReadMore, { text: pkg.description, maxLength: 80 }) }), _jsxs("td", { children: ["$", pkg.price] }), _jsx("td", { children: pkg.shipping }), _jsx("td", { children: pkg.delivery }), _jsx("td", { children: _jsxs("select", { className: "status-select", value: pkg.status || "Pending", onChange: (e) => handleStatusChange(pkg._id, e.target.value), children: [_jsx("option", { value: "Pending", children: "Pending" }), _jsx("option", { value: "Purchased", children: "Purchased" }), _jsx("option", { value: "Shipped", children: "Shipped" }), _jsx("option", { value: "Delivered", children: "Delivered" }), _jsx("option", { value: "Awaiting Payment", children: "Awaiting Payment" }), _jsx("option", { value: "Cancelled", children: "Cancelled" })] }) }), _jsx("td", { style: { color: pkg.status === "Cancelled" ? "red" : "" }, children: pkg.status === "Cancelled" ? "❌ Yes" : "—" }), _jsx("td", { children: new Date(pkg.createdAt || "").toLocaleDateString() }), _jsx("td", { children: pkg.email ? (_jsxs("a", { href: `mailto:${pkg.email}`, style: { color: "blue" }, children: ["\u2709\uFE0F ", pkg.email] })) : (_jsx("span", { style: { color: "gray" }, children: "No email" })) }), _jsx("td", { children: pkg.receiptUrl ? (_jsx("a", { href: `http://localhost:5000${pkg.receiptUrl}`, target: "_blank", rel: "noopener noreferrer", className: "receipt-link", children: "\uD83E\uDDFE View" })) : (_jsx("span", { style: { color: "gray" }, children: "No receipt" })) }), _jsx("td", { children: pkg.creditsUsed || 0 }), _jsx("td", { children: pkg.userId?.credits ?? 0 }), _jsx("td", { children: pkg.rating || "—" }), _jsx("td", { children: pkg.review ? (_jsx(ReadMore, { text: pkg.review, maxLength: 50 })) : ("—") }), _jsxs("td", { children: [_jsx("input", { type: "number", placeholder: "Final Fee", style: { width: "80px" }, value: feeInputs[pkg._id] || "", onChange: (e) => setFeeInputs((prev) => ({
                                                    ...prev,
                                                    [pkg._id]: e.target.value,
                                                })) }), _jsx("button", { onClick: () => handleSetFee(pkg._id), disabled: !feeInputs[pkg._id], style: { marginLeft: "6px" }, children: "Set Fee" })] }), _jsxs("td", { children: [pkg.status === "Awaiting Payment" && !pkg.isPaid && (_jsx("button", { onClick: () => handleMarkAsPaid(pkg._id), className: "pay-btn", style: { marginBottom: "6px" }, children: "\u2705 Mark as Paid" })), _jsx("button", { className: "delete-btn", onClick: () => handleDelete(pkg._id), children: "\uD83D\uDDD1 Delete" })] })] }, pkg._id))) })] }) }), _jsxs("div", { className: "pagination-controls", children: [_jsx("button", { onClick: () => setPage((prev) => Math.max(prev - 1, 1)), disabled: page === 1, children: "\u2B05\uFE0F Previous" }), _jsxs("span", { children: ["Page ", page, " of ", totalPages] }), _jsx("button", { onClick: () => setPage((prev) => Math.min(prev + 1, totalPages)), disabled: page === totalPages, children: "Next \u27A1\uFE0F" })] })] }));
};
export default AdminPanel;
