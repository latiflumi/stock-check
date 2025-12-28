const StockTable = ({ data }) => {
    const stockColorClass = (value) => {
  if (value === 0) return "bg-red-600/20";
  if (value < 2) return "bg-red-400/10";
  return "bg-emerald-400/10";
};


  return (
    <div className="relative w-full overflow-x-auto overscroll-x-contain mt-6">
      <table className="w-max max-w-none mx-auto border-collapse bg-[#111b34]">
        <thead>
          <tr>
            <th className="relative border border-gray-700 left-0 sticky md:sticky md: text-left p-4 left-0 bg-[#111b34] z-10">
              Organisation
            </th>
            {data.sizesOrder.map(size => (
              <th
                key={size}
                className="border p-4 border-gray-700 text-center"
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
              className=""
            >
              <td className="sticky border border-gray-700 left-0 md:sticky md:left-0 bg-[#111b34] z-10 px-4">
                {org.organisationName}
              </td>

              {data.sizesOrder.map(s => {
                const stock = org.sizes[s];
                return (
                  <td
                    key={s}
                    className={`border border-gray-700 p-2 text-center font-semibold whitespace-nowrap ${stockColorClass(stock)}`}
                  >
                    {stock ?? "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
