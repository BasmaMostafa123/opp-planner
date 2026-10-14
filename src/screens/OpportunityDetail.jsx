import { useParams, useNavigate } from 'react-router-dom'

export default function OpportunityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center
                     rounded-xl bg-navy-800 border border-navy-700 text-slate-300
                     active:scale-95 transition-all"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-white truncate">Opportunity Detail</h1>
      </div>

      {/* Placeholder */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center gap-3">
        <p className="text-slate-400 text-sm">
          Detail view for opportunity <span className="text-brand font-mono">#{id}</span>
        </p>
        <p className="text-slate-500 text-xs">Coming in Task 3</p>
      </div>
    </main>
  )
}
