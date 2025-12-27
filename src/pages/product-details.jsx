import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetails = () => {

const { styleNumber } = useParams();
const [ searchParams ] = useSearchParams();
  const color = searchParams.get("color");
  const colorCode = searchParams.get("colorCode");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async ()=> {
        try {
            setLoading(true);
            const res = await fetch (
                  `${import.meta.env.VITE_API_URL}/api/stock/details?styleNumber=${styleNumber}&color=${color}&colorCode=${colorCode}`
            );
            if(!res.ok) {
                throw new Error('Failed to fetch product details')
            }
             const json = await res.json();
             setData(json);
             console.log(json)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }
    fetchDetails();
  }, [styleNumber, colorCode, color]);

        if (!data) {
        return <p className="p-6">Loading stock…</p>;
}

          return (
    <div className="p-6">
        <table className="w-full border mt-6">
            <thead>
                <tr>
                    <th className="border p-2 text-left"> Organisation </th>
                        {data.sizesOrder.map(size => (
                            <th key={size} className="border p-4 text-center">
                                {size}
                            </th>
                        ))}
                </tr>
            </thead>
            <tbody>
                        {data.visibleOrganisations.map(org => 
                            <tr key={org.organisationId}>
                                <td className="border p-2 text-left">
                                    {org.organisationName}
                                </td>
                                {data.sizesOrder.map(s => {
                                    const stock = org.sizes[s]

                                    return (
                                        <td key={s} className="border p-2 text-center">
                                            {stock !== undefined ? stock : '-'}
                                        </td>
                                    )
                                })}
                            </tr>
                        )}
            </tbody>
        </table>
    </div>
);
}
 
export default ProductDetails;