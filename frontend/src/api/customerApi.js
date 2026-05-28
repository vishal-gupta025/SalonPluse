import api from "./axios";

export const getCustomers = async () => {

  const response = await api.get(
    "/customers"
  );

  return response.data;
};

export const createCustomer = async (
  payload
) => {

  const response = await api.post(
    "/customers",
    payload
  );

  return response.data;
};

export const searchCustomers = async (
  query
) => {

  const response = await api.get(
    `/customers/search?query=${query}`
  );

  return response.data;
};