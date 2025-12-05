import data from "../mock.json" with { type: "json" };

const StockTable = () => {
    const uniqueSizes = [...new Set(data.map(item => item.Size))]
   
    const totals = data.reduce((acc, item) => {
const totalForThisSize = item.stock.reduce((a, org) => a + org.Stoku, 0);
    acc[item.Size] = totalForThisSize;
    return acc
}, {});

    const orgNamesNested = data.map(item=> item.stock.map(o => o.OrganisationName));
    const orgNamesFlat = orgNamesNested.flat();
    const uniqueOrgs =  [...new Set(orgNamesFlat)];

    const table = uniqueOrgs.map(item => {
        const stockBySize = {};

        uniqueSizes.map(size=> {
        const variant = data.find(s => s.Size === size)
        const orgEntry = variant.stock.find( org => org.OrganisationName === item)
        stockBySize[size] = orgEntry.Stoku
        })
        return {
            organisation: item,
            stockBySize
        }
    })
    console.log(totals);
    
    return ( 
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="border p-4">Organisations</th>
                        {uniqueSizes.map(sizes =><th className="border p-4">{sizes}</th> )}
                    </tr>
                </thead>
               <tbody>
                    {table.map(row => (
                        <tr>
                        <td className="border p-4">{row.organisation}</td> 
                        {uniqueSizes.map(size => (
                            <td className="border p-4">{row.stockBySize[size]}</td>                          
                ))}
             </tr>
            ))}
                         <tr>
  <td className="border p-4 font-bold">TOTAL</td>
  {uniqueSizes.map(size => (
    <td className="border p-4 font-bold">{totals[size]}</td>
  ))}
</tr>
                </tbody>
            </table>

        </div>
     );
}
 
export default StockTable;