import { useState } from "react";

export function ConsentDashboardView(props) {
  const consents = props.consents;
  const changeServiceStatus= props.changeServiceStatus;

  const [selectedConsentToRevoke, setSelectedConsentToRevoke] = useState(null);

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

                <td className="p-4">{c.timestamps.updatedAt}</td>
                <td className="p-4">{c.timestamps.expiresAt}</td>

                <td className="p-4">
                    {c.timestamps.revokedAt ? c.timestamps.revokedAt : "-"}
                </td>

                <td className="p-4 text-right">
                  <button className="text-blue-600 text-sm mr-3">
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
                {selectedConsentToRevoke.service}
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
    </div>
  );
}