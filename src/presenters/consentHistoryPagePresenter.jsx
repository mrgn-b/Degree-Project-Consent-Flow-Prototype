import { ConsentHistoryPageView } from "../views/consentHistoryPageView";
import { useConsentStore } from "../stores/useConsentStore";
import { useServiceProviderStore } from "../stores/useServiceProviderStore";
import { useMemo } from "react";
import { useDataRequestsStore } from "../stores/useDataRequestsStore";
import { useConsentHistoryLastVisit } from "../hooks/useConsentHistoryLastVisit";

export function ConsentHistoryPage(){
    const actions = useConsentStore((state => state.consentActions));
    const consents = useConsentStore((state) => state.consents);
    const providers = useServiceProviderStore((state) => state.providers);
    const dataRequests = useDataRequestsStore((state) => state.dataRequests);
    const lastVisitTime = useConsentHistoryLastVisit();

    // Get consent object by id
    const consentMap = useMemo(() => {
        return Object.fromEntries(
            consents.map((c) => [c.id, c])
        );
    }, [consents]);

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
        <ConsentHistoryPageView
        actions={actions}
        consentMap={consentMap}
        providerMap={providerMap}
        requestMap={requestMap}
        lastVisitTime={lastVisitTime}
        />
    );
}
