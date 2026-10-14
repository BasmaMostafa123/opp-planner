export default function Home() {
  return (
    <main className="flex-1 flex flex-col pb-20 px-4 pt-6">
      {/* Header */}
      <header className="mb-6">
        <p className="text-sm text-brand font-semibold tracking-widest uppercase mb-1">Welcome back</p>
        <h1 className="text-2xl font-bold text-white">Your Feed</h1>
        <p className="text-slate-400 text-sm mt-1">Opportunities waiting for you</p>
      </header>

      {/* Placeholder empty state */}
      <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-4">
        <div className="w-20 h-20 rounded-3xl bg-navy-800 border border-navy-700
                        flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
               className="w-10 h-10 text-brand">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">No opportunities yet</h2>
          <p className="text-slate-400 text-sm max-w-xs">
            Tap the <span className="text-brand font-medium">+</span> button below to add your first opportunity.
          </p>
        </div>
      </div>
    </main>
  )
}
