import { Users, UserCheck, Building2, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Breadcrumb from '../../components/Breadcrumb';
import { 
  mockAttendance, 
  mockPayroll, 
  mockLeaveStats, 
  mockRecentActivities, 
  mockSystemAlerts 
} from '../../data/mockData';

export default function AdminDashboard() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Admin' }, { label: 'Dashboard' }]} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="Total Employees"
          value="162"
          icon={Users}
          change="+8 this month"
          changeType="positive"
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Total Managers"
          value="12"
          icon={UserCheck}
          change="No change"
          changeType="neutral"
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
        <StatCard
          title="Departments"
          value="8"
          icon={Building2}
          change="+1 this quarter"
          changeType="positive"
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          title="Pending Requests"
          value="15"
          icon={Clock}
          change="5 urgent"
          changeType="warning"
          iconColor="text-orange-600"
          iconBg="bg-orange-100"
        />
        <StatCard
          title="Monthly Payroll"
          value="$518K"
          icon={DollarSign}
          change="+2.3% from last month"
          changeType="positive"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Attendance Trends */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2} name="Present" />
              <Line type="monotone" dataKey="wfh" stroke="#3b82f6" strokeWidth={2} name="WFH" />
              <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} name="Absent" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* System Alerts */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {mockSystemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${
                  alert.type === 'error'
                    ? 'bg-red-50 border-red-200'
                    : alert.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Payroll Summary */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Summary (Last 7 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockPayroll}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Leave Statistics */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockLeaveStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, count }) => `${name}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {mockLeaveStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="space-y-4">
          {mockRecentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
              <div
                className={`p-2 rounded-lg ${
                  activity.type === 'leave'
                    ? 'bg-orange-100'
                    : activity.type === 'approval'
                    ? 'bg-green-100'
                    : activity.type === 'attendance'
                    ? 'bg-blue-100'
                    : activity.type === 'task'
                    ? 'bg-purple-100'
                    : 'bg-gray-100'
                }`}
              >
                {activity.type === 'leave' && <Clock className="w-5 h-5 text-orange-600" />}
                {activity.type === 'approval' && <UserCheck className="w-5 h-5 text-green-600" />}
                {activity.type === 'attendance' && <Clock className="w-5 h-5 text-blue-600" />}
                {activity.type === 'task' && <Clock className="w-5 h-5 text-purple-600" />}
                {activity.type === 'user' && <Users className="w-5 h-5 text-gray-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
