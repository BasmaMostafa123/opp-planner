import { Routes, Route, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import Home from './screens/Home.jsx'
import OpportunityDetail from './screens/OpportunityDetail.jsx'
import AddOpportunity from './screens/AddOpportunity.jsx'
import Tracker from './screens/Tracker.jsx'
import Settings from './screens/Settings.jsx'
import Login from './screens/Login.jsx'

export default function App() {
  return (
    <div className="screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<><Home /><BottomNav /></>} />
        <Route path="/opportunity/:id" element={<OpportunityDetail />} />
        <Route path="/add" element={<><AddOpportunity /><BottomNav /></>} />
        <Route path="/tracker" element={<><Tracker /><BottomNav /></>} />
        <Route path="/settings" element={<><Settings /><BottomNav /></>} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
