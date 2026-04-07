import { useState } from "react";
import { ConsentRequestModal } from "../modals/consentRequestModal";

export function DataRequestsPageView(props){
  const dataRequests = props.dataRequests;
  const setStatus = props.setStatus;
  const createConsent = props.createConsent;

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedRequestToAccept, setSelectedRequestToAccept] = useState(null);

  const statusStyles = {
    available: "bg-gray-100 text-gray-600",
    active: "bg-green-100 text-green-700",
    completed: "bg-purple-100 text-purple-700",
    revoked: "bg-red-100 text-red-700",
  };

  const handleAccept = (req) => {
    setStatus(req.id, "active");
    createConsent(req.id, req.purposes, req.thirdParties, "Data Request Page", req.duration)
  };

  function handleCreateConsent(consentData) {
    createConsent(
      consentData.serviceId,
      consentData.purposes,
      consentData.thirdParties,
      "Data Request Page",
      consentData.duration
    )
    setStatus(consentData.serviceId, "active")
    setIsRequestModalOpen(false);
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Data Requests</h1>
        <p className="text-gray-500 text-sm">
          Share your data in exchange for rewards
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-xl shadow p-5 flex flex-col justify-between"
          >
            {/* Top */}
            <div>
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">{req.name}</h2>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${statusStyles[req.status]}`}
                >
                  {req.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {req.description}
              </p>

              {/* Reward */}
              <div className="mt-3 text-sm">
                <span className="font-medium">Reward: {req.reward}</span>
              </div>

              {/* Duration */}
              <div className="text-sm text-gray-500">
                <span className="font-medium">Duration: {req.duration.value} {req.duration.unit}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setSelectedRequest(req)}
                className="text-sm text-blue-600"
              >
                View Details
              </button>

              {req.status === "available" && (
                <button
                  onClick={() => {
                    setIsRequestModalOpen(true);
                    setSelectedRequestToAccept(req);
                }}
                  className="px-3 py-1 text-sm rounded-lg bg-green-600 text-white"
                >
                  Accept
                </button>
              )}

              {req.status !== "available" && (
                <span className="text-xs text-gray-400">
                  {req.status === "accepted" && "Waiting to start"}
                  {req.status === "active" && "In progress"}
                  {req.status === "completed" && "Completed"}
                  {req.status === "revoked" && "Revoked"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedRequest(null)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold">
              {selectedRequest.name}
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              {selectedRequest.description}
            </p>

            {/* Purposes */}
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-600">
                Purposes
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {selectedRequest.purposes?.map((p) => (
                  <li key={p.id}>
                    • {p.description}
                  </li>
                ))}
              </ul>
            </div>

            {/* Third Parties */}
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-600">
                Third Parties
              </p>
              <ul className="mt-2 text-sm text-gray-500">
                {selectedRequest.thirdParties?.map((p) => (
                  <li key={p.id}>
                    • {p.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 text-sm rounded-lg border"
              >
                Close
              </button>

              {selectedRequest.status === "available" && (
                <button
                  onClick={() => {
                    setSelectedRequestToAccept(selectedRequest);
                    setIsRequestModalOpen(true);
                    setSelectedRequest(null);
                  }}
                  className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white"
                >
                  Accept Request
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Consent Request Modal */}
        {isRequestModalOpen && selectedRequestToAccept && (
            <ConsentRequestModal
            serviceId={selectedRequestToAccept.id}
            serviceName={selectedRequestToAccept.name}
            duration={selectedRequestToAccept.duration}
            purposes={selectedRequestToAccept.purposes}
            thirdParties={selectedRequestToAccept.thirdParties}
            updateConsent={handleCreateConsent}
            onClose={() => {
                setIsRequestModalOpen(false);
                setSelectedRequest(null);
            }}
            />
        )}
    </div>
  );
}