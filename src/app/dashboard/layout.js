export const metadata = {
    title: 'Dashboard - CoinCoach',
    description: 'Manage your finances with CoinCoach dashboard',
  }
  
  export default function DashboardLayout({ children }) {
    return (
      <div className="dashboard-container">
        {children}
      </div>
    )
  }