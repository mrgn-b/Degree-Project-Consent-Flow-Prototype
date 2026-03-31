import { useNavigate } from "react-router-dom";

export function MainPageView() {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100">
        <h1 className="mb-12 text-5xl font-bold tracking-tight text-gray-800">
            Consent Flow
        </h1>

        <div className="flex flex-col gap-4 w-64">
            <button 
            onClick={() => navigate("/services")}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition hover:bg-gray-100 hover:shadow-lg">
            Available Services
            </button>

            <button 
            onClick={() => navigate("/data-requests")}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition hover:bg-gray-100 hover:shadow-lg">
            Data Requests
            </button>

            <button 
            onClick={() => navigate("/consent-dashboard")}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition hover:bg-gray-100 hover:shadow-lg">
            Consent Dashboard
            </button>

            <button 
            onClick={() => navigate("/consent-history")}
            className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition hover:bg-gray-100 hover:shadow-lg">
            Consent History
            </button>
        </div>
        </div>
    );
}