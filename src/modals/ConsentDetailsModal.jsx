import { useState, useEffect } from "react";

export function ConsentDetailsModal({
  consent,
  providerMap,
  requestMap,
  getConsentStatus,
  updateConsent,
  onClose,
  isNewConsent = false,
}) {
  const [isEditing, setIsEditing] = useState(isNewConsent);
  const [editableConsent, setEditableConsent] = useState(consent);

  // Update editableConsent when consent prop changes
  useEffect(() => {
    setEditableConsent(consent);
    setIsEditing(isNewConsent);
  }, [consent, isNewConsent]);

  if (!consent) return null;

  const handlePurposeChange = (purposeId) => {
    setEditableConsent((prev) => ({
      ...prev,
      purposes: prev.purposes.map((p) =>
        p.id === purposeId ? { ...p, granted: !p.granted } : p
      ),
    }));
  };

  const handleSaveChanges = () => {
    updateConsent(editableConsent);
    onClose();
    setIsEditing(false);
  };

  const handleClose = () => {
    onClose();
    setIsEditing(false);
  };

  //Determine if modify button should be shown
  const showModifyButton = !isNewConsent && getConsentStatus(editableConsent) === "active";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold">
          {isNewConsent ? "Create Consent" : "Consent Details"}
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Service:</strong> {providerMap[editableConsent.serviceId]?.name || requestMap[editableConsent.serviceId]?.name || "Unknown Service"}
        </p>
        {!isNewConsent && (
          <>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Consent ID:</strong> {editableConsent.id}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Status:</strong> {getConsentStatus(editableConsent)}
            </p>
          </>
        )}

        {/* Toggle for editing */}
        {showModifyButton && (
          <div className="mt-4">
            <button
              className="px-3 py-1 text-sm rounded-lg border bg-gray-100 hover:bg-gray-200"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "Cancel Edit" : "Modify"}
            </button>
          </div>
        )}

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
                        onChange={() => handlePurposeChange(p.id)}
                        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {p.required && (
                        <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-[9999]">
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
                      {t.name}
                    </span>
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
            onClick={handleClose}
            className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50"
          >
            Close
          </button>
          {isEditing && (
            <button
              onClick={handleSaveChanges}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {isNewConsent ? "Create Consent" : "Save Changes"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
