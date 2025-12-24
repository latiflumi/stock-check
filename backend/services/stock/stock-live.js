import { normalizeErpStock } from "./stock-normalize.js";


export async function getLiveStockBySku(sku) {
    const STOCK_API_URL = process.env.STOCK_API_URL
    const STOCK_API_KEY = process.env.STOCK_API_KEY;

    const res = await fetch(STOCK_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'APIKey': STOCK_API_KEY
        },
        body: JSON.stringify({
            endpointName: 'product/stock/v2',
            parameters: { 
                ProductId: sku
            }
        })
    });
    
    if(!res.ok){
        console.log('ERP stock fetch failed', res.status)
    }
    
    const data = await res.json();
    
    return normalizeErpStock(data);
}