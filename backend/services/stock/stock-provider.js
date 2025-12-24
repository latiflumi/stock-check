import { getMockStockBySku } from "./stock-mock.js";
import { getLiveStockBySku } from "./stock-live.js";

export async function getStockBySku(sku) {
  const useMock = process.env.USE_MOCK_STOCK === "true";
  if (useMock) return getMockStockBySku(sku);
  return getLiveStockBySku(sku);
}
