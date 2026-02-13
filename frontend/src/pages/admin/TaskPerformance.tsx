import { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import { mockTasks } from '../../data/mockData';

export default function TaskPerformance() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const tasksByStatus = {
    'To Do': mockTasks.filter(t => t.status === 'To Do'),
    'In Progress': mockTasks.filter(t => t.status === 'In Progress'),
    'Completed': mockTasks.filter(t => t.status === 'Completed'),
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'Admin', path: '/admin' }, { label: 'Tasks & Performance' }]} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Tasks & Performance</h1>
          <p className="text-gray-600 mt-1">Manage tasks and track performance</p>
        </div>
        <Button onClick={() => setShowAddTaskModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
          <p className="text-3xl font-semibold text-gray-900">{mockTasks.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">To Do</p>
          <p className="text-3xl font-semibold text-gray-600">{tasksByStatus['To Do'].length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">In Progress</p>
          <p className="text-3xl font-semibold text-blue-600">{tasksByStatus['In Progress'].length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Completed</p>
          <p className="text-3xl font-semibold text-green-600">{tasksByStatus['Completed'].length}</p>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(tasksByStatus).map(([status, tasks]) => (
          <div key={status}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                {status}
                <Badge variant="default">{tasks.length}</Badge>
              </h3>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Assigned to: {task.assignedTo}</p>
                  <div className="flex items-center justify-between">
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
                    <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                  </div>
                  {task.progress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Progress</span>
                        <span className="text-xs font-medium text-gray-900">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        title="Create New Task"
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
          <Textarea label="Description" placeholder="Task details..." rows={3} />
          <Select
            label="Assign To"
            options={[
              { value: '', label: 'Select Employee' },
              { value: 'Emily Rodriguez', label: 'Emily Rodriguez' },
              { value: 'David Brown', label: 'David Brown' },
              { value: 'Sophia Lee', label: 'Sophia Lee' },
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority"
              options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' },
              ]}
            />
            <Input label="Due Date" type="date" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
