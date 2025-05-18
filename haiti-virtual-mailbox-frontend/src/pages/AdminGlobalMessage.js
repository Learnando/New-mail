import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "../styles/AdminGlobalMessage.css";
const AdminGlobalMessage = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await api.get("/settings/global-message"); // ✅ Correct path
                setMessage(res.data.message);
            }
            catch (err) {
                toast.error("Failed to load message.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchMessage();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/settings/global-message", { message }); // ✅ Correct path
            toast.success("Message updated!");
        }
        catch (err) {
            console.error(err);
            toast.error("Failed to update message.");
        }
    };
    return (_jsxs("div", { className: "admin-global-message", children: [_jsx("h2", { children: "\uD83D\uDEE0 Global System Message" }), _jsx("p", { children: "This message will be shown to all users at the top of every page." }), loading ? (_jsx("p", { children: "Loading..." })) : (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("textarea", { value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Enter message (leave blank to clear)", rows: 4 }), _jsx("button", { type: "submit", children: "Save Message" })] }))] }));
};
export default AdminGlobalMessage;
