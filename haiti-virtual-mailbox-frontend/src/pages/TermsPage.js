import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../styles/TermsPage.css";
const TermsPage = () => {
    const { t } = useTranslation();
    return (_jsxs("div", { className: "terms-container", children: [_jsxs("h1", { children: ["\uD83D\uDCC4 ", t("terms.title")] }), _jsx("p", { children: t("terms.intro") }), _jsx("h2", { children: t("terms.section1.title") }), _jsx("p", { children: t("terms.section1.content") }), _jsx("h2", { children: t("terms.section2.title") }), _jsxs("ul", { children: [_jsx("li", { children: t("terms.section2.point1") }), _jsx("li", { children: t("terms.section2.point2") }), _jsx("li", { children: t("terms.section2.point3") })] }), _jsx("h2", { children: t("terms.section3.title") }), _jsx("p", { children: t("terms.section3.content") }), _jsx("h2", { children: t("terms.section4.title") }), _jsx("p", { children: t("terms.section4.content") }), _jsx("h2", { children: t("terms.section5.title") }), _jsx("p", { children: t("terms.section5.content") }), _jsx("h2", { children: t("terms.section6.title") }), _jsx("p", { children: t("terms.section6.content") }), _jsx("h2", { children: t("terms.section7.title") }), _jsxs("p", { children: [t("terms.section7.content"), " ", _jsx("a", { href: "mailto:bwatlakay@gmail.com", children: "bwatlakay@gmail.com" })] }), _jsx("div", { className: "terms-footer", children: _jsx(Link, { to: "/", children: t("terms.back") }) })] }));
};
export default TermsPage;
