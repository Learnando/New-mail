import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import PackageProgress from "../components/PackageProgress";
import { useTranslation } from "react-i18next"; // ✅
import "../styles/PackageDetails.css";
const PackageDetails = () => {
    const { id } = useParams();
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation(); // ✅
    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const { data } = await api.get(`/packages/${id}`);
                setPackageData(data);
            }
            catch (error) {
                console.error("Error loading package:", error);
            }
            finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchPackage();
        }
    }, [id]);
    if (loading) {
        return _jsx("div", { className: "package-details", children: t("loadingDetails") });
    }
    if (!packageData) {
        return _jsx("div", { className: "package-details", children: t("notFound") });
    }
    return (_jsxs("div", { className: "package-details", children: [_jsxs("h2", { children: ["\uD83D\uDCE6 ", t("packageDetails")] }), _jsxs("p", { children: [_jsxs("strong", { children: [t("trackingNumber"), ":"] }), " ", packageData.trackingNumber] }), _jsxs("p", { children: [_jsxs("strong", { children: [t("status"), ":"] }), " ", t(packageData.status.toLowerCase())] }), _jsx(PackageProgress, { status: packageData.status }), _jsxs("p", { children: [_jsxs("strong", { children: [t("customer"), ":"] }), " ", packageData.customerName || "N/A"] }), _jsxs("p", { children: [_jsxs("strong", { children: [t("description"), ":"] }), " ", packageData.description || t("noDescription")] }), _jsxs("p", { children: [_jsxs("strong", { children: [t("shippingMethod"), ":"] }), " ", packageData.shipping || "N/A"] }), _jsxs("p", { children: [_jsxs("strong", { children: [t("deliveryOption"), ":"] }), " ", packageData.delivery || "N/A"] }), packageData.note && (_jsxs("p", { children: [_jsxs("strong", { children: [t("note"), ":"] }), " ", packageData.note] })), packageData.createdAt && (_jsxs("p", { children: [_jsxs("strong", { children: [t("submitted"), ":"] }), " ", new Date(packageData.createdAt).toLocaleDateString()] }))] }));
};
export default PackageDetails;
