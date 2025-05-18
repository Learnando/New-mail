import api from "./api";
export const fetchUserPackages = async (userId) => {
    const res = await api.get(`/packages/user/${userId}`);
    return res.data; // ✅ cast as expected type
};
export const getPackageDetails = async (id) => {
    const res = await api.get(`/packages/${id}`);
    return res.data;
};
