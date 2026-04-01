export function ConsentHistoryPageView(props) {
  const actions = [...props.actions].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const formatDate = (ts) => {
    return new Date(ts).toLocaleString();
  };

  const getActionLabel = (type) => {
    switch (type) {
      case "created":
        return "Consent Created";
      case "updated":
        return "Preferences Updated";
      case "revoked":
        return "Consent Revoked";
      case "unrevoked":
        return "Consent Unrevoked"; // This one is probably not necessary
      default:
        return type;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Consent History</h1>

      <div className="relative border-l border-gray-200 pl-6 space-y-6">
        {actions.map((action) => (
          <div key={action.id} className="relative">
            {/* Timeline dot */}
            <span className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />

            {/* Card */}
            <div className="bg-white shadow rounded-xl p-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-800">
                  {getActionLabel(action.type)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(action.timestamp)}
                </p>
              </div>

              {/* Actor + source */}
              <p className="text-xs text-gray-500 mt-1">
                {action.actor} via {action.metadata?.source || "unknown"}
              </p>

              {/* Changes */}
              {action.changes && (
                <div className="mt-3 space-y-2">
                  {/* Purposes */}
                  {action.changes.purposes?.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600">
                        Purposes
                      </p>
                      <ul className="mt-1 space-y-1">
                        {action.changes.purposes.map((p) => (
                          <li
                            key={p.id}
                            className="flex justify-between text-sm"
                          >
                            <span>{p.description}</span>
                            <span>
                              <span className="text-red-500">
                                {p.from ? "Granted" : "Denied"}
                              </span>
                              {" → "}
                              <span className="text-green-600">
                                {p.to ? "Granted" : "Denied"}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Third Parties */}
                  {action.changes.thirdParties?.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600">
                        Third Parties
                      </p>
                      <ul className="mt-1 space-y-1">
                        {action.changes.thirdParties.map((t) => (
                          <li
                            key={t.id}
                            className="flex justify-between text-sm"
                          >
                            <span>{t.id}</span>
                            <span>
                              <span className="text-red-500">
                                {t.from ? "Granted" : "Denied"}
                              </span>
                              {" → "}
                              <span className="text-green-600">
                                {t.to ? "Granted" : "Denied"}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* No changes (e.g. revoke/create) */}
              {!action.changes && (
                <p className="text-sm text-gray-500 mt-2">
                  No detailed changes recorded
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}