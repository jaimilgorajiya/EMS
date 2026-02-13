import { Search } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeamManagement() {
  const teamMembers = [
    {
      id: 'EMP003',
      name: 'Emily Rodriguez',
      position: 'Senior Software Engineer',
      email: 'emily.rodriguez@company.com',
      phone: '+1 234 567 8902',
      status: 'Active',
      attendance: 99.1,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    {
      id: 'EMP006',
      name: 'David Brown',
      position: 'Software Engineer',
      email: 'david.brown@company.com',
      phone: '+1 234 567 8905',
      status: 'Active',
      attendance: 98.0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
    },
    {
      id: 'EMP005',
      name: 'Sophia Lee',
      position: 'Marketing Specialist',
      email: 'sophia.lee@company.com',
      phone: '+1 234 567 8904',
      status: 'Active',
      attendance: 97.5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia'
    },
  ];

  const attendanceData = [
    { month: 'Jan', rate: 96 },
    { month: 'Feb', rate: 97 },
    { month: 'Mar', rate: 98 },
    { month: 'Apr', rate: 96.5 },
    { month: 'May', rate: 97.5 },
    { month: 'Jun', rate: 98.2 },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Manager', path: '/manager' }, { label: 'Team Management' }]} />
      
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Team Management</h1>
        <p className="text-gray-600 mt-1">Manage and monitor your team members</p>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search team members..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Card>

      {/* Team Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[90, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Total Members</span>
                <span className="font-semibold text-gray-900">10</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Active Today</span>
                <span className="font-semibold text-green-600">9</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">On Leave</span>
                <span className="font-semibold text-yellow-600">1</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Avg. Attendance</span>
                <span className="font-semibold text-blue-600">97.8%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Task Completion</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Average Rating</span>
                <span className="text-sm font-medium">4.5/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <div className="flex flex-col items-center text-center">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{member.position}</p>
              <Badge variant="success" className="mb-4">{member.status}</Badge>
              
              <div className="w-full space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-medium">{member.id}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Attendance:</span>
                  <span className="font-medium text-green-600">{member.attendance}%</span>
                </div>
              </div>
              
              <div className="w-full pt-4 border-t border-gray-200 space-y-2">
                <Button variant="secondary" className="w-full" size="sm">View Profile</Button>
                <Button variant="ghost" className="w-full" size="sm">Send Message</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
