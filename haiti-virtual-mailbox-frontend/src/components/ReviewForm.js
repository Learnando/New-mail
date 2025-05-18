import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // ✅
import "../styles/ReviewForm.css";
const ReviewForm = ({ packageId, onSubmitted }) => {
    const { t } = useTranslation(); // ✅
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("📦 Token being sent:", localStorage.getItem("haitiUserToken"));
        try {
            const res = await fetch(`http://localhost:5000/api/packages/${packageId}/review`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("haitiUserToken")}`,
                },
                body: JSON.stringify({ rating, review }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || t("review.error"));
            }
            toast.success(t("review.success"));
            onSubmitted(rating, review);
        }
        catch (err) {
            console.error("❌ Review error:", err.message);
            toast.error(err.message || t("review.error"));
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "review-form", children: [_jsxs("h4", { children: ["\u2B50 ", t("review.title")] }), _jsx("div", { className: "star-rating", children: [1, 2, 3, 4, 5].map((num) => (_jsx("span", { onClick: () => setRating(num), className: num <= rating ? "star filled" : "star", children: "\u2605" }, num))) }), _jsx("textarea", { value: review, onChange: (e) => setReview(e.target.value), placeholder: t("review.placeholder"), rows: 3, required: true }), _jsx("button", { type: "submit", children: t("review.submit") })] }));
};
export default ReviewForm;
