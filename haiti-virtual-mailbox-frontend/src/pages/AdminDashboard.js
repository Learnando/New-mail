import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import api from "../services/api";
import "../styles/AdminDashboard.css";
const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#a29bfe",
    "#fd79a8",
];
const formatStatus = (status) => status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
const AdminDashboard = () => {
    const [statusData, setStatusData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchStatusData = async () => {
            try {
                const { data } = await api.get("/admin/package-stats");
                console.log("📦 API response:", data);
                const transformed = data.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, {});
                setStatusData(transformed);
            }
            catch (error) {
                console.error("Error fetching package stats", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchStatusData();
    }, []);
    const pieData = Object.entries(statusData).map(([status, count]) => ({
        name: formatStatus(status),
        value: count,
    }));
    return (_jsxs("div", { className: "dashboard-container", children: [_jsx("h1", { children: "\uD83D\uDCE6 Admin Dashboard" }), loading ? (_jsx("p", { children: "Loading analytics..." })) : Object.keys(statusData).length === 0 ? (_jsx("p", { children: "No package data available." })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "stats-cards", children: Object.entries(statusData).map(([status, count]) => (_jsxs("div", { className: "card", children: [_jsx("h2", { children: formatStatus(status) }), _jsx("p", { children: count })] }, status))) }), _jsx("div", { className: "chart-container", children: _jsxs(PieChart, { width: 400, height: 400, children: [_jsx(Pie, { data: pieData, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 120, fill: "#8884d8", label: true, children: pieData.map((_, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, {}), _jsx(Legend, {})] }) })] }))] }));
};
export default AdminDashboard;
