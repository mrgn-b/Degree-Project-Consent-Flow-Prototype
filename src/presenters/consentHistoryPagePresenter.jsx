import { ConsentHistoryPageView } from "../views/consentHistoryPageView";
import { useConsentStore } from "../stores/useConsentStore";
import { useServiceProviderStore } from "../stores/useServiceProviderStore";
import { useMemo } from "react";

export function ConsentHistoryPage(){
    const actions = useConsentStore((state => state.consentActions));
    const consents = useConsentStore((state) => state.consents);
    const providers = useServiceProviderStore((state) => state.providers);

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

    return (
        <ConsentHistoryPageView
        actions={actions}
        consentMap={consentMap}
        providerMap={providerMap}
        />
    );
}