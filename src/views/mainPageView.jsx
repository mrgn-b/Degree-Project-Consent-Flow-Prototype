export function MainPageView() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100">
      <h1 className="mb-12 text-5xl font-bold tracking-tight text-gray-800">
        Consent Flow
      </h1>

      <div className="flex flex-col gap-4 w-64">
        <button className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition hover:bg-gray-100 hover:shadow-lg">
          Available Services
        </button>

        <button className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition hover:bg-gray-100 hover:shadow-lg">
          Consent Dashboard
        </button>

        <button className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition hover:bg-gray-100 hover:shadow-lg">
          Audit Log
        </button>
      </div>
    </div>
  );
}