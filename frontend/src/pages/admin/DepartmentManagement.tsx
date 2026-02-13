import { useState } from 'react';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import { mockDepartments } from '../../data/mockData';

export default function DepartmentManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div>
      <Breadcrumb items={[{ label: 'Admin', path: '/admin' }, { label: 'Department Management' }]} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Department Management</h1>
          <p className="text-gray-600 mt-1">Manage all departments and their structure</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDepartments.map((dept) => (
          <Card key={dept.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowEditModal(true)}
                  className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-red-50 rounded text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{dept.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Manager:</span>
                <span className="font-medium text-gray-900">{dept.manager}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Employees:</span>
                <Badge variant="info">{dept.employeeCount}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Budget:</span>
                <span className="font-medium text-gray-900">{dept.budget}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Department Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Department"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button>Create Department</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Department Name" placeholder="e.g., Finance" />
          <Textarea label="Description" placeholder="Brief description of the department" rows={3} />
          <Select
            label="Department Manager"
            options={[
              { value: '', label: 'Select Manager' },
              { value: 'Michael Chen', label: 'Michael Chen' },
              { value: 'James Williams', label: 'James Williams' },
              { value: 'Sarah Johnson', label: 'Sarah Johnson' },
            ]}
          />
          <Input label="Budget" placeholder="$500,000" />
        </div>
      </Modal>

      {/* Edit Department Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Department"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Department Name" placeholder="Engineering" defaultValue="Engineering" />
          <Textarea 
            label="Description" 
            placeholder="Brief description of the department" 
            rows={3}
            defaultValue="Software development and technical infrastructure"
          />
          <Select
            label="Department Manager"
            options={[
              { value: 'Michael Chen', label: 'Michael Chen' },
              { value: 'James Williams', label: 'James Williams' },
              { value: 'Sarah Johnson', label: 'Sarah Johnson' },
            ]}
            defaultValue="Michael Chen"
          />
          <Input label="Budget" placeholder="$2,400,000" defaultValue="$2,400,000" />
        </div>
      </Modal>
    </div>
  );
}
