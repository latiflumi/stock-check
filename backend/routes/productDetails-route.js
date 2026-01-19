import express from 'express' 
import { getStockBySku } from '../services/stock/stock-provider.js';
import { Product } from '../models/Product.js';

const router = express.Router();
const cache = new Map();

async function getProductFromMongo(styleNumber, color, colorCode) {
      const product = await Product.find({
            NumriSerik: styleNumber,
            Ngjyra: color,
            ...(colorCode ? { KodiNgjyres: colorCode } : {})
        }).lean();

        if(!product.length){
            return null;
        }

        return {
        styleNumber,
        color,
        colorCode: colorCode ?? null,
        productName: product[0].Pershkrimi,
        brand: product[0].PershkrimiBrendit,
            sizes: product.map(p => ({
            size: p.Size,
            sku: p.ArtikulliId,
        }))
        }
}

router.get("/details", async (req,res) => {
    const {styleNumber, color, colorCode} = req.query;
    
    const normalizedColorCode =
     colorCode && colorCode !== "undefined" && colorCode !== "null" && colorCode !== ""
    ? colorCode
    : null;

    const cacheKey = JSON.stringify({ 
        styleNumber,
        color,
        colorCode: normalizedColorCode
    });

    const cached = cache.get(cacheKey);

    if (cached && cached.expiresAt > Date.now()){ 
        return res.json(cached.data);
    }

    const productMeta = await getProductFromMongo(styleNumber,color, normalizedColorCode);
      
    if(!productMeta) {
        return res.status(404).json({message: "Product not found"});
    }

    const stockPromises = productMeta.sizes.map(s => getStockBySku(s.sku));

    const stockResults = await Promise.all(stockPromises);

    const sizesWithStock = productMeta.sizes.map((s, index) => ({
        size: s.size,
        sku: s.sku,
        stock: stockResults[index]
    }));

   const orgMap = {};

   for(const sizeItem of sizesWithStock){
    const size = sizeItem.size;

    for(const orgStock of sizeItem.stock){
        const orgId = orgStock.organisationId;

        if(!orgMap[orgId]){
            orgMap[orgId] = {
                organisationId: orgId,
                organisationName: orgStock.organisationName,
                sizes: {}
            }
        }
        orgMap[orgId].sizes[size] = orgStock.stock;
    }
   }
   const organisationsArray = Object.values(orgMap);

   // Re-order sizes 
    const sortSizesArray = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const sizesOrder = [...new Set (sizesWithStock.map(item => item.size))];
    sizesOrder.sort((a, b) => sortSizesArray.indexOf(a) - sortSizesArray.indexOf(b));
    

    // Return only organisations that have atleast 1 size in stock 
        
    const visibleOrganisations = organisationsArray.filter(org => {
        return sizesOrder.some(size => org.sizes[size] > 0);
    })

    // Return products that have stock 1 only in a single organisation (Warehouse)

    const warehouse_id = 10;

    const isOnlyInWarehouse = (() => {
        const warehouse = organisationsArray.find (
            org => org.organisationId === warehouse_id
        );

        if(!warehouse) return false;

        //Warehouse must have at least ONE size > 0 

        const warehouseHasStock = sizesOrder.some(
            size => (warehouse.sizes?.[size] ?? 0) > 0
        );

        if(!warehouseHasStock) return false;

        // All other organisations must have ZERO stock 

        const othersHaveNoStock = organisationsArray
        .filter(org => org.organisationId !== warehouse_id)
        .every(org =>
            sizesOrder.every(size => (org.sizes?.[size] ?? 0) === 0)
        );
        return othersHaveNoStock
    })();

    
    // Total stock by size

    const totalsBySize = {};

    sizesOrder.forEach(size => {
    totalsBySize[size] = visibleOrganisations.reduce(
        (sum, org) => sum + (org.sizes?.[size] || 0),
        0
    );
    });

const response = { 
        ...productMeta,
        sizesOrder,
        visibleOrganisations,
        totalsBySize,
        isOnlyInWarehouse
    };
    cache.set(cacheKey, {
        data: response,
        expiresAt:Date.now() + 120_000
    })
    console.log(response);
    res.json(response);

});

export default router;