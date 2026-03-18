import { ServicePageView } from "../views/servicePageView";
import { useServiceProviderStore } from "../stores/useServiceProviderStore";

export function ServicePage(props){
    const providers = useServiceProviderStore((state) => state.providers);
    const changeServiceStatus = useServiceProviderStore((state) => state.toggleStatus);
    return (
        <ServicePageView
        providers={providers}
        changeServiceStatus={changeServiceStatus}/>
    );
}