import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "../styles/PackageCard.css";
import { useTranslation } from "react-i18next"; // ✅
const PackageCard = ({ _id, trackingNumber, status, sender, description, createdAt, screenshotUrl, onDelete, onCancel, }) => {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const { t } = useTranslation(); // ✅
    const handleCopy = () => {
        navigator.clipboard.writeText(trackingNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    const toggleDescription = () => {
        setExpanded((prev) => !prev);
    };
    return (_jsxs("div", { className: "package-card horizontal", children: [screenshotUrl && (_jsx("div", { className: "left-section", children: _jsx("img", { src: `http://localhost:5000${screenshotUrl}`, alt: "Screenshot", className: "screenshot-image", onClick: () => setShowPreview(true) }) })), _jsxs("div", { className: "right-section", children: [_jsxs("div", { className: "card-header", children: [_jsxs("h3", { children: ["\uD83D\uDCE6 ", t("card.tracking"), ": ", trackingNumber, _jsx("button", { onClick: handleCopy, className: "copy-btn", children: copied ? t("card.copied") : t("card.copy") })] }), onDelete && (_jsx("button", { className: "delete-btn", onClick: () => onDelete(_id), children: "\uD83D\uDDD1\uFE0F" }))] }), _jsxs("p", { children: [_jsxs("strong", { children: [t("card.status"), ":"] }), " ", _jsx("span", { className: `badge badge-${status
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`, children: t(`statuses.${status.toLowerCase().replace(/\s+/g, "")}`) })] }), sender && (_jsxs("p", { children: [_jsxs("strong", { children: [t("card.sender"), ":"] }), " ", sender] })), description && (_jsxs("p", { className: expanded ? "description expanded" : "description", children: [_jsxs("strong", { children: [t("card.description"), ":"] }), " ", expanded || description.length <= 100
                                ? description
                                : `${description.slice(0, 100)}... `, description.length > 100 && (_jsx("button", { onClick: toggleDescription, className: "read-more-btn", children: expanded ? t("card.readLess") : t("card.readMore") }))] })), createdAt && (_jsxs("p", { children: [_jsxs("strong", { children: [t("card.submitted"), ":"] }), " ", new Date(createdAt).toLocaleDateString()] })), status === "Delivered" && (_jsxs("div", { className: "delivery-message", children: [_jsx("div", { className: "icon", children: "\u2714\uFE0F" }), _jsxs("div", { className: "message-text", children: [_jsx("strong", { children: t("card.ready") }), _jsx("p", { children: t("card.pickupNote") })] })] })), onCancel &&
                        (status === "Pending" || status === "Awaiting Payment") && (_jsxs("button", { className: "cancel-btn", onClick: () => onCancel(_id), children: ["\u274C ", t("card.cancel")] }))] }), showPreview && (_jsx("div", { className: "modal-overlay", onClick: () => setShowPreview(false), children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { className: "close-btn", onClick: () => setShowPreview(false), children: "\u274C" }), _jsx("img", { src: `http://localhost:5000${screenshotUrl}`, alt: "Large Screenshot", className: "modal-image" })] }) }))] }));
};
export default PackageCard;
