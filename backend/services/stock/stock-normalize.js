export function normalizeErpStock(erpRows){
    if (!Array.isArray(erpRows)) return [];
    
    return erpRows.map(row => ({
        organisationId: row.OrganizataId,
        organisationName: row.OrganisationName?.trim(),
        stock: Number(row.Stoku) || 0
    }))
};