import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Textarea from '../../components/Textarea';

export default function ApprovalsPanel() {
  const [activeTab, setActiveTab] = useState('leave');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const leaveRequests = [
    {
      id: 'LR001',
      employee: 'Emily Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      type: 'Sick Leave',
      from: '2026-02-15',
      to: '2026-02-17',
      days: 3,
      reason: 'Medical appointment and recovery',
      appliedOn: '2026-02-13'
    },
    {
      id: 'LR002',
      employee: 'David Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      type: 'Casual Leave',
      from: '2026-02-20',
      to: '2026-02-22',
      days: 3,
      reason: 'Personal work',
      appliedOn: '2026-02-12'
    },
  ];

  const wfhRequests = [
    {
      id: 'WFH001',
      employee: 'Sophia Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
      date: '2026-02-14',
      reason: 'Home internet installation',
      appliedOn: '2026-02-12'
    },
  ];

  const missedPunchRequests = [
    {
      id: 'MP001',
      employee: 'David Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      date: '2026-02-11',
      type: 'Missed Clock-Out',
      reason: 'Forgot to punch out',
      appliedOn: '2026-02-12'
    },
  ];

  const tabs = [
    { id: 'leave', label: 'Leave Requests', count: leaveRequests.length },
    { id: 'wfh', label: 'WFH Requests', count: wfhRequests.length },
    { id: 'missed', label: 'Missed Punch', count: missedPunchRequests.length },
  ];

  const handleApprove = (request: any) => {
    setSelectedRequest(request);
    setShowApprovalModal(true);
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'Manager', path: '/manager' }, { label: 'Approvals' }]} />
      
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Approvals Panel</h1>
        <p className="text-gray-600 mt-1">Review and approve team requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Pending Leave Requests</p>
          <p className="text-3xl font-semibold text-orange-600">{leaveRequests.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Pending WFH Requests</p>
          <p className="text-3xl font-semibold text-blue-600">{wfhRequests.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Pending Corrections</p>
          <p className="text-3xl font-semibold text-yellow-600">{missedPunchRequests.length}</p>
        </Card>
      </div>

      {/* Tabs */}
      <Card padding={false}>
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                <Badge variant={activeTab === tab.id ? 'info' : 'default'}>{tab.count}</Badge>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'leave' && (
            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <div key={request.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    <img
                      src={request.avatar}
                      alt={request.employee}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.employee}</h3>
                          <p className="text-sm text-gray-600">Applied on {request.appliedOn}</p>
                        </div>
                        <Badge variant="warning">{request.type}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                        <div>
                          <p className="text-gray-600">From</p>
                          <p className="font-medium text-gray-900">{request.from}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">To</p>
                          <p className="font-medium text-gray-900">{request.to}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-medium text-gray-900">{request.days} days</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Reason:</p>
                        <p className="text-sm text-gray-900">{request.reason}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="success" onClick={() => handleApprove(request)}>
                          Approve
                        </Button>
                        <Button variant="danger">
                          Reject
                        </Button>
                        <Button variant="ghost">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wfh' && (
            <div className="space-y-4">
              {wfhRequests.map((request) => (
                <div key={request.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    <img
                      src={request.avatar}
                      alt={request.employee}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.employee}</h3>
                          <p className="text-sm text-gray-600">Applied on {request.appliedOn}</p>
                        </div>
                        <Badge variant="info">WFH</Badge>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium text-gray-900">{request.date}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Reason:</p>
                        <p className="text-sm text-gray-900">{request.reason}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="success">Approve</Button>
                        <Button variant="danger">Reject</Button>
                        <Button variant="ghost">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'missed' && (
            <div className="space-y-4">
              {missedPunchRequests.map((request) => (
                <div key={request.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    <img
                      src={request.avatar}
                      alt={request.employee}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.employee}</h3>
                          <p className="text-sm text-gray-600">Applied on {request.appliedOn}</p>
                        </div>
                        <Badge variant="warning">{request.type}</Badge>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium text-gray-900">{request.date}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Reason:</p>
                        <p className="text-sm text-gray-900">{request.reason}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="success">Approve</Button>
                        <Button variant="danger">Reject</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Approval Modal */}
      <Modal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title="Approve Request"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowApprovalModal(false)}>
              Cancel
            </Button>
            <Button variant="success">Confirm Approval</Button>
          </>
        }
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Employee</p>
              <p className="font-medium text-gray-900">{selectedRequest.employee}</p>
            </div>
            <Textarea label="Comment (Optional)" placeholder="Add a comment..." rows={3} />
          </div>
        )}
      </Modal>
    </div>
  );
}
