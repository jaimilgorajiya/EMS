import { useState } from 'react';
import { Save } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'leave', label: 'Leave Policy' },
    { id: 'payroll', label: 'Payroll' },
    { id: 'notifications', label: 'Notifications' },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Admin', path: '/admin' }, { label: 'System Settings' }]} />
      
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">System Settings</h1>
        <p className="text-gray-600 mt-1">Configure system-wide settings and policies</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <Card className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <Card className="flex-1">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                <div className="space-y-4">
                  <Input label="Company Name" placeholder="Your Company" defaultValue="TechCorp Inc." />
                  <Input label="Company Email" type="email" placeholder="info@company.com" defaultValue="info@techcorp.com" />
                  <Input label="Company Phone" placeholder="+1 234 567 8900" defaultValue="+1 234 567 8900" />
                  <Input label="Address" placeholder="123 Business St" defaultValue="123 Business St, Suite 100" />
                  <Select
                    label="Timezone"
                    options={[
                      { value: 'PST', label: 'Pacific Time (PST)' },
                      { value: 'EST', label: 'Eastern Time (EST)' },
                      { value: 'CST', label: 'Central Time (CST)' },
                    ]}
                  />
                  <Select
                    label="Date Format"
                    options={[
                      { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                      { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                      { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Settings</h3>
                <div className="space-y-4">
                  <Input label="Work Start Time" type="time" defaultValue="09:00" />
                  <Input label="Work End Time" type="time" defaultValue="17:00" />
                  <Input label="Grace Period (minutes)" type="number" placeholder="15" defaultValue="15" />
                  <Input label="Half Day Hours" type="number" placeholder="4" defaultValue="4" />
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="weekend-tracking" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                    <label htmlFor="weekend-tracking" className="text-sm text-gray-700">
                      Enable weekend attendance tracking
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="auto-checkout" className="w-4 h-4 text-blue-600 rounded" />
                    <label htmlFor="auto-checkout" className="text-sm text-gray-700">
                      Auto check-out at end of day
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leave' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Policy Settings</h3>
                <div className="space-y-4">
                  <Input label="Annual Leave Days" type="number" placeholder="20" defaultValue="20" />
                  <Input label="Sick Leave Days" type="number" placeholder="10" defaultValue="10" />
                  <Input label="Casual Leave Days" type="number" placeholder="10" defaultValue="10" />
                  <Input label="Min Notice Period (days)" type="number" placeholder="3" defaultValue="3" />
                  <Input label="Max Leave Days Per Request" type="number" placeholder="15" defaultValue="15" />
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="carryforward" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                    <label htmlFor="carryforward" className="text-sm text-gray-700">
                      Allow leave carryforward to next year
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="manager-approval" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                    <label htmlFor="manager-approval" className="text-sm text-gray-700">
                      Require manager approval for leave
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payroll' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Settings</h3>
                <div className="space-y-4">
                  <Select
                    label="Payroll Frequency"
                    options={[
                      { value: 'monthly', label: 'Monthly' },
                      { value: 'bi-weekly', label: 'Bi-weekly' },
                      { value: 'weekly', label: 'Weekly' },
                    ]}
                  />
                  <Input label="Payroll Processing Day" type="number" placeholder="28" defaultValue="28" />
                  <Input label="Tax Rate (%)" type="number" placeholder="10" defaultValue="10" />
                  <Select
                    label="Currency"
                    options={[
                      { value: 'USD', label: 'USD - US Dollar' },
                      { value: 'EUR', label: 'EUR - Euro' },
                      { value: 'GBP', label: 'GBP - British Pound' },
                    ]}
                  />
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="auto-payroll" className="w-4 h-4 text-blue-600 rounded" />
                    <label htmlFor="auto-payroll" className="text-sm text-gray-700">
                      Enable automatic payroll processing
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Send email notifications for important events</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Leave Request Notifications</p>
                      <p className="text-sm text-gray-600">Notify managers of new leave requests</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Payroll Notifications</p>
                      <p className="text-sm text-gray-600">Notify employees when payroll is processed</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Task Assignment Notifications</p>
                      <p className="text-sm text-gray-600">Notify employees when tasks are assigned</p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
