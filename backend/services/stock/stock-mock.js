import { mockStockBySku } from "../../data/stock-mock-data.js";

export function getMockStockBySku(sku) {
  return mockStockBySku[sku] ?? [];
}
