import { useState } from "react";

export function ConsentHistoryPageView(props) {
  const [timeFilter, setTimeFilter] = useState("all"); // default filter: All
  const consentMap = props.consentMap;
  const providerMap = props.providerMap;
  const requestMap = props.requestMap;

  const actions = [...props.actions].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const formatDate = (ts) => new Date(ts).toLocaleString();

  const getActionLabel = (type) => {
    switch (type) {
      case "created":
        return "Consent Created";
      case "updated":
        return "Preferences Updated";
      case "revoked":
        return "Consent Revoked";
      case "unrevoked":
        return "Consent Unrevoked";
      case "expired":
        return "Consent Expired";
      default:
        return type;
    }
  };

  // Filter actions by selected time
  const filteredActions = actions.filter((action) => {
    if (timeFilter === "all") return true;

    const now = Date.now();
    const actionTime = new Date(action.timestamp).getTime();
    let threshold = 0;

    switch (timeFilter) {
      case "1h":
        threshold = 1000 * 60 * 60; // 1 hour
        break;
      case "1d":
        threshold = 1000 * 60 * 60 * 24; // 1 day
        break;
      case "1mo":
        threshold = 1000 * 60 * 60 * 24 * 30; // ~1 month
        break;
      default:
        threshold = Infinity;
    }

    return now - actionTime <= threshold;
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">Consent History</h1>
      <p className="text-gray-500 text-sm mb-6">See all your consent actions</p>

      {/* Time filter buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "1h", "1d", "1mo"].map((filter) => (
          <button
            key={filter}
            className={`px-3 py-1 rounded text-sm ${
              timeFilter === filter ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
            onClick={() => setTimeFilter(filter)}
          >
            {filter === "all"
              ? "All"
              : filter === "1h"
              ? "Last 1 hour"
              : filter === "1d"
              ? "Last 1 day"
              : "Last 1 month"}
          </button>
        ))}
      </div>

      <div className="relative border-l border-gray-200 pl-6 space-y-6">
        {filteredActions.length === 0 && (
          <p className="text-gray-500 text-sm">No consent actions in this time range.</p>
        )}

        {filteredActions.map((action) => (
          <div key={action.id} className="relative">
            {/* Timeline dot */}
            <span className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />

            {/* Card */}
            <div className="bg-white shadow rounded-xl p-4">
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-800">{getActionLabel(action.type)} for {action.consentType === "service" ? providerMap[consentMap[action.consentId].serviceId].name : requestMap[consentMap[action.consentId].serviceId].name}</p>
                <p className="text-xs text-gray-500">{formatDate(action.timestamp)}</p>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {action.actor} via {action.metadata?.source || "unknown"}
              </p>

              {action.changes && (
                <div className="mt-3 space-y-2">
                  {action.changes.purposes?.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Purposes</p>
                      <ul className="mt-1 space-y-1">
                        {action.changes.purposes.map((p) => (
                          <li key={p.id} className="flex justify-between text-sm">
                            <span>{p.description || p.id}</span>
                            <span>
                              <span className="text-red-500">{p.from ? "Granted" : "Denied"}</span>{" → "}
                              <span className="text-green-600">{p.to ? "Granted" : "Denied"}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {action.changes.thirdParties?.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Third Parties</p>
                      <ul className="mt-1 space-y-1">
                        {action.changes.thirdParties.map((t) => (
                          <li key={t.id} className="flex justify-between text-sm">
                            <span>{t.id}</span>
                            <span>
                              <span className="text-red-500">{t.from ? "Granted" : "Denied"}</span>{" → "}
                              <span className="text-green-600">{t.to ? "Granted" : "Denied"}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {!action.changes && (
                <p className="text-sm text-gray-500 mt-2">No detailed changes recorded</p>
              )}

              <p className="text-xs text-gray-500 mt-2">Consent ID: {action.consentId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}