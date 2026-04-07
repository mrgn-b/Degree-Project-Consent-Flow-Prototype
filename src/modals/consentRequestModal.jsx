import { useState, useEffect } from "react";

export function ConsentRequestModal({
  serviceId,
  serviceName,
  purposes,
  thirdParties,
  onClose,
  updateConsent,
}) {
  const [editableConsent, setEditableConsent] = useState({
    serviceId,
    purposes: purposes.map((p) => ({
      id: p.id,
      description: p.description,
      granted: false, // Start unchecked
      required: p.required,
      dataCategories: p.dataCategories || [],
    })),
    thirdParties: thirdParties || [],
  });

  // Compute if all required purposes are granted
  const allRequiredGranted = editableConsent.purposes
    .filter((p) => p.required)
    .every((p) => p.granted);

  useEffect(() => {
    // Reset the editable consent if the serviceId or purposes/thirdParties change
    setEditableConsent({
      serviceId,
      purposes: purposes.map((p) => ({
        id: p.id,
        description: p.description,
        granted: false, // Start unchecked
        required: p.required,
        dataCategories: p.dataCategories || [],
      })),
      thirdParties: thirdParties || [],
    });
  }, [serviceId, purposes, thirdParties]);

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
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold">Create Consent</h2>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Service:</strong> {serviceName || "Unknown Service"}
        </p>

        {/* Purposes */}
        <section className="mt-4 space-y-4">
          <p className="text-sm text-gray-600 font-semibold">Purposes</p>
          <ul className="list-none space-y-2">
            {editableConsent.purposes.map((p) => (
              <li key={p.id}>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-600 inline-block" />
                    {p.description} {p.required && <strong>(Required)</strong>}
                  </span>
                  <input
                    type="checkbox"
                    checked={p.granted}
                    onChange={() => handlePurposeChange(p.id)}
                    className="cursor-pointer"
                  />
                </div>

                {p.dataCategories.length > 0 && (
                  <ul className="ml-6 mt-1 list-disc list-inside text-gray-500 text-xs">
                    {p.dataCategories.map((dc, idx) => (
                      <li key={idx}>{dc}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Third Parties */}
        <section className="mt-4">
          <p className="text-sm text-gray-600 font-semibold">Third Parties</p>
          <ul className="list-none mt-2 space-y-2">
            {editableConsent.thirdParties.length > 0 ? (
              editableConsent.thirdParties.map((t) => (
                <li key={t.id} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-600 inline-block" />
                  {t.name}
                </li>
              ))
            ) : (
              <li>-</li>
            )}
          </ul>
        </section>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={handleSaveChanges}
            disabled={!allRequiredGranted} // enable only when all required checked
            className={`px-4 py-2 text-sm rounded-lg border hover:bg-gray-50${
              !allRequiredGranted
                ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400"
                : "cursor-pointer hover:bg-gray-50"
            }`}
          >
            Create Consent
          </button>
        </div>
      </div>
    </div>
  );
}