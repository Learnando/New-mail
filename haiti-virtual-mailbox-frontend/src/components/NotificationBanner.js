import { jsx as _jsx } from "react/jsx-runtime";
import "../styles/NotificationBanner.css";
const NotificationBanner = ({ message }) => {
    return _jsx("div", { className: "notification-banner", children: message });
};
export default NotificationBanner;
