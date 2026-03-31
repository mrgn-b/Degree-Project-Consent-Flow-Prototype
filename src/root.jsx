import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MainPage } from "./presenters/mainPagePresenter";
import { ServicePage } from "./presenters/servicePagePresenter";
import { ConsentDashboard } from "./presenters/consentDashboardPresenter";

export function Root(props){
    return (
        <Router>
            {/* Navbar */}
            <nav className="bg-blue-600 text-white w-full p-4 flex justify-center gap-4">
                <Link className="hover:underline" to="/">Main Page</Link>
                <Link className="hover:underline" to="/services">Services</Link>
                <Link className="hover:underline" to="/data-requests">Data Requests</Link>
                <Link className="hover:underline" to="/consent-dashboard">Consent Dashboard</Link>
                <Link className="hover:underline" to="/consent-history">Consent History</Link>
            </nav>

            {/* Page routes */}
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/services" element={<ServicePage model={props.model}/>} />
                <Route path="/consent-dashboard" element={<ConsentDashboard />} />
                {/* TODO: Add dashboard and audit pages */}
            </Routes>
        </Router>
    );
}