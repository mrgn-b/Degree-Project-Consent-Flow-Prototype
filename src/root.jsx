import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MainPage } from "./presenters/mainPagePresenter";
import { ServicePage } from "./presenters/servicePagePresenter";
import { ConsentDashboard } from "./presenters/consentDashboardPresenter";
import { ConsentHistoryPage } from "./presenters/consentHistoryPagePresenter";
import { DataRequestsPage } from "./presenters/dataRequestsPagePresenter";

export function Root(props){
    return (
        <Router basename="/Degree-Project-Consent-Flow-Prototype/">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white w-full p-4 flex justify-center gap-4">
                <Link className="hover:underline" to="/">Main Page</Link>
                <Link className="hover:underline" to="/services">Services</Link>
                <Link className="hover:underline" to="/data-offers">Data Offers</Link>
                <Link className="hover:underline" to="/consent-dashboard">Consent Dashboard</Link>
                <Link className="hover:underline" to="/consent-history">Consent History</Link>
            </nav>

            {/* Page routes */}
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/services" element={<ServicePage model={props.model}/>} />
                <Route path="/consent-dashboard" element={<ConsentDashboard />} />
                <Route path="/consent-history" element={<ConsentHistoryPage />} />
                <Route path="/data-offers" element={<DataRequestsPage />} />
            </Routes>
        </Router>
    );
}