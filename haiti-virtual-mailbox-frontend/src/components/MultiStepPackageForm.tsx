import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";
import "../styles/MultiStepPackageForm.css"; // Make sure this file exists

const MultiStepPackageForm = () => {
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    customerName: user?.name || "",
    whatsapp: "",
    sender: "",
    description: "",
    price: "",
    shipping: "air",
    delivery: "pickup",
    note: "",
    screenshot: null as File | null,
    creditsToUse: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, screenshot: file }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.screenshot) {
      toast.error("📸 " + t("error.screenshotRequired"));
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      let value = formData[key as keyof typeof formData];
      if (value !== null) {
        if (key === "price" && typeof value === "string") {
          value = value.replace(/,/g, "");
        }
        if (key === "creditsToUse" && value === "") {
          value = "0";
        }
        data.append(key, value as any);
      }
    }

    if (user?._id) {
      data.append("userId", user._id);
    }

    try {
      const res = await api.post("/packages", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("📦 Package submitted:", res.data);
      toast.success("✅ " + t("submit.success"));

      setFormData({
        customerName: user?.name || "",
        whatsapp: "",
        sender: "",
        description: "",
        price: "",
        shipping: "air",
        delivery: "pickup",
        note: "",
        screenshot: null,
        creditsToUse: "",
      });
      setStep(1);
    } catch (err) {
      console.error("❌ Failed to submit package:", err);
      toast.error(t("submit.failed"));
    }
  };

  return (
    <div className="multi-step-form">
      <h2>
        📦 {t("submit.title")} ({t("step")} {step}/4)
      </h2>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <label>{t("submit.nameLabel")}</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />

            <label>{t("submit.whatsappLabel")}</label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              required
            />

            <div className="button-group">
              <button type="button" onClick={nextStep}>
                {t("next")} ➡️
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <label>{t("submit.sender")}</label>
            <input
              type="text"
              name="sender"
              value={formData.sender}
              onChange={handleChange}
              required
            />

            <label>{t("submit.description")}</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <label>{t("submit.price")}</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <div className="button-group">
              <button type="button" onClick={prevStep}>
                ⬅️ {t("back")}
              </button>
              <button type="button" onClick={nextStep}>
                {t("next")} ➡️
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <label>{t("submit.shipping")}</label>
            <select
              name="shipping"
              value={formData.shipping}
              onChange={handleChange}
            >
              <option value="air">{t("shipping.air")}</option>
              <option value="sea">{t("shipping.sea")}</option>
            </select>

            <label>{t("submit.delivery")}</label>
            <select
              name="delivery"
              value={formData.delivery}
              onChange={handleChange}
            >
              <option value="pickup">{t("delivery.pickup")}</option>
              <option value="home">{t("delivery.home")}</option>
            </select>

            <label>{t("submit.note")}</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
            />

            <label>{t("submit.screenshot")}</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <div className="button-group">
              <button type="button" onClick={prevStep}>
                ⬅️ {t("back")}
              </button>
              <button type="button" onClick={nextStep}>
                {t("next")} ➡️
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h3>{t("submit.confirmation")}</h3>
            <button type="button" onClick={prevStep}>
              ⬅️ {t("back")}
            </button>
            <button type="submit">{t("submit.submitButton")}</button>
          </>
        )}
      </form>
    </div>
  );
};

export default MultiStepPackageForm;
