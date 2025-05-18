import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles/PackageProgress.css";
// ✅ Correct real steps in your app
const steps = ["Pending", "Purchased", "Shipped", "Delivered"];
const PackageProgress = ({ status }) => {
    const normalizedStatus = status.toLowerCase();
    // ✅ Updated mapping for step order
    const statusOrder = {
        pending: 0,
        purchased: 1,
        shipped: 2,
        delivered: 3,
    };
    const getStepStatus = (step) => {
        const normalizedStep = step.toLowerCase();
        if (normalizedStatus === normalizedStep) {
            return "current";
        }
        if ((statusOrder[normalizedStatus] ?? -1) >
            (statusOrder[normalizedStep] ?? -1)) {
            return "completed";
        }
        return "upcoming";
    };
    const getStepIcon = (step) => {
        const normalizedStep = step.toLowerCase();
        if (normalizedStep === "pending")
            return "🛒"; // Cart
        if (normalizedStep === "purchased")
            return "💳"; // Credit card
        if (normalizedStep === "shipped")
            return "✈️"; // Airplane
        if (normalizedStep === "delivered")
            return "📦"; // Package delivered
        return "⭕";
    };
    return (_jsx("div", { className: "progress-container", children: steps.map((step, index) => (_jsxs("div", { className: `progress-step ${getStepStatus(step)}`, children: [_jsx("div", { className: "icon", children: getStepIcon(step) }), _jsx("div", { className: "label", children: step }), index < steps.length - 1 && _jsx("div", { className: "line" })] }, index))) }));
};
export default PackageProgress;
