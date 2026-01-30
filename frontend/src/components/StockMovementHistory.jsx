import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";


export default function StockMovementHistory({ movements, skuToSizeMap  }) {
  const [open, setOpen] = useState(false);
  
  // De-duplicate transfers by key fields

  function dedupeTransfers(transfers) {
  const seen = new Map();

  for (const t of transfers) {
    const key = [
      t.ArtikulliId,
      t.OrganizataDergueseId,
      t.OrganizataPranueseId,
      t.DataKoha.slice(0, 10) // date only
    ].join("|");

    if (!seen.has(key)) {
      seen.set(key, {
        ...t,
        // optional: sum quantities if ERP split them
        Sasia: t.Sasia
      });
    }
  }

  return Array.from(seen.values());
}

  // Group movements by size

  function groupMovementsBySize(movements, skuToSizeMap) {
  const groups = {};

  for (const m of movements) {
    const size = skuToSizeMap[m.ArtikulliId] ?? "Unknown";

    if (!groups[size]) {
      groups[size] = [];
    }

    groups[size].push(m);
  }

  return groups;
}


  // Defensive: normalize + guard
  const normalizedMovements = Array.isArray(movements)
    ? movements.flat()
    : [];

  const dedupedMovements = dedupeTransfers(normalizedMovements);
  const movementsBySize = groupMovementsBySize(
  dedupedMovements,
  skuToSizeMap
);

  if (dedupedMovements.length === 0) {
    return null;
  }


  if (normalizedMovements.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
        <button
        onClick={() => setOpen(!open)}
        className="
            flex items-center gap-2
            text-sm font-medium
            text-blue-400
            hover:bg-blue-500/10
            px-3 py-2
            hover:text-blue-300
            transition
        "
        >
        <FontAwesomeIcon
                    icon={faChevronDown}
        className={`text-xs transition-transform duration-200 ${
            open ? "rotate-180" : ""
        }`}
        />
        <span>Stock movement history</span>
        </button>

      {open && (
  <div className="mt-4 space-y-6">
    {Object.entries(movementsBySize).map(([size, sizeMovements]) => (
      <div key={size}>
        {/* SIZE HEADER */}
        <div className="
          mb-2 text-sm font-semibold
          text-gray-700 dark:text-gray-300
        ">
          Size: {size}
        </div>

        {/* MOVEMENTS FOR THIS SIZE */}
        <MovementTable
          movements={sizeMovements}
          skuToSizeMap={skuToSizeMap}
        />
      </div>
    ))}
  </div>
)}
    </div>
  );
}

function MovementTable({ movements, skuToSizeMap }) {
  return (
    <div className="mt-4 space-y-3">
      {movements.map((m) => (
        <div
          key={`${m.TransferiId}-${m.ArtikulliId}-${m.DataKoha}`}
          className="   flex items-center justify-between
    rounded-lg
    p-3 text-sm
    bg-slate-200/40
    text-gray-800
    shadow-sm
    border border-gray-200
    dark:bg-slate-800/60
    dark:text-gray-300
    dark:border-white/10"
        >
          {/* LEFT */}
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-300">
              {m.OrganizataDerguese}
              <span className="mx-2 text-yellow-500 dark:text-yellow-400">→</span>
              {m.OrganizataPranuese}
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-500">
              {new Date(m.DataKoha).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right">
            <div className="font-semibold text-green-600 dark:text-green-400">
              +{m.Sasia}
            </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
        Size: {skuToSizeMap[m?.ArtikulliId] ?? "—"}
        </div>
          </div>
        </div>
      ))}
    </div>
  );
}
