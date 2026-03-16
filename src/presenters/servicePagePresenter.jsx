import { ServicePageView } from "../views/servicePageView";

export function ServicePage(props){
    return (
        <ServicePageView providers={props.model.serviceProviders} />
    );
}