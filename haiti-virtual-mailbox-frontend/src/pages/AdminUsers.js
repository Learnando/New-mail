import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/AdminUsers.css";
import { toast } from "react-toastify";
const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users");
                setUsers(res.data);
            }
            catch (err) {
                console.error("Failed to load users", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (!confirmed)
            return;
        try {
            await api.delete(`/users/${id}`);
            setUsers((prev) => prev.filter((user) => user._id !== id));
            toast.success("User deleted successfully!");
        }
        catch (err) {
            toast.error("Could not delete user.");
        }
    };
    const handlePromote = async (id) => {
        try {
            await api.patch(`/users/${id}/promote`);
            setUsers((prev) => prev.map((user) => user._id === id ? { ...user, isAdmin: true } : user));
            toast.success("✅ User promoted to admin");
        }
        catch (err) {
            toast.error("❌ Failed to promote user to admin");
        }
    };
    const openEditModal = (user) => {
        setEditingUser(user);
        setFormData(user);
    };
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleUpdate = async () => {
        if (!editingUser)
            return;
        try {
            await api.put(`/users/${editingUser._id}`, formData);
            setUsers((prev) => prev.map((u) => (u._id === editingUser._id ? { ...u, ...formData } : u)));
            toast.success("User updated successfully!");
            setEditingUser(null);
        }
        catch (err) {
            toast.error("Could not update user.");
        }
    };
    const filteredUsers = users.filter((user) => {
        const query = searchTerm.toLowerCase();
        return (user.name.toLowerCase().includes(query) ||
            user.virtualAddress?.toLowerCase().includes(query));
    });
    if (loading)
        return _jsx("p", { children: "Loading users..." });
    return (_jsx("div", { className: "admin-wrapper", children: _jsxs("div", { className: "admin-panel", children: [_jsx("h2", { children: "Admin Panel - Manage Users" }), _jsx("input", { type: "text", className: "search-bar", placeholder: "Search by name or virtual address...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsx("div", { className: "table-wrapper", children: _jsxs("table", { className: "styled-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Phone" }), _jsx("th", { children: "Virtual Address" }), _jsx("th", { children: "Role" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: filteredUsers.map((user) => (_jsxs("tr", { children: [_jsx("td", { children: user.name }), _jsx("td", { children: user.email }), _jsx("td", { children: user.phone || "N/A" }), _jsx("td", { children: user.virtualAddress || "N/A" }), _jsx("td", { children: user.isAdmin ? "✅ Admin" : "User" }), _jsxs("td", { className: "actions-cell", children: [!user.isAdmin && (_jsx("button", { className: "action-btn promote-btn", onClick: () => handlePromote(user._id), children: "\uD83D\uDC51 Promote" })), _jsx("button", { className: "action-btn edit-btn", onClick: () => openEditModal(user), children: "\u270F\uFE0F Edit" }), _jsx("button", { className: "action-btn delete-btn", onClick: () => handleDelete(user._id), children: "\uD83D\uDDD1\uFE0F Delete" })] })] }, user._id))) })] }) }), editingUser && (_jsx("div", { className: "modal", children: _jsxs("div", { className: "modal-content", children: [_jsx("h3", { children: "Edit User" }), _jsx("input", { type: "text", name: "name", value: formData.name || "", onChange: handleFormChange, placeholder: "Name" }), _jsx("input", { type: "email", name: "email", value: formData.email || "", onChange: handleFormChange, placeholder: "Email" }), _jsx("input", { type: "text", name: "phone", value: formData.phone || "", onChange: handleFormChange, placeholder: "Phone" }), _jsx("input", { type: "text", name: "virtualAddress", value: formData.virtualAddress || "", onChange: handleFormChange, placeholder: "Virtual Address" }), _jsxs("div", { className: "modal-buttons", children: [_jsx("button", { className: "save-btn", onClick: handleUpdate, children: "\u2705 Update" }), _jsx("button", { className: "cancel-btn", onClick: () => setEditingUser(null), children: "\u274C Cancel" })] })] }) }))] }) }));
};
export default AdminUsers;
