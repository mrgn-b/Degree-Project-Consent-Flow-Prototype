export function ServicePageView(props) {
  const providers = props.providers;
  const createConsent = props.createConsent;
  const changeServiceStatus = props.changeServiceStatus;

  const activeProviders = providers.filter(p => p.status === "active");
  const inactiveProviders = providers.filter(p => p.status === "inactive");

  function handleConsentACB(provider){
    if(provider.status == "inactive"){
      createConsent(provider.id, provider.purposes, provider.dataCategories, provider.thirdParties);
      changeServiceStatus(provider.id);
    }
  }

  function renderProviderCardACB(provider, index){
    return (
        <div
        key={index}
        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col items-center"
        >
        <img
            src={provider.logoUrl || null}
            alt={provider.name}
            className="w-20 h-20 object-contain mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{provider.name}</h2>
        <p className="text-gray-600 text-center mb-4">{provider.description}</p>
        <span
            className={`mb-4 px-2 py-1 rounded-full text-sm font-medium ${
            provider.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
            }`}
        >
            {provider.status === "active" ? "Active" : "Inactive"}
        </span>
        <button onClick={() => handleConsentACB(provider)}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
            {provider.status === "active" ? "Access" : "Connect"}
        </button>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Service Providers</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Connect or access the services you use below.
      </p>

      {/* Active Services */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Active Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
        {activeProviders.map(renderProviderCardACB)}
      </div>

      {/* Inactive Services */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Inactive Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {inactiveProviders.map(renderProviderCardACB)}
      </div>
    </div>
  );
}