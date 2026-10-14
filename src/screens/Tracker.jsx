export default function Tracker() {
  return (
    <main className="flex-1 flex flex-col pb-20 px-4 pt-6">
      <header className="mb-6">
        <p className="text-sm text-brand font-semibold tracking-widest uppercase mb-1">Status</p>
        <h1 className="text-2xl font-bold text-white">Tracker</h1>
        <p className="text-slate-400 text-sm mt-1">All your applications in one place</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-3">
        <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-navy-700
                        flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
               className="w-8 h-8 text-brand">
            <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-slate-400 text-sm">Tracker with tabs coming in Task 5</p>
      </div>
    </main>
  )
}
