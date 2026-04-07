import { useMemo } from "react";
import { ConsentDashboardView } from "../views/consentDashboardView";
import { useConsentStore } from "../stores/useConsentStore";
import { useServiceProviderStore } from "../stores/useServiceProviderStore";
import { useDataRequestsStore } from "../stores/useDataRequestsStore";

export function ConsentDashboard(){
    const consents = useConsentStore((state) => state.consents);
    const getConsentStatus = useConsentStore((state) => state.getStatus);
    const toggleConsentStatus = useConsentStore((state) => state.toggleConsentRevocation);
    const getActiveConsentCount = useConsentStore((state) => state.getActiveCount);
    const getRevokedConsentCount = useConsentStore((state) => state.getRevokedCount);
    const getExpiredConsentCount = useConsentStore((state) => state.getExpiredCount);
    const providers = useServiceProviderStore((state) => state.providers);
    const changeServiceStatus = useServiceProviderStore((state) => state.toggleStatus);
    const updateConsent = useConsentStore((state) => state.updateConsent);
    const dataRequests = useDataRequestsStore((state) => state.dataRequests);
    const setRequestStatus = useDataRequestsStore((state) => state.setStatus)

    // Get provider object by id
    const providerMap = useMemo(() => {
        return Object.fromEntries(
        providers.map((p) => [p.id, p])
        );
    }, [providers]);

    // Get request by id
    const requestMap = useMemo(() => {
        return Object.fromEntries(
            dataRequests.map((r) => [r.id, r])
        );
    }, [dataRequests]);

    return (
       <ConsentDashboardView
       consents={consents}
       getConsentStatus={getConsentStatus}
       toggleConsentStatus={toggleConsentStatus}
       activeConsentCount={getActiveConsentCount()}
       inactiveConsentCount={getRevokedConsentCount()}
       expiredConsentCount={getExpiredConsentCount()}
       providerMap={providerMap}
       changeServiceStatus={changeServiceStatus}
       updateConsent={updateConsent}
       requestMap={requestMap}
       setRequestStatus={setRequestStatus}
       /> 
    );
}