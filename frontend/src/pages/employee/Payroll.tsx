import { Download, FileText, Calendar } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';

export default function EmployeePayroll() {
  const payslips = [
    { month: 'January 2026', gross: '$8,500', deductions: '$850', net: '$7,650', status: 'Paid' },
    { month: 'December 2025', gross: '$8,200', deductions: '$820', net: '$7,380', status: 'Paid' },
    { month: 'November 2025', gross: '$8,500', deductions: '$850', net: '$7,650', status: 'Paid' },
    { month: 'October 2025', gross: '$8,500', deductions: '$850', net: '$7,650', status: 'Paid' },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Employee', path: '/employee' }, { label: 'Payroll' }]} />
      
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">My Payroll</h1>
        <p className="text-gray-600 mt-1">View your salary and payslips</p>
      </div>

      {/* Current Month */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Current Month Salary</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">$6,500</h2>
            <p className="text-gray-700">Next payout on <strong>February 28, 2026</strong></p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Working Days</p>
            <p className="text-2xl font-semibold text-gray-900">10 / 20</p>
            <p className="text-sm text-gray-600 mt-2">YTD Earnings: $13,150</p>
          </div>
        </div>
      </Card>

      {/* Salary Breakdown */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Breakdown (Monthly)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Earnings</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Base Salary</span>
                <span className="font-medium text-gray-900">$6,500.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">HRA (House Rent Allowance)</span>
                <span className="font-medium text-gray-900">$1,500.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transport Allowance</span>
                <span className="font-medium text-gray-900">$500.00</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-medium text-gray-900">Gross Salary</span>
                <span className="font-semibold text-gray-900">$8,500.00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Deductions</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Income Tax</span>
                <span className="font-medium text-red-600">$650.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Health Insurance</span>
                <span className="font-medium text-red-600">$200.00</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-medium text-gray-900">Total Deductions</span>
                <span className="font-semibold text-red-600">$850.00</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Net Salary</span>
              <span className="text-2xl font-bold text-green-600">$7,650.00</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Payslip History */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Payslip History</h3>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>
        </div>
        <div className="space-y-3">
          {payslips.map((slip, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{slip.month}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>Gross: {slip.gross}</span>
                    <span>•</span>
                    <span>Deductions: {slip.deductions}</span>
                    <span>•</span>
                    <span className="font-medium text-green-600">Net: {slip.net}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success">{slip.status}</Badge>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
