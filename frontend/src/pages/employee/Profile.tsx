import { useState } from "react";
import {
  Edit,
  Upload,
  Key,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";

export default function EmployeeProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [showEditModal, setShowEditModal] = useState(false);

  const employee = {
    id: "EMP003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    phone: "+1 234 567 8902",
    position: "Senior Software Engineer",
    department: "Engineering",
    manager: "Michael Chen",
    dateJoined: "2024-03-22",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    address: "123 Main St, Suite 100, San Francisco, CA 94102",
    dateOfBirth: "1992-05-15",
    status: "Active",
  };

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "job", label: "Job Details" },
    { id: "documents", label: "Documents" },
    { id: "security", label: "Security" },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Employee", path: "/employee" },
          { label: "My Profile" },
        ]}
      />

      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          My Profile
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your personal information and settings
        </p>
      </div>

      {/* Profile Header */}
      <Card className="mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-24 h-24 rounded-full"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                <Upload className="w-4 h-4" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {employee.name}
                </h2>
                <Badge variant="success">
                  {employee.status}
                </Badge>
              </div>
              <p className="text-gray-600 mb-3">
                {employee.position}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {employee.phone}
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => setShowEditModal(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "personal" && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Employee ID
              </p>
              <p className="font-medium text-gray-900">
                {employee.id}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Full Name
              </p>
              <p className="font-medium text-gray-900">
                {employee.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Email Address
              </p>
              <p className="font-medium text-gray-900">
                {employee.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Phone Number
              </p>
              <p className="font-medium text-gray-900">
                {employee.phone}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Date of Birth
              </p>
              <p className="font-medium text-gray-900">
                {employee.dateOfBirth}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Address
              </p>
              <p className="font-medium text-gray-900">
                {employee.address}
              </p>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "job" && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Job Details
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Position
              </p>
              <p className="font-medium text-gray-900">
                {employee.position}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Department
              </p>
              <p className="font-medium text-gray-900">
                {employee.department}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Manager
              </p>
              <p className="font-medium text-gray-900">
                {employee.manager}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Date Joined
              </p>
              <p className="font-medium text-gray-900">
                {employee.dateJoined}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Employment Type
              </p>
              <p className="font-medium text-gray-900">
                Full-time
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Work Location
              </p>
              <p className="font-medium text-gray-900">
                Office / Hybrid
              </p>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "documents" && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              My Documents
            </h3>
            <Button size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
          <div className="space-y-3">
            {[
              "Resume.pdf",
              "Offer_Letter.pdf",
              "ID_Proof.pdf",
              "Address_Proof.pdf",
            ].map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {doc}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "security" && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Security Settings
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Change Password
              </h4>
              <div className="space-y-3 max-w-md">
                <Input
                  type="password"
                  label="Current Password"
                />
                <Input type="password" label="New Password" />
                <Input
                  type="password"
                  label="Confirm New Password"
                />
                <Button>Update Password</Button>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">
                Two-Factor Authentication
              </h4>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    Enable 2FA
                  </p>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your
                    account
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
        size="lg"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            defaultValue={employee.name}
          />
          <Input
            label="Email"
            type="email"
            defaultValue={employee.email}
          />
          <Input label="Phone" defaultValue={employee.phone} />
          <Input
            label="Date of Birth"
            type="date"
            defaultValue={employee.dateOfBirth}
          />
          <Input
            label="Address"
            defaultValue={employee.address}
          />
        </div>
      </Modal>
    </div>
  );
}