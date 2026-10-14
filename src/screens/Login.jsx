export default function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-navy-900">
      {/* Logo area */}
      <div className="mb-10 flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand to-teal-600
                        flex items-center justify-center shadow-lg shadow-brand/30">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
            <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
            <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">OppPlanner</h1>
          <p className="text-slate-400 text-sm mt-1">Your personal opportunity tracker</p>
        </div>
      </div>

      {/* Login card */}
      <div className="w-full max-w-sm card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white text-center">Sign in</h2>

        <div className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-3
                         text-white placeholder-slate-500 text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent
                         transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-navy-900 border border-navy-700 rounded-xl px-4 py-3
                         text-white placeholder-slate-500 text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent
                         transition-all"
            />
          </div>
        </div>

        <button
          type="button"
          className="btn-primary w-full mt-2"
          disabled
        >
          Sign in — coming in Task 2
        </button>

        <p className="text-center text-xs text-slate-500 pt-1">
          Single-user app. Sign-ups are disabled.
        </p>
      </div>
    </main>
  )
}
