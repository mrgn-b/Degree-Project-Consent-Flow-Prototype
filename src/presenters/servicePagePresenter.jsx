import { ServicePageView } from "../views/servicePageView";
import { useServiceProviderStore } from "../stores/useServiceProviderStore";
import { useConsentStore } from "../stores/useConsentStore";

export function ServicePage(props){
    const providers = useServiceProviderStore((state) => state.providers);
    const changeServiceStatus = useServiceProviderStore((state) => state.toggleStatus);
    const createConsent = useConsentStore((state) => state.createConsent);

    return (
        <ServicePageView
        providers={providers}
        changeServiceStatus={changeServiceStatus}
        createConsent={createConsent}
        />
    );
}