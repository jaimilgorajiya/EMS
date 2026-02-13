import { useState } from 'react';
import { useParams } from 'react-router';
import { Mail, Phone, Calendar, Briefcase, DollarSign, MapPin, Edit } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { mockEmployees } from '../../data/mockData';

export default function EmployeeProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find employee by ID
  const employee = mockEmployees.find(emp => emp.id === id) || mockEmployees[2];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'job', label: 'Job Details' },
    { id: 'documents', label: 'Documents' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'payroll', label: 'Payroll' },
  ];

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Admin', path: '/admin' },
          { label: 'Users', path: '/admin/users' },
          { label: employee.name }
        ]} 
      />

      {/* Profile Header */}
      <Card className="mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-semibold text-gray-900">{employee.name}</h1>
                <Badge variant={employee.status === 'Active' ? 'success' : 'warning'}>
                  {employee.status}
                </Badge>
              </div>
              <p className="text-gray-600 mb-3">{employee.position}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {employee.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  {employee.department}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Joined {employee.dateJoined}
                </div>
              </div>
            </div>
          </div>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Employee ID</p>
                <p className="font-medium text-gray-900">{employee.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Role</p>
                <Badge variant={employee.role === 'Admin' ? 'info' : employee.role === 'Manager' ? 'warning' : 'default'}>
                  {employee.role}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Department</p>
                <p className="font-medium text-gray-900">{employee.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Reporting To</p>
                <p className="font-medium text-gray-900">{employee.reportingTo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Date Joined</p>
                <p className="font-medium text-gray-900">{employee.dateJoined}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Last Login</p>
                <p className="font-medium text-gray-900">{employee.lastLogin}</p>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Attendance Rate</span>
                    <span className="font-medium text-gray-900">{employee.attendanceRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${employee.attendanceRate}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Leave Balance</p>
                  <p className="text-2xl font-semibold text-gray-900">{employee.leaveBalance} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Salary</p>
                  <p className="text-2xl font-semibold text-gray-900">{employee.salary}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'job' && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Position</p>
              <p className="font-medium text-gray-900">{employee.position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Department</p>
              <p className="font-medium text-gray-900">{employee.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Manager</p>
              <p className="font-medium text-gray-900">{employee.reportingTo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Employment Type</p>
              <p className="font-medium text-gray-900">Full-time</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Work Location</p>
              <p className="font-medium text-gray-900">Office / Hybrid</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Date Joined</p>
              <p className="font-medium text-gray-900">{employee.dateJoined}</p>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'documents' && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
            <Button size="sm">Upload Document</Button>
          </div>
          <div className="space-y-3">
            {['Resume.pdf', 'Offer_Letter.pdf', 'ID_Proof.pdf', 'Address_Proof.pdf'].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">{doc}</span>
                </div>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'attendance' && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Summary</h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Present Days</p>
              <p className="text-2xl font-semibold text-green-600">142</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">WFH Days</p>
              <p className="text-2xl font-semibold text-blue-600">18</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Absent Days</p>
              <p className="text-2xl font-semibold text-red-600">3</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Late Arrivals</p>
              <p className="text-2xl font-semibold text-yellow-600">7</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Detailed attendance records and calendar view would be displayed here.</p>
        </Card>
      )}

      {activeTab === 'payroll' && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Information</h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Annual Salary</p>
              <p className="text-2xl font-semibold text-gray-900">{employee.salary}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Gross</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${(parseInt(employee.salary.replace(/\$|,/g, '')) / 12).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Detailed payroll history and payslips would be displayed here.</p>
        </Card>
      )}
    </div>
  );
}
