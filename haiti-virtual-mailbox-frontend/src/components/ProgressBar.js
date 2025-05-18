import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles/ProgressBar.css";
const steps = [
    "Contact Info",
    "Package Details",
    "Shipping & Delivery",
    "Confirm",
];
const ProgressBar = ({ currentStep }) => {
    return (_jsx("div", { className: "progress-bar", children: steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            return (_jsxs("div", { className: "progress-step", children: [_jsx("div", { className: `circle ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`, children: isCompleted ? "✔️" : stepNumber }), _jsx("div", { className: "step-label", children: label }), index < steps.length - 1 && (_jsx("div", { className: `line ${isCompleted ? "completed" : ""}` }))] }, label));
        }) }));
};
export default ProgressBar;
