import api from "./axios";

export const getVisits = async () => {

  const response = await api.get(
    "/visits"
  );

  return response.data;
};

export const createVisit = async (
  payload
) => {

  const response = await api.post(
    "/visits",
    payload
  );

  return response.data;
};