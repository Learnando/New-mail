import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import "../styles/AboutPage.css";
const AboutPage = () => {
    const { t } = useTranslation();
    return (_jsxs("div", { className: "about-page container mx-auto px-4 py-10 max-w-4xl", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: t("about.title") }), _jsxs("section", { className: "mb-6", children: [_jsx("p", { children: t("about.intro1") }), _jsx("p", { className: "mt-2", children: t("about.intro2") })] }), _jsxs("section", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: t("about.problemTitle") }), _jsx("p", { children: t("about.problem1") }), _jsx("p", { className: "mt-2", children: t("about.problem2") })] }), _jsxs("section", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: t("about.solutionTitle") }), _jsx("p", { children: t("about.solution1") }), _jsx("p", { className: "mt-2", children: t("about.solution2") })] }), _jsxs("section", { className: "mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: t("about.whyTitle") }), _jsx("p", { children: t("about.why") })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: t("about.visionTitle") }), _jsx("p", { children: t("about.vision") })] })] }));
};
export default AboutPage;
