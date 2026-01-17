const StockTable = ({ data }) => {

  const totalsBySize = data?.totalsBySize ?? {};
  const stockColorClass = (value) => {
  if (value === 0) return "bg-red-500/15 dark:bg-red-600/20 text-red-500";
  if (value < 2) return "bg-yellow-200/20 dark:bg-yellow-400/10 text-yellow-400";
  return "bg-emerald-400/20 dark:bg-emerald-400/10";
};

if (data.visibleOrganisations.length === 0) {
 return (
  <div className="mt-10 flex w-full justify-center">
    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-center backdrop-blur-sm">
      <p className="text-xl font-medium tracking-wide text-red-300">
        No stock available
      </p>
      <p className="mt-1 text-l text-red-400/70">
        This item is currently unavailable in all locations
      </p>
    </div>
  </div>
);
}

  return (
    <div className="relative overflow-x-auto overflow-y-auto mt-6 max-h-[100vh]">
      <table className="w-max max-w-none mx-auto border-collapse bg-slate-50 dark:bg-[#111b34]">
        <thead> 
          <tr>
            <th className="sticky bg-slate-200 top-0 left-0 z-30 p-4 text-left
  bg-gray-100 border border-gray-300
  dark:bg-[#111b34] dark:border-gray-700">
              Organisation
            </th>
            {data.sizesOrder.map(size => (
              <th
                key={size}
                className="sticky bg-slate-200 top-0 z-20 p-4 text-center
  bg-gray-100 border border-gray-300
  dark:bg-[#111b34] dark:border-gray-700"
              >
                {size}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.visibleOrganisations.map(org => (
            <tr
              key={org.organisationId}
              >
              <td className="sticky w-40 md:w-full bg-slate-200 left-0 z-10 px-2 p-2
  bg-gray-100 border border-gray-300
  dark:bg-[#111b34] dark:border-gray-700">
                {org.organisationName}
              </td>
              
              {data.sizesOrder.map(s => {
                const stock = Number(org.sizes[s] ?? 0);
                return (
                  <td
                    key={s}
                    className={`border p-2 text-center font-semibold whitespace-nowrap
  border-gray-300 dark:border-gray-700
  ${stockColorClass(stock)}`}
                  >
                    {stock ?? "0"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
                <tfoot>
          <tr className="font-bold">
            <td className="border sticky left-0 z-10 p-2 text-center font-semibold whitespace-nowrap
  border-gray-300 dark:border-gray-700 dark:bg-[#1D2A55]">Total</td>

            {data.sizesOrder.map(size => {
              const stock = Number(totalsBySize[size] ?? 0);
              return (
              <td key={size} className={`border p-2 text-center font-semibold whitespace-nowrap
  border-gray-300 dark:border-gray-700 ${stockColorClass(stock)}`}>
                {totalsBySize[size] ?? 0}
              </td>
            )})}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default StockTable;
