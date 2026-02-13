import { useState } from 'react';
import { Clock, Download, Calendar as CalendarIcon } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';

export default function EmployeeAttendance() {
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [workingTime, setWorkingTime] = useState('5h 28m');

  const monthlyAttendance = [
    { date: '2026-02-01', status: 'Present', clockIn: '09:00 AM', clockOut: '05:30 PM', hours: '8h 30m' },
    { date: '2026-02-02', status: 'Present', clockIn: '09:05 AM', clockOut: '05:25 PM', hours: '8h 20m' },
    { date: '2026-02-03', status: 'Present', clockIn: '09:10 AM', clockOut: '05:35 PM', hours: '8h 25m' },
    { date: '2026-02-04', status: 'WFH', clockIn: '09:00 AM', clockOut: '05:30 PM', hours: '8h 30m' },
    { date: '2026-02-05', status: 'Present', clockIn: '09:02 AM', clockOut: '05:28 PM', hours: '8h 26m' },
    { date: '2026-02-06', status: 'Present', clockIn: '09:15 AM', clockOut: '05:40 PM', hours: '8h 25m' },
    { date: '2026-02-07', status: 'Present', clockIn: '09:00 AM', clockOut: '05:30 PM', hours: '8h 30m' },
    { date: '2026-02-10', status: 'Present', clockIn: '09:05 AM', clockOut: '05:32 PM', hours: '8h 27m' },
    { date: '2026-02-11', status: 'Present', clockIn: '09:08 AM', clockOut: '05:35 PM', hours: '8h 27m' },
    { date: '2026-02-12', status: 'Present', clockIn: '09:00 AM', clockOut: '05:30 PM', hours: '8h 30m' },
    { date: '2026-02-13', status: 'Present', clockIn: '09:05 AM', clockOut: '-', hours: workingTime },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Employee', path: '/employee' }, { label: 'Attendance' }]} />
      
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">My Attendance</h1>
        <p className="text-gray-600 mt-1">Track your daily attendance and working hours</p>
      </div>

      {/* Clock In/Out Card */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Today's Attendance</h2>
            <p className="text-gray-700 mb-4">Friday, February 13, 2026</p>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-600">Clock In Time</p>
                <p className="text-2xl font-semibold text-gray-900">09:05 AM</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-sm text-gray-600">Working Hours</p>
                <p className="text-2xl font-semibold text-green-600">{workingTime}</p>
              </div>
            </div>
          </div>
          <Button
            size="lg"
            variant={isClockedIn ? 'danger' : 'success'}
            onClick={() => setIsClockedIn(!isClockedIn)}
          >
            <Clock className="w-5 h-5 mr-2" />
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </Button>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Present Days</p>
              <p className="text-2xl font-semibold text-green-600">9</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">WFH Days</p>
              <p className="text-2xl font-semibold text-blue-600">1</p>
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
              <p className="text-2xl font-semibold text-yellow-600">1</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Attendance Rate</p>
              <p className="text-2xl font-semibold text-purple-600">99.1%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly Attendance */}
      <Card padding={false}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Attendance Record</h3>
          <div className="flex gap-3">
            <input
              type="month"
              defaultValue="2026-02"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Clock In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Clock Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Working Hours</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyAttendance.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge
                      variant={
                        record.status === 'Present'
                          ? 'success'
                          : record.status === 'WFH'
                          ? 'info'
                          : record.status === 'Absent'
                          ? 'danger'
                          : 'default'
                      }
                    >
                      {record.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.clockIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.clockOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
