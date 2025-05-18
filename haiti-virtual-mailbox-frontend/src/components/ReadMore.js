import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const ReadMore = ({ text, maxLength = 100 }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = text.length > maxLength;
    const toggle = () => setExpanded((prev) => !prev);
    return (_jsxs("p", { style: { wordBreak: "break-word", whiteSpace: "pre-wrap" }, children: [expanded || !isLong ? text : text.slice(0, maxLength) + "... ", isLong && (_jsx("button", { type: "button" // ✅ prevents accidental form submission
                , onClick: toggle, style: {
                    background: "none",
                    border: "none",
                    color: "blue",
                    cursor: "pointer",
                    paddingLeft: "5px",
                }, children: expanded ? "Read Less" : "Read More" }))] }));
};
export default ReadMore;
