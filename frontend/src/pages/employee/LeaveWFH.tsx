import { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';

export default function LeaveWFH() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [requestType, setRequestType] = useState('leave');

  const myRequests = [
    {
      id: 'LR001',
      type: 'Sick Leave',
      from: '2026-02-15',
      to: '2026-02-17',
      days: 3,
      status: 'Pending',
      appliedOn: '2026-02-13',
      reason: 'Medical appointment and recovery'
    },
    {
      id: 'LR002',
      type: 'Casual Leave',
      from: '2026-01-20',
      to: '2026-01-22',
      days: 3,
      status: 'Approved',
      appliedOn: '2026-01-15',
      reason: 'Family event'
    },
    {
      id: 'WFH001',
      type: 'WFH',
      from: '2026-02-10',
      to: '2026-02-10',
      days: 1,
      status: 'Approved',
      appliedOn: '2026-02-08',
      reason: 'Home maintenance'
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Employee', path: '/employee' }, { label: 'Leave & WFH' }]} />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Leave & WFH Requests</h1>
          <p className="text-gray-600 mt-1">Apply for leave or work from home</p>
        </div>
        <Button onClick={() => setShowApplyModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Apply Request
        </Button>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Annual Leave</p>
              <p className="text-2xl font-semibold text-gray-900">13 days</p>
              <p className="text-xs text-gray-500 mt-1">of 20 remaining</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Sick Leave</p>
              <p className="text-2xl font-semibold text-gray-900">8 days</p>
              <p className="text-xs text-gray-500 mt-1">of 10 remaining</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Casual Leave</p>
              <p className="text-2xl font-semibold text-gray-900">9 days</p>
              <p className="text-xs text-gray-500 mt-1">of 10 remaining</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">WFH Days</p>
              <p className="text-2xl font-semibold text-gray-900">Unlimited</p>
              <p className="text-xs text-gray-500 mt-1">Subject to approval</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Request History */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Requests</h3>
        <div className="space-y-4">
          {myRequests.map((request) => (
            <div key={request.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold text-gray-900">{request.id}</h4>
                    <Badge
                      variant={
                        request.type === 'Sick Leave'
                          ? 'danger'
                          : request.type === 'Casual Leave'
                          ? 'info'
                          : request.type === 'Paid Leave'
                          ? 'success'
                          : 'warning'
                      }
                    >
                      {request.type}
                    </Badge>
                    <Badge
                      variant={
                        request.status === 'Approved'
                          ? 'success'
                          : request.status === 'Rejected'
                          ? 'danger'
                          : 'warning'
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Applied on {request.appliedOn}</p>
                </div>
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
                  <p className="font-medium text-gray-900">{request.days} day(s)</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Reason:</p>
                <p className="text-sm text-gray-900">{request.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Apply Request Modal */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="Apply for Leave / WFH"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowApplyModal(false)}>
              Cancel
            </Button>
            <Button>Submit Request</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRequestType('leave')}
                className={`p-4 border-2 rounded-lg text-center transition-colors ${
                  requestType === 'leave'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="font-medium text-gray-900">Leave</p>
              </button>
              <button
                onClick={() => setRequestType('wfh')}
                className={`p-4 border-2 rounded-lg text-center transition-colors ${
                  requestType === 'wfh'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Calendar className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="font-medium text-gray-900">Work From Home</p>
              </button>
            </div>
          </div>

          {requestType === 'leave' && (
            <Select
              label="Leave Type"
              options={[
                { value: '', label: 'Select Leave Type' },
                { value: 'Sick Leave', label: 'Sick Leave (8 days remaining)' },
                { value: 'Casual Leave', label: 'Casual Leave (9 days remaining)' },
                { value: 'Paid Leave', label: 'Paid Leave (13 days remaining)' },
              ]}
            />
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input label="From Date" type="date" />
            <Input label="To Date" type="date" />
          </div>

          <Textarea
            label="Reason"
            placeholder="Please provide a reason for your request..."
            rows={4}
          />

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Your request will be sent to your manager for approval. You will be notified once it's reviewed.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
