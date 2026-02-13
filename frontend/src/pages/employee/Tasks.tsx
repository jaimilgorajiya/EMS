import { useState } from 'react';
import { MessageSquare, Clock } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Textarea from '../../components/Textarea';

export default function EmployeeTasks() {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const tasks = [
    {
      id: 'TASK001',
      title: 'Update employee database',
      description: 'Update the employee information in the central database system',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2026-02-15',
      assignedBy: 'Michael Chen',
      progress: 65,
      comments: 2
    },
    {
      id: 'TASK002',
      title: 'Prepare team meeting notes',
      description: 'Document the key points from yesterday\'s team meeting',
      priority: 'Medium',
      status: 'To Do',
      dueDate: '2026-02-14',
      assignedBy: 'Michael Chen',
      progress: 0,
      comments: 0
    },
    {
      id: 'TASK003',
      title: 'Review code changes',
      description: 'Review the pull request for the new authentication feature',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2026-02-16',
      assignedBy: 'Michael Chen',
      progress: 40,
      comments: 5
    },
    {
      id: 'TASK004',
      title: 'Update project documentation',
      description: 'Update the API documentation with new endpoints',
      priority: 'Low',
      status: 'Completed',
      dueDate: '2026-02-12',
      assignedBy: 'Michael Chen',
      progress: 100,
      comments: 1
    },
  ];

  const tasksByStatus = {
    'To Do': tasks.filter(t => t.status === 'To Do'),
    'In Progress': tasks.filter(t => t.status === 'In Progress'),
    'Completed': tasks.filter(t => t.status === 'Completed'),
  };

  const handleComment = (task: any) => {
    setSelectedTask(task);
    setShowCommentModal(true);
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'Employee', path: '/employee' }, { label: 'My Tasks' }]} />
      
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">My Tasks</h1>
        <p className="text-gray-600 mt-1">Manage your assigned tasks and track progress</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
          <p className="text-3xl font-semibold text-gray-900">{tasks.length}</p>
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

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
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
                  <Badge
                    variant={
                      task.status === 'Completed'
                        ? 'success'
                        : task.status === 'In Progress'
                        ? 'info'
                        : 'default'
                    }
                  >
                    {task.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <span>•</span>
                  <span>Assigned by: {task.assignedBy}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{task.comments} comments</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        task.status === 'Completed' ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              {task.status !== 'Completed' && (
                <>
                  <Button variant="secondary" size="sm">
                    Update Progress
                  </Button>
                  {task.status === 'To Do' && (
                    <Button variant="primary" size="sm">
                      Start Task
                    </Button>
                  )}
                  {task.status === 'In Progress' && (
                    <Button variant="success" size="sm">
                      Mark Complete
                    </Button>
                  )}
                </>
              )}
              <Button variant="ghost" size="sm" onClick={() => handleComment(task)}>
                <MessageSquare className="w-4 h-4 mr-1" />
                Comment
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Comment Modal */}
      <Modal
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        title="Add Comment"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
              Cancel
            </Button>
            <Button>Post Comment</Button>
          </>
        }
      >
        {selectedTask && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{selectedTask.title}</h4>
              <p className="text-sm text-gray-600">{selectedTask.description}</p>
            </div>
            <Textarea
              label="Your Comment"
              placeholder="Add your comment or update..."
              rows={4}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
