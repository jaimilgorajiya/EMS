import { useState } from 'react';
import { Calendar as CalendarIcon, Filter, Download, Clock } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Select from '../../components/Select';

export default function AttendanceManagement() {
  const [selectedMonth, setSelectedMonth] = useState('2026-02');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const attendanceData = [
    {
      id: 'EMP003',
      name: 'Emily Rodriguez',
      department: 'Engineering',
      present: 18,
      absent: 1,
      wfh: 3,
      late: 2,
      rate: '95.5%',
      status: 'Good'
    },
    {
      id: 'EMP005',
      name: 'Sophia Lee',
      department: 'Marketing',
      present: 19,
      absent: 0,
      wfh: 2,
      late: 1,
      rate: '100%',
      status: 'Excellent'
    },
    {
      id: 'EMP006',
      name: 'David Brown',
      department: 'Engineering',
      present: 17,
      absent: 2,
      wfh: 3,
      late: 3,
      rate: '89.5%',
      status: 'Average'
    },
    {
      id: 'EMP007',
      name: 'Olivia Martinez',
      department: 'HR',
      present: 20,
      absent: 0,
      wfh: 1,
      late: 0,
      rate: '100%',
      status: 'Excellent'
    },
    {
      id: 'EMP008',
      name: 'Robert Taylor',
      department: 'Sales',
      present: 14,
      absent: 5,
      wfh: 2,
      late: 4,
      rate: '73.7%',
      status: 'Poor'
    },
  ];

  const correctionRequests = [
    {
      id: 'CR001',
      employee: 'Emily Rodriguez',
      date: '2026-02-10',
      type: 'Missed Clock-In',
      reason: 'System error',
      status: 'Pending'
    },
    {
      id: 'CR002',
      employee: 'David Brown',
      date: '2026-02-11',
      type: 'Missed Clock-Out',
      reason: 'Forgot to punch out',
      status: 'Pending'
    },
    {
      id: 'CR003',
      employee: 'Robert Taylor',
      date: '2026-02-09',
      type: 'Late Arrival',
      reason: 'Traffic jam',
      status: 'Approved'
    },
  ];

  const columns = [
    {
      key: 'name',
      label: 'Employee',
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{row.id}</p>
        </div>
      )
    },
    {
      key: 'department',
      label: 'Department'
    },
    {
      key: 'present',
      label: 'Present',
      render: (value: number) => (
        <span className="font-medium text-green-600">{value}</span>
      )
    },
    {
      key: 'wfh',
      label: 'WFH',
      render: (value: number) => (
        <span className="font-medium text-blue-600">{value}</span>
      )
    },
    {
      key: 'absent',
      label: 'Absent',
      render: (value: number) => (
        <span className="font-medium text-red-600">{value}</span>
      )
    },
    {
      key: 'late',
      label: 'Late',
      render: (value: number) => (
        <span className="font-medium text-yellow-600">{value}</span>
      )
    },
    {
      key: 'rate',
      label: 'Attendance Rate'
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge
          variant={
            value === 'Excellent'
              ? 'success'
              : value === 'Good'
              ? 'info'
              : value === 'Average'
              ? 'warning'
              : 'danger'
          }
        >
          {value}
        </Badge>
      )
    }
  ];

  const correctionColumns = [
    { key: 'id', label: 'Request ID' },
    { key: 'employee', label: 'Employee' },
    { key: 'date', label: 'Date' },
    { key: 'type', label: 'Type' },
    { key: 'reason', label: 'Reason' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Approved' ? 'success' : value === 'Pending' ? 'warning' : 'danger'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        row.status === 'Pending' && (
          <div className="flex gap-2">
            <Button variant="success" size="sm">Approve</Button>
            <Button variant="danger" size="sm">Reject</Button>
          </div>
        )
      )
    }
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Admin', path: '/admin' }, { label: 'Attendance Management' }]} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600 mt-1">Track and manage employee attendance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Calendar View
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Present Today</p>
              <p className="text-2xl font-semibold text-gray-900">142</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Absent Today</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">WFH Today</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Late Arrivals</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex gap-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
          </select>
        </div>
      </Card>

      {/* Attendance Table */}
      <Card padding={false} className="mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Attendance Summary</h3>
        </div>
        <Table columns={columns} data={attendanceData} />
      </Card>

      {/* Correction Requests */}
      <Card padding={false}>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Attendance Correction Requests</h3>
        </div>
        <Table columns={correctionColumns} data={correctionRequests} />
      </Card>
    </div>
  );
}
