export const metadata = {
  title: 'Dashboard',
  description: 'Track your financial literacy progress with CoinCoach dashboard',
}

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container bg-gray-50 min-h-screen">
      {children}
    </div>
  )
}