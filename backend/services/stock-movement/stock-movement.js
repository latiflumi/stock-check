export async function getStockMovement(artikulliIds) {
    const STOCK_MOVEMENT_API_URL = process.env.STOCK_MOVEMENT_API_URL
    const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

    const res = await fetch(STOCK_MOVEMENT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': INTERNAL_API_KEY
    },
    body: JSON.stringify({ artikulliIds })
  });
    
    if(!res.ok){
        console.log('ERP stock movement fetch failed', res.status)
    }
    
     return res.json();
}