export default function AddOpportunity() {
  return (
    <main className="flex-1 flex flex-col pb-20 px-4 pt-6">
      <header className="mb-6">
        <p className="text-sm text-brand font-semibold tracking-widest uppercase mb-1">New</p>
        <h1 className="text-2xl font-bold text-white">Add Opportunity</h1>
        <p className="text-slate-400 text-sm mt-1">Fill in the details below</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-3">
        <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-navy-700
                        flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
               className="w-8 h-8 text-brand">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-slate-400 text-sm">Add form coming in Task 4</p>
      </div>
    </main>
  )
}
