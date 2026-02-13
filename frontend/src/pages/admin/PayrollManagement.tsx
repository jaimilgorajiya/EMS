import { useState } from 'react';
import { Download, DollarSign, Calendar, FileText } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Badge from '../../components/Badge';

export default function PayrollManagement() {
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showPayslipModal, setShowPayslipModal] = useState(false);

  const payrollData = [
    {
      id: 'EMP003',
      name: 'Emily Rodriguez',
      department: 'Engineering',
      baseSalary: '$78,000',
      bonus: '$2,000',
      deductions: '$850',
      netPay: '$79,150',
      status: 'Processed'
    },
    {
      id: 'EMP005',
      name: 'Sophia Lee',
      department: 'Marketing',
      baseSalary: '$62,000',
      bonus: '$1,500',
      deductions: '$680',
      netPay: '$62,820',
      status: 'Processed'
    },
    {
      id: 'EMP006',
      name: 'David Brown',
      department: 'Engineering',
      baseSalary: '$72,000',
      bonus: '$1,800',
      deductions: '$780',
      netPay: '$73,020',
      status: 'Pending'
    },
    {
      id: 'EMP007',
      name: 'Olivia Martinez',
      department: 'HR',
      baseSalary: '$58,000',
      bonus: '$1,200',
      deductions: '$620',
      netPay: '$58,580',
      status: 'Processed'
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
      key: 'baseSalary',
      label: 'Base Salary'
    },
    {
      key: 'bonus',
      label: 'Bonus'
    },
    {
      key: 'deductions',
      label: 'Deductions',
      render: (value: string) => (
        <span className="text-red-600">{value}</span>
      )
    },
    {
      key: 'netPay',
      label: 'Net Pay',
      render: (value: string) => (
        <span className="font-semibold text-green-600">{value}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Processed' ? 'success' : 'warning'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <Button variant="ghost" size="sm" onClick={() => setShowPayslipModal(true)}>
          <FileText className="w-4 h-4 mr-1" />
          Payslip
        </Button>
      )
    }
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Admin', path: '/admin' }, { label: 'Payroll Management' }]} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600 mt-1">Manage employee compensation and payroll</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowProcessModal(true)}>
            <DollarSign className="w-4 h-4 mr-2" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Payroll</p>
              <p className="text-2xl font-semibold text-gray-900">$518,000</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Processed</p>
              <p className="text-2xl font-semibold text-green-600">145</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-semibold text-yellow-600">17</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Next Run</p>
              <p className="text-lg font-semibold text-gray-900">Feb 28</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Payroll Table */}
      <Card padding={false}>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">February 2026 Payroll</h3>
        </div>
        <Table columns={columns} data={payrollData} />
      </Card>

      {/* Process Payroll Modal */}
      <Modal
        isOpen={showProcessModal}
        onClose={() => setShowProcessModal(false)}
        title="Process Payroll"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowProcessModal(false)}>
              Cancel
            </Button>
            <Button>Process Payroll</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Payroll Month" type="month" defaultValue="2026-02" />
          <Select
            label="Department"
            options={[
              { value: 'all', label: 'All Departments' },
              { value: 'Engineering', label: 'Engineering' },
              { value: 'Marketing', label: 'Marketing' },
              { value: 'Sales', label: 'Sales' },
              { value: 'HR', label: 'HR' },
            ]}
          />
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900 font-medium mb-2">Payroll Summary</p>
            <div className="space-y-1 text-sm text-blue-800">
              <div className="flex justify-between">
                <span>Total Employees:</span>
                <span className="font-medium">162</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-medium">$518,000</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Date:</span>
                <span className="font-medium">Feb 28, 2026</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Processing payroll will generate payslips for all employees and mark them as processed.
          </p>
        </div>
      </Modal>

      {/* Payslip Preview Modal */}
      <Modal
        isOpen={showPayslipModal}
        onClose={() => setShowPayslipModal(false)}
        title="Payslip Preview"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowPayslipModal(false)}>
              Close
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold text-gray-900">Company Name</h3>
            <p className="text-sm text-gray-600">Payslip for February 2026</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Employee Name</p>
              <p className="font-medium text-gray-900">Emily Rodriguez</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Employee ID</p>
              <p className="font-medium text-gray-900">EMP003</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Department</p>
              <p className="font-medium text-gray-900">Engineering</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Position</p>
              <p className="font-medium text-gray-900">Senior Software Engineer</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Earnings</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Salary</span>
                <span className="font-medium">$6,500.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bonus</span>
                <span className="font-medium">$2,000.00</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-medium text-gray-900">Total Earnings</span>
                <span className="font-semibold text-gray-900">$8,500.00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Deductions</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-red-600">$650.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance</span>
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
              <span className="text-lg font-semibold text-gray-900">Net Pay</span>
              <span className="text-2xl font-bold text-green-600">$7,650.00</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
