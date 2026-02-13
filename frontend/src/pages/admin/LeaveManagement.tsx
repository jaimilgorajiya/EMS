import { useState } from 'react';
import { Filter, Download, MessageSquare } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Textarea from '../../components/Textarea';
import { mockLeaveRequests } from '../../data/mockData';

export default function LeaveManagement() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleApprove = (request: any) => {
    setSelectedRequest(request);
    setShowApprovalModal(true);
  };

  const columns = [
    {
      key: 'id',
      label: 'Request ID'
    },
    {
      key: 'employeeName',
      label: 'Employee',
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{row.employeeId}</p>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: string) => (
        <Badge
          variant={
            value === 'Sick Leave'
              ? 'danger'
              : value === 'Casual Leave'
              ? 'info'
              : value === 'Paid Leave'
              ? 'success'
              : 'warning'
          }
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'from',
      label: 'From Date'
    },
    {
      key: 'to',
      label: 'To Date'
    },
    {
      key: 'days',
      label: 'Days',
      render: (value: number) => (
        <span className="font-medium">{value} {value === 1 ? 'day' : 'days'}</span>
      )
    },
    {
      key: 'reason',
      label: 'Reason',
      render: (value: string) => (
        <span className="text-sm text-gray-600 max-w-xs truncate block">{value}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge
          variant={
            value === 'Approved'
              ? 'success'
              : value === 'Rejected'
              ? 'danger'
              : 'warning'
          }
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex gap-2">
          {row.status === 'Pending' && (
            <>
              <Button variant="success" size="sm" onClick={() => handleApprove(row)}>
                Approve
              </Button>
              <Button variant="danger" size="sm">
                Reject
              </Button>
            </>
          )}
          <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600" title="Comment">
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filteredRequests = mockLeaveRequests.filter(req => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesType = filterType === 'all' || req.type === filterType;
    return matchesStatus && matchesType;
  });

  return (
    <div>
      <Breadcrumb items={[{ label: 'Admin', path: '/admin' }, { label: 'Leave & WFH Management' }]} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Leave & WFH Management</h1>
          <p className="text-gray-600 mt-1">Review and approve leave requests</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
          <p className="text-3xl font-semibold text-yellow-600">5</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Approved This Month</p>
          <p className="text-3xl font-semibold text-green-600">28</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Rejected This Month</p>
          <p className="text-3xl font-semibold text-red-600">3</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">On Leave Today</p>
          <p className="text-3xl font-semibold text-blue-600">8</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Paid Leave">Paid Leave</option>
            <option value="WFH">WFH</option>
          </select>
        </div>
      </Card>

      {/* Leave Requests Table */}
      <Card padding={false}>
        <Table columns={columns} data={filteredRequests} />
      </Card>

      {/* Approval Modal */}
      <Modal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title="Approve Leave Request"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowApprovalModal(false)}>
              Cancel
            </Button>
            <Button variant="success">Approve Request</Button>
          </>
        }
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Employee</p>
              <p className="font-medium text-gray-900">{selectedRequest.employeeName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Leave Type</p>
              <Badge>{selectedRequest.type}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">From</p>
                <p className="font-medium text-gray-900">{selectedRequest.from}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">To</p>
                <p className="font-medium text-gray-900">{selectedRequest.to}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Reason</p>
              <p className="font-medium text-gray-900">{selectedRequest.reason}</p>
            </div>
            <Textarea label="Comment (Optional)" placeholder="Add a comment..." rows={3} />
          </div>
        )}
      </Modal>
    </div>
  );
}
