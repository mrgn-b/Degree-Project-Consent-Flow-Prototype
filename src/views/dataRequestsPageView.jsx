import { useState } from "react";
import { ConsentRequestModal } from "../modals/consentRequestModal";

export function DataRequestsPageView(props){
  const dataRequests = props.dataRequests;
  const setStatus = props.setStatus;
  const createConsent = props.createConsent;

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedRequestToAccept, setSelectedRequestToAccept] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequestToRevoke, setSelectedRequestToRevoke] = useState(null);

  const filteredOffers = 
    statusFilter === "all" ? dataRequests : 
      dataRequests.filter((r) => r.status == statusFilter);

  const statusStyles = {
    available: "bg-gray-100 text-gray-600",
    active: "bg-green-100 text-green-700",
    completed: "bg-purple-100 text-purple-700",
    revoked: "bg-red-100 text-red-700",
  };

  function handleCreateConsent(consentData) {
    createConsent(
      consentData.serviceId,
      consentData.purposes,
      consentData.thirdParties,
      "Data Offers Page",
      consentData.duration
    )
    setStatus(consentData.serviceId, "active")
    setIsRequestModalOpen(false);
  }

  const confirmRevoke = () => {
    // Find the consent that matches this data request
    const relevantConsent = props.consents?.find(
      c => c.serviceId === selectedRequestToRevoke.id && 
          c.metadata.source !== "Service Page"
    );
    
    if (relevantConsent) {
      props.toggleConsentStatus(relevantConsent.id);  // Pass consent ID, not request ID
    }
    
    props.setRequestStatus(selectedRequestToRevoke.id, "revoked");
    setSelectedRequestToRevoke(null);
    setSelectedRequest(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Data Offers</h1>
        <p className="text-gray-500 text-sm">
          Share your data in exchange for rewards
        </p>
      </div>

    {/* Filter Buttons */}
    <div className="flex gap-2 mb-6 flex-wrap">
      {["all", "available", "active", "completed", "revoked"].map((filter) => (
        <button
          key={filter}
          className={`px-3 py-1 rounded text-sm ${
            statusFilter === filter ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
          onClick={() => setStatusFilter(filter)}
        >
          {filter === "all"
            ? "All"
            : filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOffers.map((req) => (
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
                <span className="font-medium">Duration: {req.duration.unit !== "instant" ? req.duration.value + " " + req.duration.unit : "Instant reward"}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-between items-center">
              
              {req.status !== "available" &&
                <button
                    onClick={() => setSelectedRequest(req)}
                    className="text-sm text-blue-600"
                >
                    View Details
                </button>
              }

              {req.status === "available" && (
                <button
                  onClick={() => {
                    setIsRequestModalOpen(true);
                    setSelectedRequestToAccept(req);
                }}
                  className="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white"
                >
                View
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

              {selectedRequest.status === "active" && (
                <button
                  onClick={() => setSelectedRequestToRevoke(selectedRequest)}
                  className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white"
                >
                  Revoke
                </button>
              )}

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

      {/* Revoke Confirmation Modal */}
      {selectedRequestToRevoke && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedRequestToRevoke(null)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold">Revoke Data Offer</h2>

            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to revoke{" "}
              <span className="font-medium">
                {selectedRequestToRevoke.name}
              </span>
              ? Rewards will be lost.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedRequestToRevoke(null)}
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
