import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MainPage } from "./presenters/mainPagePresenter";
import { ServicePage } from "./presenters/servicePagePresenter";

export function Root(props){
    return (
        <Router>
            {/* Navbar */}
            <nav className="bg-blue-600 text-white w-full p-4 flex justify-center gap-4">
                <Link className="hover:underline" to="/">Main Page</Link>
                <Link className="hover:underline" to="/services">Services</Link>
                <Link className="hover:underline" to="/consent-dashboard">Consent Dashboard</Link>
                <Link className="hover:underline" to="/audit-log">Audit Log</Link>
            </nav>

            {/* Page routes */}
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/services" element={<ServicePage model={props.model}/>} />
                {/* TODO: Add dashboard and audit pages */}
            </Routes>
        </Router>
    );
}