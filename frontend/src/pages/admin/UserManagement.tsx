import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Ban, Trash2 } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { mockEmployees } from '../../data/mockData';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredEmployees = mockEmployees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || emp.role === filterRole;
    const matchesDept = filterDepartment === 'all' || emp.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
    return matchesSearch && matchesRole && matchesDept && matchesStatus;
  });

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={value} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (value: string) => (
        <Badge variant={value === 'Admin' ? 'info' : value === 'Manager' ? 'warning' : 'default'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'department',
      label: 'Department'
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'success' : 'warning'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'lastLogin',
      label: 'Last Login'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-blue-50 rounded text-blue-600" title="View">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600" title="Edit">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-yellow-50 rounded text-yellow-600" title="Block">
            <Ban className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-red-50 rounded text-red-600" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Admin', path: '/admin' }, { label: 'User Management' }]} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage all employees and their permissions</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
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
            <option value="IT">IT</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </Card>

      <Card padding={false}>
        <Table columns={columns} data={filteredEmployees} />
        
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredEmployees.length)} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} results
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" disabled={currentPage === 1}>
              Previous
            </Button>
            <Button variant="secondary" size="sm" disabled={currentPage * itemsPerPage >= filteredEmployees.length}>
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button>Save User</Button>
          </>
        }
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" placeholder="John" />
              <Input label="Last Name" placeholder="Doe" />
              <Input label="Email" type="email" placeholder="john.doe@company.com" className="col-span-2" />
              <Input label="Phone" placeholder="+1 234 567 8900" />
              <Input label="Date of Birth" type="date" />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Job Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Employee ID" placeholder="EMP009" />
              <Input label="Position" placeholder="Software Engineer" />
              <Select
                label="Department"
                options={[
                  { value: '', label: 'Select Department' },
                  { value: 'Engineering', label: 'Engineering' },
                  { value: 'Marketing', label: 'Marketing' },
                  { value: 'Sales', label: 'Sales' },
                  { value: 'HR', label: 'HR' },
                ]}
              />
              <Input label="Date Joined" type="date" />
              <Input label="Salary" placeholder="$75,000" />
              <Select
                label="Reporting To"
                options={[
                  { value: '', label: 'Select Manager' },
                  { value: 'Michael Chen', label: 'Michael Chen' },
                  { value: 'James Williams', label: 'James Williams' },
                ]}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Role & Permissions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Role"
                options={[
                  { value: '', label: 'Select Role' },
                  { value: 'Admin', label: 'Admin' },
                  { value: 'Manager', label: 'Manager' },
                  { value: 'Employee', label: 'Employee' },
                ]}
              />
              <Select
                label="Status"
                options={[
                  { value: 'Active', label: 'Active' },
                  { value: 'Inactive', label: 'Inactive' },
                ]}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
