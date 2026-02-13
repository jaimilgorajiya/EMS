import { Clock, Calendar, ListTodo, DollarSign, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';

export default function EmployeeDashboard() {
  const leaveBalance = [
    { name: 'Used', value: 7, color: '#ef4444' },
    { name: 'Remaining', value: 13, color: '#10b981' },
  ];

  const myTasks = [
    { id: 1, title: 'Update employee database', priority: 'High', dueDate: '2026-02-15', status: 'In Progress' },
    { id: 2, title: 'Prepare team meeting notes', priority: 'Medium', dueDate: '2026-02-14', status: 'To Do' },
    { id: 3, title: 'Review code changes', priority: 'High', dueDate: '2026-02-16', status: 'In Progress' },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Employee' }, { label: 'Dashboard' }]} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your overview</p>
      </div>

      {/* Today's Status */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Today's Status</h2>
            <p className="text-gray-700 mb-4">Friday, February 13, 2026</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-600">Clock In</p>
                <p className="text-lg font-semibold text-gray-900">09:05 AM</p>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <p className="text-sm text-gray-600">Working Hours</p>
                <p className="text-lg font-semibold text-green-600">5h 28m</p>
              </div>
            </div>
          </div>
          <Button size="lg">
            <Clock className="w-5 h-5 mr-2" />
            Clock Out
          </Button>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Leave Balance"
          value="13 days"
          icon={Calendar}
          change="7 used this year"
          changeType="neutral"
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          title="Active Tasks"
          value="5"
          icon={ListTodo}
          change="2 due this week"
          changeType="warning"
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          title="This Month Salary"
          value="$6,500"
          icon={DollarSign}
          change="Next payout: Feb 28"
          changeType="neutral"
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
        <StatCard
          title="Attendance Rate"
          value="99.1%"
          icon={TrendingUp}
          change="Excellent"
          changeType="positive"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Leave Balance Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Balance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={leaveBalance}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {leaveBalance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {leaveBalance.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="secondary" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Apply for Leave
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Clock className="w-4 h-4 mr-2" />
              Request WFH
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Clock className="w-4 h-4 mr-2" />
              Missed Punch Correction
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              View Payslip
            </Button>
          </div>
        </Card>

        {/* Attendance Summary */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Present Days</span>
              <span className="text-lg font-semibold text-green-600">9</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">WFH Days</span>
              <span className="text-lg font-semibold text-blue-600">1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Absent Days</span>
              <span className="text-lg font-semibold text-red-600">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Late Arrivals</span>
              <span className="text-lg font-semibold text-yellow-600">1</span>
            </div>
          </div>
        </Card>
      </div>

      {/* My Tasks */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">My Tasks</h3>
          <Button variant="ghost">View All</Button>
        </div>
        <div className="space-y-3">
          {myTasks.map((task) => (
            <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <Badge variant={task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'info'}>
                  {task.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Due: {task.dueDate}</span>
                <Badge variant={task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'info' : 'default'}>
                  {task.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
