import api from "./axios";

export const getDashboardStats = async () => {
  const response = await api.get(
    "/analytics/dashboard"
  );

  return response.data;
};

export const getRevenueTrend = async (month, year) => {
  const response = await api.get(
    "/analytics/revenue-trend",
    {
      params: {
        month,
        year
      }
    }
  );

  return response.data;
};

export const getTopServices = async () => {
  const response = await api.get(
    "/analytics/top-services"
  );

  return response.data;
};

export const getPaymentBreakdown = async () => {
  const response = await api.get(
    "/analytics/payment-breakdown"
  );

  return response.data;
};