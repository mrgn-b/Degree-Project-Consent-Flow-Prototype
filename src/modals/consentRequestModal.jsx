import { useState, useEffect } from "react";

export function ConsentRequestModal({
  serviceId,
  serviceName,
  duration,
  purposes,
  thirdParties,
  onClose,
  updateConsent,
}) {
  const [editableConsent, setEditableConsent] = useState({
    serviceId,
    duration: duration || null,
    purposes: purposes.map((p) => ({
      id: p.id,
      description: p.description,
      granted: false, // Start unchecked
      required: p.required,
      category: p.category,
      dataCategories: p.dataCategories || [],
    })),
    thirdParties: thirdParties || [],
  });

  const [expandedCategories, setExpandedCategories] = useState({
    required: true,
    functional: true,
    advertising: true,
  });

  // Group purposes by category
  const purposesByCategory = {
    required: editableConsent.purposes.filter(p => p.category === "required"),
    functional: editableConsent.purposes.filter(p => p.category === "functional"),
    advertising: editableConsent.purposes.filter(p => p.category === "advertising"),
  };

  // Compute if all required purposes are granted
  const allRequiredGranted = editableConsent.purposes
    .filter((p) => p.required)
    .every((p) => p.granted);

  useEffect(() => {
    // Reset the editable consent if the serviceId or purposes/thirdParties change
    setEditableConsent({
      serviceId,
      duration: duration || null,
      purposes: purposes.map((p) => ({
        id: p.id,
        description: p.description,
        granted: false, // Start unchecked
        required: p.required,
        category: p.category,
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

  const handleAcceptCategory = (category) => {
    setEditableConsent((prev) => ({
      ...prev,
      purposes: prev.purposes.map((p) =>
        p.category === category ? { ...p, granted: true } : p
      ),
    }));
  };

  const handleRejectCategory = (category) => {
    setEditableConsent((prev) => ({
      ...prev,
      purposes: prev.purposes.map((p) =>
        p.category === category ? { ...p, granted: false } : p
      ),
    }));
  };

  const toggleCategoryExpanded = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSaveChanges = () => {
    updateConsent(editableConsent);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const CategorySection = ({ categoryKey, categoryLabel, purposes }) => {
    if (purposes.length === 0) return null;

    const allGranted = purposes.every(p => p.granted);
    const allRejected = purposes.every(p => !p.granted);
    const isExpanded = expandedCategories[categoryKey];

    return (
      <div className="border-b last:border-b-0">
        {/* Category Header with divider and dropdown */}
        <div className="flex items-center gap-4 py-4">
          <button
            onClick={() => toggleCategoryExpanded(categoryKey)}
            className="flex items-center justify-center w-5 h-5 text-gray-600 hover:text-gray-800 transition flex-shrink-0"
          >
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          <div className="font-semibold text-gray-800 min-w-[100px]">{categoryLabel}</div>
          <div className="flex-1 border-t border-gray-400" />
        </div>

        {/* Purpose Items - Collapsible */}
        {isExpanded && (
          <>
            <div className="space-y-4 pb-4">
              {purposes.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{p.description}</p>
                      {/* Linked Data Categories */}
                      {p.dataCategories?.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {p.dataCategories.map((dc, idx) => (
                            <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-gray-400" />
                              {dc}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Checkbox */}
                    <div className="relative group mt-0.5">
                      <input
                        type="checkbox"
                        checked={p.granted}
                        onChange={() => handlePurposeChange(p.id)}
                        className="w-5 h-5 cursor-pointer accent-blue-600"
                      />
                      {p.required && (
                        <div className="absolute hidden group-hover:block bottom-full right-0 mb-2 bg-gray-800 text-white text-xs rounded px-3 py-1 whitespace-nowrap z-[9999]">
                          Required
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Accept All / Reject All Buttons */}
            <div className="pb-4 flex gap-3">
              <button
                onClick={() => handleAcceptCategory(categoryKey)}
                disabled={allGranted}
                className={`px-4 py-2 text-sm font-medium border-2 border-gray-800 rounded-lg transition ${
                  allGranted
                    ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-gray-800 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                Accept all {categoryLabel}
              </button>
              <button
                onClick={() => handleRejectCategory(categoryKey)}
                disabled={allRejected}
                className={`px-4 py-2 text-sm font-medium border-2 border-gray-800 rounded-lg transition ${
                  allRejected
                    ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-gray-800 hover:bg-gray-50 cursor-pointer"
                }`}
              >
                Reject all {categoryLabel}
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Create Consent</h2>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Service:</strong> {serviceName || "Unknown Service"}
          </p>
        </div>

        {/* Category Sections */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Purposes & Data Access</p>
          
          <div className="space-y-0">
            <CategorySection
              categoryKey="required"
              categoryLabel="Required"
              purposes={purposesByCategory.required}
            />
            <CategorySection
              categoryKey="functional"
              categoryLabel="Functional"
              purposes={purposesByCategory.functional}
            />
            <CategorySection
              categoryKey="advertising"
              categoryLabel="Advertising"
              purposes={purposesByCategory.advertising}
            />
          </div>
        </div>

        {/* Third Parties */}
        {editableConsent.thirdParties.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Third Parties</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <ul className="space-y-2">
                {editableConsent.thirdParties.map((t) => (
                  <li key={t.id} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    {t.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-6 py-2 text-sm font-medium rounded-lg border-2 border-gray-800 text-gray-800 hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button
            onClick={handleSaveChanges}
            disabled={!allRequiredGranted}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition ${
              allRequiredGranted
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
          >
            Create Consent
          </button>
        </div>
      </div>
    </div>
  );
}
