import api from "./axios";

export const getVisits = async (
  visitDate = null
) => {

  let url = "/visits";

  if (visitDate) {

    url += `?visit_date=${visitDate}`;
  }

  const response = await api.get(
    url
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