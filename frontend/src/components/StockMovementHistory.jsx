import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";


export default function StockMovementHistory({ movements, skuToSizeMap  }) {
  const [open, setOpen] = useState(false);

  // Defensive: normalize + guard
  const normalizedMovements = Array.isArray(movements)
    ? movements.flat()
    : [];

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

      {open && <MovementTable movements={normalizedMovements} skuToSizeMap={skuToSizeMap} />}
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
              {new Date(m.DataKoha).toLocaleString()}
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right">
            <div className="font-semibold text-green-600 dark:text-green-400">
              +{m.SasiaDerguar}
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
