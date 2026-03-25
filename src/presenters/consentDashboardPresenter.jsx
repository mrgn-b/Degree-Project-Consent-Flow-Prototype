import { ConsentDashboardView } from "../views/consentDashboardView";
import { useConsentStore } from "../stores/useConsentStore";

export function ConsentDashboard(){
    const consents = useConsentStore((state) => state.consents);
    const changeConsentStatus = useConsentStore((state) => state.toggleStatus);
    const getActiveConsentCount = useConsentStore((state) => state.getActiveCount);
    const getInactiveConsentCount = useConsentStore((state) => state.getInactiveCount);
    const getExpiredConsentCount = useConsentStore((state) => state.getExpiredCount);

    return (
       <ConsentDashboardView
       consents={consents}
       changeConsentStatus={changeConsentStatus}
       activeConsentCount={getActiveConsentCount()}
       inactiveConsentCount={getInactiveConsentCount()}
       expiredConsentCount={getExpiredConsentCount()}
       /> 
    );
}