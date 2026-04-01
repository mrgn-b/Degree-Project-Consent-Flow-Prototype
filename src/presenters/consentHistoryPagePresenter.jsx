import { ConsentHistoryPageView } from "../views/consentHistoryPageView";
import { useConsentStore } from "../stores/useConsentStore";

export function ConsentHistoryPage(){
    const actions = useConsentStore((state => state.consentActions));

    return (
        <ConsentHistoryPageView
        actions={actions}
        />
    );
}