import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Calendar, 
  Clock, 
  DollarSign, 
  ListTodo, 
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  ClipboardCheck,
  BarChart3,
  FileText,
  UserCircle
} from 'lucide-react';

interface MenuItem {
  path: string;
  label: string;
  icon: any;
}

interface SidebarProps {
  role: 'admin' | 'manager' | 'employee';
}

const menuItems = {
  admin: [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/departments', label: 'Departments', icon: Building2 },
    { path: '/admin/attendance', label: 'Attendance', icon: Clock },
    { path: '/admin/leave', label: 'Leave & WFH', icon: Calendar },
    { path: '/admin/payroll', label: 'Payroll', icon: DollarSign },
    { path: '/admin/tasks', label: 'Tasks & Performance', icon: ListTodo },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ],
  manager: [
    { path: '/manager', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/manager/team', label: 'Team Management', icon: Users },
    { path: '/manager/approvals', label: 'Approvals', icon: ClipboardCheck },
    { path: '/manager/tasks', label: 'Task Assignment', icon: ListTodo },
    { path: '/manager/performance', label: 'Performance Review', icon: BarChart3 },
  ],
  employee: [
    { path: '/employee', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/employee/attendance', label: 'Attendance', icon: Clock },
    { path: '/employee/missed-punch', label: 'Missed Punch', icon: UserCheck },
    { path: '/employee/leave', label: 'Leave & WFH', icon: Calendar },
    { path: '/employee/payroll', label: 'Payroll', icon: DollarSign },
    { path: '/employee/tasks', label: 'My Tasks', icon: ListTodo },
    { path: '/employee/profile', label: 'Profile', icon: UserCircle },
  ],
};

export default function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const items = menuItems[role];

  return (
    <aside 
      className={`bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!collapsed && (
            <div>
              <span className="text-xl font-semibold text-blue-600">EMS</span>
              <p className="text-xs text-gray-500 capitalize">{role} Portal</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
