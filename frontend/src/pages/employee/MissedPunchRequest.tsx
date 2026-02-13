import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';

export default function MissedPunchRequest() {
  const [requests, setRequests] = useState([
    {
      id: 'MP001',
      date: '2026-02-10',
      type: 'Missed Clock-Out',
      reason: 'Forgot to punch out',
      status: 'Pending',
      submittedOn: '2026-02-11'
    },
    {
      id: 'MP002',
      date: '2026-02-05',
      type: 'Missed Clock-In',
      reason: 'System error',
      status: 'Approved',
      submittedOn: '2026-02-06'
    },
  ]);

  return (
    <div>
      <Breadcrumb items={[{ label: 'Employee', path: '/employee' }, { label: 'Missed Punch Request' }]} />
      
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Missed Punch Request</h1>
        <p className="text-gray-600 mt-1">Request correction for missed clock-in or clock-out</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request Form */}
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit New Request</h3>
          <div className="space-y-4">
            <Input label="Date" type="date" />
            <Select
              label="Request Type"
              options={[
                { value: '', label: 'Select Type' },
                { value: 'Missed Clock-In', label: 'Missed Clock-In' },
                { value: 'Missed Clock-Out', label: 'Missed Clock-Out' },
                { value: 'Both', label: 'Both' },
              ]}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Clock-In Time" type="time" />
              <Input label="Clock-Out Time" type="time" />
            </div>
            <Textarea
              label="Reason for Correction"
              placeholder="Please explain why you need this correction..."
              rows={4}
            />
            <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                Please ensure all information is accurate. False or misleading information may result in disciplinary action.
              </p>
            </div>
            <div className="flex gap-3">
              <Button>Submit Request</Button>
              <Button variant="secondary">Reset</Button>
            </div>
          </div>
        </Card>

        {/* Guidelines */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Guidelines</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">When to submit:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Within 24 hours of the incident</li>
                <li>System errors or technical issues</li>
                <li>Emergency situations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Required information:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Exact date and time</li>
                <li>Valid reason</li>
                <li>Supporting documents (if any)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Processing time:</h4>
              <p>Requests are typically reviewed within 2-3 business days by your manager.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Request History */}
      <Card className="mt-8" padding={false}>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Request History</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {requests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{request.id}</h4>
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
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">Date:</span> {request.date}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">Type:</span> {request.type}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">Reason:</span> {request.reason}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">Submitted:</span> {request.submittedOn}
                    </p>
                  </div>
                </div>
                {request.status === 'Pending' && (
                  <Button variant="ghost" size="sm">View Details</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
