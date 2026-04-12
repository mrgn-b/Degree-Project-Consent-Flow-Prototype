import { DataRequestsPageView } from "../views/dataRequestsPageView";
import { useDataRequestsStore } from "../stores/useDataRequestsStore";
import { useConsentStore } from "../stores/useConsentStore";

export function DataRequestsPage(){
    const dataRequests = useDataRequestsStore((state) => state.dataRequests);
    const setStatus = useDataRequestsStore((state) => state.setStatus);
    const createConsent = useConsentStore((state) => state.createConsent);
    const toggleConsentStatus = useConsentStore((state) => state.toggleConsentRevocation);
    const setRequestStatus = useDataRequestsStore((state) => state.setStatus);
    const consents = useConsentStore((state) => state.consents);

    return (
        <DataRequestsPageView 
        dataRequests={dataRequests}
        setStatus={setStatus}
        createConsent={createConsent}
        toggleConsentStatus={toggleConsentStatus}
        setRequestStatus={setRequestStatus}
        consents={consents}
        />
    );
}
