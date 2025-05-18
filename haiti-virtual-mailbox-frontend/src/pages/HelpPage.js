import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/HelpPage.css";
const HelpPage = () => {
    const { t } = useTranslation();
    const steps = [
        {
            title: t("help.step1.title"),
            description: t("help.step1.description"),
            image: "/help/Account.png",
        },
        {
            title: t("help.step2.title"),
            description: t("help.step2.description"),
            image: "/help/dashboard11.png",
        },
        {
            title: t("help.step3.title"),
            description: t("help.step3.description"),
            image: "/help/submit1.png",
        },
        {
            title: t("help.step4.title"),
            description: t("help.step4.description"),
            image: "/help/TrackPackage1.png",
        },
        {
            title: t("help.step5.title"),
            description: t("help.step5.description"),
            image: "/help/receipt.png",
        },
        {
            title: t("help.step6.title"),
            description: t("help.step6.description"),
            image: "/help/delivered1.png",
        },
    ];
    return (_jsxs("div", { className: "help-page", children: [_jsx("h1", { children: t("help.heading") }), _jsx("p", { className: "help-intro", children: t("help.intro") }), _jsxs("div", { className: "help-cards", children: [steps.map((step, index) => (_jsxs("div", { className: "help-card", children: [_jsx("img", { src: step.image, alt: step.title, className: "help-card-image" }), _jsxs("div", { className: "help-card-content", children: [_jsx("h2", { children: step.title }), _jsx("p", { children: step.description }), step.title.includes(t("help.step3.title").split(":")[0]) && (_jsxs("a", { href: "#buyforme", className: "jump-link", children: ["\uD83D\uDC49 ", t("help.learn_buy_for_me")] }))] })] }, index))), _jsxs("div", { className: "help-card", id: "buyforme", children: [_jsx("img", { src: "/help/buyforme-buttons.png", alt: "Buy For Me", className: "help-card-image" }), _jsxs("div", { className: "help-card-content", children: [_jsxs("h2", { children: ["\uD83D\uDECD\uFE0F ", t("help.buy.title")] }), _jsx("p", { children: t("help.buy.description1") }), _jsx("p", { dangerouslySetInnerHTML: { __html: t("help.buy.description2") } }), _jsxs("ul", { children: [_jsxs("li", { children: ["\u23F3 ", _jsx("strong", { children: t("help.buy.status.pending") }), " \u2013", " ", t("help.buy.status_text.pending")] }), _jsxs("li", { children: ["\uD83D\uDCB5 ", _jsx("strong", { children: t("help.buy.status.awaiting") }), " \u2013", " ", t("help.buy.status_text.awaiting")] }), _jsxs("li", { children: ["\uD83D\uDED2 ", _jsx("strong", { children: t("help.buy.status.ordered") }), " \u2013", " ", t("help.buy.status_text.ordered")] }), _jsxs("li", { children: ["\u2708\uFE0F ", _jsx("strong", { children: t("help.buy.status.shipped") }), " \u2013", " ", t("help.buy.status_text.shipped")] }), _jsxs("li", { children: ["\uD83D\uDCEC ", _jsx("strong", { children: t("help.buy.status.delivered") }), " \u2013", " ", t("help.buy.status_text.delivered")] })] }), _jsx("p", { dangerouslySetInnerHTML: { __html: t("help.buy.description3") } }), _jsx("p", { dangerouslySetInnerHTML: { __html: t("help.buy.description4") } })] })] }), _jsxs("div", { className: "help-card", id: "language", children: [_jsx("img", { src: "/help/language-toggle.png", alt: "Language Switch", className: "help-card-image" }), _jsxs("div", { className: "help-card-content", children: [_jsxs("h2", { children: ["\uD83C\uDF10 ", t("help.language.title")] }), _jsx("p", { children: t("help.language.intro") }), _jsxs("ul", { children: [_jsxs("li", { children: ["\uD83D\uDD27 ", t("help.language.step1")] }), _jsxs("li", { children: ["\uD83D\uDDE3\uFE0F ", t("help.language.step2")] }), _jsxs("li", { children: ["\u2705 ", t("help.language.step3")] })] }), _jsx("p", { children: t("help.language.outro") })] })] })] }), _jsx("div", { className: "help-footer", children: _jsxs(Link, { to: "/", className: "btn", children: ["\u2B05 ", t("help.back")] }) })] }));
};
export default HelpPage;
