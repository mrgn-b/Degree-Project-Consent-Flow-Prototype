import { ServicePageView } from "../views/servicePageView";
import { useServiceProviderStore } from "../stores/useServiceProviderStore";
import { useConsentStore } from "../stores/useConsentStore";

export function ServicePage(props){
    const providers = useServiceProviderStore((state) => state.providers);
    const changeServiceStatus = useServiceProviderStore((state) => state.toggleStatus);
    const createConsent = useConsentStore((state) => state.createConsent);
    const consents = useConsentStore((state) => state.consents);
    const getConsentStatus = useConsentStore((state) => state.getStatus);
    const updateConsent = useConsentStore((state) => state.updateConsent);
    const toggleConsentStatus = useConsentStore((state) => state.toggleConsentRevocation);

    return (
        <ServicePageView
        providers={providers}
        changeServiceStatus={changeServiceStatus}
        createConsent={createConsent}
        consents={consents}
        getConsentStatus={getConsentStatus}
        updateConsent={updateConsent}
        toggleConsentStatus={toggleConsentStatus}
        />
    );
}
