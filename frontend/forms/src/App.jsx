import { Routes, Route } from "react-router-dom";

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-blue-600">NextStep Road</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Clear next steps for unexpected transportation issues.
        </h1>

        <p className="mt-4 text-lg leading-7 text-slate-600">
          Choose what happened, document key details, and get a calm,
          safety-first plan for what to do next.
        </p>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          If anyone is injured, in immediate danger, or needs emergency help,
          call 911 or your local emergency number first.
        </div>

        <button
          type="button"
          className="mt-8 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Start a plan
        </button>
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-slate-600">
          This NextStep Road page does not exist yet.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
