import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/FAQPage.css";
const FAQPage = () => {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState(null);
    const toggleCategory = (category) => {
        setActiveCategory((prev) => (prev === category ? null : category));
    };
    const categories = [
        "general",
        "payments",
        "customs",
        "tracking",
        "location",
        "security",
        "prohibited",
    ];
    return (_jsxs("div", { className: "faq-container", children: [_jsx("h1", { children: t("faq.title") }), categories.map((categoryKey) => {
                const categoryTitle = t(`faq.categories.${categoryKey}`);
                const questions = t(`faq.${categoryKey}`, {
                    returnObjects: true,
                });
                return (_jsxs("div", { className: "faq-section", children: [_jsxs("h2", { onClick: () => toggleCategory(categoryKey), children: [categoryTitle, " ", activeCategory === categoryKey ? "−" : "+"] }), activeCategory === categoryKey && (_jsx("ul", { children: questions.map((item, index) => (_jsxs("li", { children: [_jsxs("strong", { children: ["\u2753 ", item.q] }), _jsxs("p", { children: ["\uD83D\uDCD8 ", item.a] })] }, index))) }))] }, categoryKey));
            })] }));
};
export default FAQPage;
