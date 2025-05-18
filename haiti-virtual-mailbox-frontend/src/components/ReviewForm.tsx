import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "../styles/ReviewForm.css";

interface ReviewFormProps {
  packageId: string;
  onSubmitted: (rating: number, review: string) => void;
}

const ReviewForm = ({ packageId, onSubmitted }: ReviewFormProps) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiBase = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${apiBase}/api/packages/${packageId}/review`, {
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
    } catch (err: any) {
      console.error("❌ Review error:", err.message);
      toast.error(err.message || t("review.error"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h4>⭐ {t("review.title")}</h4>

      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            onClick={() => setRating(num)}
            className={num <= rating ? "star filled" : "star"}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder={t("review.placeholder")}
        rows={3}
        required
      />

      <button type="submit">{t("review.submit")}</button>
    </form>
  );
};

export default ReviewForm;
