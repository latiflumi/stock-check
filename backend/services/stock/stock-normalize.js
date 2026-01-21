export function normalizeErpStock(erpRows){
    if (!Array.isArray(erpRows)) return [];
    
    
    return erpRows.map(row => ({
        organisationId: row.OrganizataId,
        organisationName: row.OrganisationName?.trim(),
        stock: Number(row.Stoku) || 0,
        price: Number(row.CmimiShitjes),
        discountPrice: Number(row.CmimiMeZbritje),
        discount: Number(row.ZbritjaAktive),
    }))
};