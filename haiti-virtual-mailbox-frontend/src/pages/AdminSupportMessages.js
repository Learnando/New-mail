import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Import useAuth
import api from "../services/api";
import "../styles/AdminPanel.css";
const AdminSupportMessages = () => {
    const { user } = useAuth(); // ✅ Get logged-in user
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await api.get("/support");
                setMessages(res.data);
            }
            catch (err) {
                console.error("Failed to load support messages:", err);
            }
        };
        if (user?.isAdmin) {
            fetchMessages();
        }
    }, [user]);
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this message?");
        if (!confirm)
            return;
        try {
            await api.delete(`/support/${id}`);
            setMessages((prev) => prev.filter((msg) => msg._id !== id));
        }
        catch (err) {
            console.error("Failed to delete message:", err);
            alert("Error deleting message");
        }
    };
    // ✅ Deny access to non-admins
    if (!user?.isAdmin) {
        return (_jsx("div", { className: "admin-panel", children: _jsx("p", { className: "text-red-600 font-semibold p-4", children: "\uD83D\uDEAB Access denied. Admins only." }) }));
    }
    return (_jsxs("div", { className: "admin-panel page-content", children: [_jsx("h1", { style: {
                    fontSize: "1.8rem",
                    color: "var(--heading-color)",
                    marginBottom: "1rem",
                }, children: "\uD83D\uDCE8 Support Messages" }), messages.length === 0 ? (_jsx("p", { children: "No messages yet." })) : (_jsx("section", { style: { marginBottom: "var(--spacing-lg)" }, children: _jsx("div", { className: "table-responsive", children: _jsxs("table", { className: "support-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Phone" }), _jsx("th", { children: "Message" }), _jsx("th", { children: "Date" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: messages.map((msg) => (_jsxs("tr", { children: [_jsx("td", { children: msg.name }), _jsx("td", { children: msg.email }), _jsx("td", { children: msg.phone }), _jsx("td", { children: msg.message }), _jsx("td", { children: new Date(msg.createdAt).toLocaleString() }), _jsx("td", { children: _jsx("button", { onClick: () => handleDelete(msg._id), className: "delete-btn", children: "\uD83D\uDDD1\uFE0F Delete" }) })] }, msg._id))) })] }) }) }))] }));
};
export default AdminSupportMessages;
