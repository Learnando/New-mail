import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MultiStepForm from "../components/MultiStepForm"; // ✅ Import the new form
import "../styles/PackageForm.css"; // ✅ Keep the styles
const PackageForm = () => {
    return (_jsxs("div", { className: "package-form-container", children: [_jsx("h2", { children: "\uD83D\uDCE6 Submit Your Package" }), _jsx(MultiStepForm, {}), " "] }));
};
export default PackageForm;
