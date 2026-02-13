import { Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';

export default function ManagerDashboard() {
  const teamAttendance = [
    { name: 'Mon', present: 8, absent: 0, wfh: 2 },
    { name: 'Tue', present: 9, absent: 1, wfh: 0 },
    { name: 'Wed', present: 8, absent: 0, wfh: 2 },
    { name: 'Thu', present: 10, absent: 0, wfh: 0 },
    { name: 'Fri', present: 7, absent: 1, wfh: 2 },
  ];

  const pendingApprovals = [
    { id: 1, employee: 'Emily Rodriguez', type: 'Sick Leave', days: 3, priority: 'High' },
    { id: 2, employee: 'David Brown', type: 'WFH', days: 1, priority: 'Low' },
  ];

  const teamMembers = [
    { name: 'Emily Rodriguez', attendance: 98, tasks: 5, status: 'Active' },
    { name: 'David Brown', attendance: 95, tasks: 3, status: 'Active' },
    { name: 'Sophia Lee', attendance: 97, tasks: 4, status: 'Active' },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Manager' }, { label: 'Dashboard' }]} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your team and approvals</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Team Members"
          value="10"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Pending Approvals"
          value="5"
          icon={Clock}
          change="2 urgent"
          changeType="warning"
          iconColor="text-orange-600"
          iconBg="bg-orange-100"
        />
        <StatCard
          title="Tasks Assigned"
          value="24"
          icon={CheckCircle}
          change="8 in progress"
          changeType="positive"
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          title="Team Performance"
          value="96.5%"
          icon={TrendingUp}
          change="+2.3% this month"
          changeType="positive"
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Team Attendance */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Attendance (This Week)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#10b981" name="Present" radius={[8, 8, 0, 0]} />
              <Bar dataKey="wfh" fill="#3b82f6" name="WFH" radius={[8, 8, 0, 0]} />
              <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
            <Badge variant="warning">{pendingApprovals.length}</Badge>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{approval.employee}</p>
                    <p className="text-sm text-gray-600">{approval.type} - {approval.days} day(s)</p>
                  </div>
                  <Badge variant={approval.priority === 'High' ? 'danger' : 'info'}>
                    {approval.priority}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="success" size="sm" className="flex-1">Approve</Button>
                  <Button variant="danger" size="sm" className="flex-1">Reject</Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-3">View All Approvals</Button>
        </Card>
      </div>

      {/* Team Overview */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Overview</h3>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                  alt={member.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">Attendance: {member.attendance}% | Active Tasks: {member.tasks}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success">{member.status}</Badge>
                <Button variant="ghost" size="sm">View Profile</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
