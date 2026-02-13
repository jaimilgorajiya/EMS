import { useState } from 'react';
import { Plus } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';

export default function TaskAssignment() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const tasks = [
    {
      id: 'TASK001',
      title: 'Update employee database',
      assignedTo: 'Emily Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2026-02-15',
      progress: 65
    },
    {
      id: 'TASK002',
      title: 'Prepare Q1 marketing report',
      assignedTo: 'Sophia Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
      priority: 'Medium',
      status: 'In Progress',
      dueDate: '2026-02-18',
      progress: 40
    },
    {
      id: 'TASK003',
      title: 'Code review for new feature',
      assignedTo: 'David Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      priority: 'High',
      status: 'To Do',
      dueDate: '2026-02-14',
      progress: 0
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Manager', path: '/manager' }, { label: 'Task Assignment' }]} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Task Assignment</h1>
          <p className="text-gray-600 mt-1">Create and assign tasks to your team</p>
        </div>
        <Button onClick={() => setShowAddTaskModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
          <p className="text-3xl font-semibold text-gray-900">24</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">In Progress</p>
          <p className="text-3xl font-semibold text-blue-600">8</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Completed</p>
          <p className="text-3xl font-semibold text-green-600">14</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Overdue</p>
          <p className="text-3xl font-semibold text-red-600">2</p>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <div className="flex items-start gap-4">
              <img
                src={task.avatar}
                alt={task.assignedTo}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
                  </div>
                  <Badge
                    variant={
                      task.priority === 'High'
                        ? 'danger'
                        : task.priority === 'Medium'
                        ? 'warning'
                        : 'info'
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-gray-600">Status: </span>
                    <Badge variant={task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'info' : 'default'}>
                      {task.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-600">Due: </span>
                    <span className="font-medium text-gray-900">{task.dueDate}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        title="Create New Task"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddTaskModal(false)}>
              Cancel
            </Button>
            <Button>Create Task</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Task Title" placeholder="e.g., Update documentation" />
          <Textarea label="Description" placeholder="Task details..." rows={4} />
          <Select
            label="Assign To"
            options={[
              { value: '', label: 'Select Team Member' },
              { value: 'Emily Rodriguez', label: 'Emily Rodriguez' },
              { value: 'David Brown', label: 'David Brown' },
              { value: 'Sophia Lee', label: 'Sophia Lee' },
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              options={[
                { value: 'Low', label: 'Low Priority' },
                { value: 'Medium', label: 'Medium Priority' },
                { value: 'High', label: 'High Priority' },
              ]}
            />
            <Input label="Due Date" type="date" />
          </div>
          <Textarea label="Additional Notes (Optional)" placeholder="Any additional information..." rows={2} />
        </div>
      </Modal>
    </div>
  );
}
