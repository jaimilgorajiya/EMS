import { Outlet, useLocation } from 'react-router';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Root() {
  const location = useLocation();
  
  // Determine role based on current path
  const getRole = () => {
    if (location.pathname.startsWith('/manager')) return 'manager';
    if (location.pathname.startsWith('/employee')) return 'employee';
    return 'admin';
  };

  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={getRole()} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
