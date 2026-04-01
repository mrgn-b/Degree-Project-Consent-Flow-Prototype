import { useState } from "react";

export function ConsentDashboardView(props) {
  const consents = props.consents;
  const changeServiceStatus= props.changeServiceStatus;

  const [selectedConsentToRevoke, setSelectedConsentToRevoke] = useState(null);
  const [editableConsent, setEditableConsent] = useState(null);
  const [isEditing, setIsEditing] = useState(null);

  const statusStyles = {
    active: "bg-green-100 text-green-700",
    revoked: "bg-gray-100 text-gray-600",
    expired: "bg-red-100 text-red-700",
  };

  const confirmRevoke = () => {
    props.toggleConsentStatus(selectedConsentToRevoke.id);
    changeServiceStatus(selectedConsentToRevoke.serviceId);
    setSelectedConsentToRevoke(null);
  };
  
  function SummaryCard({ title, count, color }) {
    const colorMap = {
        green: "bg-green-100 text-green-700",
        gray: "bg-gray-100 text-gray-700",
        red: "bg-red-100 text-red-700",
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-semibold">{count}</p>
        </div>
        <div className={`w-10 h-10 rounded-full ${colorMap[color]}`} />
        </div>
    );
    }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Consent Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Manage and monitor your consents
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard title="Active" count={props.activeConsentCount} color="green" />
        <SummaryCard title="Revoked" count={props.inactiveConsentCount} color="gray" />
        <SummaryCard title="Expired" count={props.expiredConsentCount} color="red" />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-4">Service</th>
              <th className="p-4">Status</th>
              <th className="p-4">Updated</th>
              <th className="p-4">Expires</th>
              <th className="p-4">Revoked At</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {consents.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-4">{props.providerMap[c.serviceId].name}</td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${statusStyles[props.getConsentStatus(c)]}`}
                  >
                    {props.getConsentStatus(c)}
                  </span>
                </td>

                <td className="p-4">{new Date(c.timestamps.updatedAt).toLocaleString()}</td>
                <td className="p-4">{new Date(c.timestamps.expiresAt).toLocaleString()}</td>

                <td className="p-4">
                    {c.timestamps.revokedAt ? new Date(c.timestamps.revokedAt).toLocaleString() : "-"}
                </td>

                <td className="p-4 text-right">
                  <button 
                  onClick={() => setEditableConsent(c)}
                  className="text-blue-600 text-sm mr-3">
                    View
                  </button>

                  {props.getConsentStatus(c) === "active" && (
                    <button
                      onClick={() => setSelectedConsentToRevoke(c)}
                      className="text-red-600 text-sm"
                    >
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Revoke Modal */}
      {selectedConsentToRevoke && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedConsentToRevoke(null)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold">Revoke Consent</h2>

            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to revoke consent for{" "}
              <span className="font-medium">
                {props.providerMap[selectedConsentToRevoke.serviceId].name}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedConsentToRevoke(null)}
                className="px-4 py-2 text-sm rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={confirmRevoke}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white"
              >
                Confirm Revoke
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View & Edit Modal */}
      {editableConsent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              setEditableConsent(null);
              setIsEditing(false);
            }}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg font-semibold">Consent Details</h2>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Service:</strong> {props.providerMap[editableConsent.serviceId].name}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Consent ID:</strong> {editableConsent.id}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Status:</strong> {props.getConsentStatus(editableConsent)}
            </p>

            {/* Toggle for editing */
              props.getConsentStatus(editableConsent) == "active" && 
              <div className="mt-4">
                <button
                  className="px-3 py-1 text-sm rounded-lg border bg-gray-100"
                  onClick={() => setIsEditing((prev) => !prev)}
                >
                  {isEditing ? "Cancel Edit" : "Modify"}
                </button>
              </div>
            }

            {/* Purposes + Linked Data Categories */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 font-semibold">Purposes:</p>
              <ul className="list-none mt-2 space-y-2">
                {editableConsent.purposes.map((p) => (
                  <li key={p.id}>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-600 inline-block" />
                        {p.description} - <strong>{p.granted ? "Granted" : "Denied"}</strong>
                      </span>
                      {isEditing && (
                        <div className="relative group">
                          <input
                            type="checkbox"
                            checked={p.granted}
                            disabled={p.required}
                            onChange={() =>
                              setEditableConsent((prev) => ({
                                ...prev,
                                purposes: prev.purposes.map((pp) =>
                                  pp.id === p.id ? { ...pp, granted: !pp.granted } : pp
                                ),
                              }))
                            }
                            className="disabled:cursor-not-allowed disabled:opacity-50"
                          />
                          {p.required && (
                            <div className="fixed hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-[9999]">
                              This purpose is required and cannot be changed
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Linked Data Categories */}
                    {p.dataCategories?.length > 0 && (
                      <ul className="ml-6 mt-1 list-disc list-inside text-gray-500 text-xs">
                        {p.dataCategories.map((dc, idx) => (
                          <li key={idx}>{dc}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Third Parties */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 font-semibold">Third Parties:</p>
              <ul className="list-none mt-2 space-y-2">
                {editableConsent.thirdParties.length > 0 ? (
                  editableConsent.thirdParties.map((t) => (
                    <li key={t.id}>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gray-600 inline-block" />
                          {t.name} - <strong>{t.granted ? "Granted" : "Denied"}</strong>
                        </span>
                        {isEditing && (
                          <input
                            type="checkbox"
                            checked={t.granted}
                            onChange={() =>
                              setEditableConsent((prev) => ({
                                ...prev,
                                thirdParties: prev.thirdParties.map((tt) =>
                                  tt.id === t.id ? { ...tt, granted: !tt.granted } : tt
                                ),
                              }))
                            }
                          />
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li>-</li>
                )}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setEditableConsent(null);
                  setIsEditing(false);
                }}
                className="px-4 py-2 text-sm rounded-lg border"
              >
                Close
              </button>
              {isEditing && (
                <button
                  onClick={() => {
                    props.updateConsent(editableConsent);
                    setEditableConsent(null);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}