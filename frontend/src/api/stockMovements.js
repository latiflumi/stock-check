import api from "./axios";

export const fetchStockMovements = async (artikulliIds) => {
  const res = await api.get("/stock/details", {
    params: { artikulliIds: artikulliIds.join(",") }
  });
  return res.data;
};