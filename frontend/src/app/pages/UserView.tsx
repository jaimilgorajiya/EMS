import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { 
  User as UserIcon, Mail, Phone, MapPin, Calendar, Briefcase, 
  Shield, FileText, ArrowLeft, Download, ExternalLink, Building, 
  DollarSign, Clock, CheckCircle, XCircle
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

// Interfaces (matching UserForm for consistency)
interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

interface WorkSetup {
  location: string;
  mode: 'Office' | 'Hybrid' | 'Remote';
  shift: string;
}

interface SalaryDetails {
  salaryType: 'Monthly' | 'Hourly' | 'Contract';
  baseSalary: number;
  payGrade: string;
  effectiveFrom: string;
  ctc: number;
}

interface UserDocuments {
  resume: string;
  idProof: string;
  photograph: string;
  offerLetter: string;
  appointmentLetter: string;
  nda: string;
  bankPassbook: string;
  panCard: string;
}

interface Verification {
  status: 'Pending' | 'Verified';
  verifiedBy: string;
  verificationDate: string;
}

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: Address;
  emergencyContact: EmergencyContact;
  
  employeeId: string;
  department: string;
  position: string;
  designation: string;
  dateJoined: string;
  employmentType: string;
  reportingTo: string;
  workSetup: WorkSetup;
  salaryDetails: SalaryDetails;

  role: string;
  status: string;
  permissions: {
    moduleAccess: string[];
    approvalRights: boolean;
  };
  
  documents: UserDocuments;
  verification: Verification;
  createdAt: string;
}

export default function UserView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading user details...</div>;
  }

  if (!user) {
    return <div className="text-center text-red-500 mt-10">User not found</div>;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 mb-4 text-gray-800 border-b pb-2">
      <Icon className="w-5 h-5 text-blue-600" />
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  );

  const InfoItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="mb-3">
      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{label}</p>
      <div className="text-sm text-gray-900 font-medium mt-0.5">{value || '-'}</div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="p-2" onClick={() => navigate('/employees')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500">
               <span>{user.designation || user.position}</span>
               <span>•</span>
               <span>{user.email}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="secondary" onClick={() => navigate(`/employees/edit/${user._id}`)}>
             Edit Profile
           </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 flex items-center gap-4 border-l-4 border-blue-500">
              <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                  <Briefcase className="w-6 h-6" />
              </div>
              <div>
                  <p className="text-xs text-gray-500">Employee ID</p>
                  <p className="font-bold text-gray-900">{user.employeeId || 'N/A'}</p>
              </div>
          </Card>
          <Card className="p-4 flex items-center gap-4 border-l-4 border-green-500">
              <div className="p-3 bg-green-50 rounded-full text-green-600">
                  <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <Badge variant={user.status === 'Active' ? 'success' : 'danger'}>{user.status}</Badge>
              </div>
          </Card>
          <Card className="p-4 flex items-center gap-4 border-l-4 border-purple-500">
              <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                  <Building className="w-6 h-6" />
              </div>
              <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="font-bold text-gray-900">{user.department || 'N/A'}</p>
              </div>
          </Card>
           <Card className="p-4 flex items-center gap-4 border-l-4 border-orange-500">
              <div className="p-3 bg-orange-50 rounded-full text-orange-600">
                  <Calendar className="w-6 h-6" />
              </div>
              <div>
                  <p className="text-xs text-gray-500">Joining Date</p>
                  <p className="font-bold text-gray-900">{formatDate(user.dateJoined)}</p>
              </div>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Personal & Contact */}
          <div className="space-y-6">
              <Card className="p-6">
                  <SectionTitle icon={UserIcon} title="Personal Details" />
                  <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <InfoItem label="First Name" value={user.firstName} />
                          <InfoItem label="Last Name" value={user.lastName} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <InfoItem label="Date of Birth" value={formatDate(user.dateOfBirth)} />
                          <InfoItem label="Gender" value={user.gender} />
                      </div>
                  </div>
              </Card>

              <Card className="p-6">
                  <SectionTitle icon={MapPin} title="Contact Information" />
                  <div className="space-y-4">
                      <InfoItem label="Email Address" value={
                          <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3 text-gray-400" />
                              {user.email}
                          </div>
                      } />
                      <InfoItem label="Phone Number" value={
                           <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-gray-400" />
                              {user.phone}
                          </div>
                      } />
                      <div className="border-t border-gray-100 pt-3">
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Address</p>
                          <p className="text-sm text-gray-800">
                              {[user.address?.street, user.address?.city, user.address?.state, user.address?.country, user.address?.pincode].filter(Boolean).join(', ')}
                          </p>
                      </div>
                  </div>
              </Card>

              <Card className="p-6">
                  <SectionTitle icon={Shield} title="Emergency Contact" />
                  <div className="space-y-4">
                       <InfoItem label="Name" value={user.emergencyContact?.name} />
                       <div className="grid grid-cols-2 gap-4">
                           <InfoItem label="Relation" value={user.emergencyContact?.relation} />
                           <InfoItem label="Phone" value={user.emergencyContact?.phone} />
                       </div>
                  </div>
              </Card>
          </div>

          {/* Column 2: Job & Work */}
          <div className="space-y-6">
              <Card className="p-6">
                  <SectionTitle icon={Briefcase} title="Employment Details" />
                  <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <InfoItem label="Designation" value={user.designation || user.position} />
                          <InfoItem label="Department" value={user.department} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <InfoItem label="Reporting To" value={user.reportingTo} />
                          <InfoItem label="Emp Type" value={user.employmentType} />
                      </div>
                      <InfoItem label="Work Mode" value={
                          <Badge variant="default">{user.workSetup?.mode} - {user.workSetup?.location}</Badge>
                      } />
                       <InfoItem label="Shift" value={user.workSetup?.shift} />
                  </div>
              </Card>

              <Card className="p-6">
                  <SectionTitle icon={DollarSign} title="Compensation" />
                  <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <InfoItem label="Salary Type" value={user.salaryDetails?.salaryType} />
                          <InfoItem label="Base Pay" value={user.salaryDetails?.baseSalary} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <InfoItem label="Pay Grade" value={user.salaryDetails?.payGrade} />
                          <InfoItem label="CTC" value={user.salaryDetails?.ctc} />
                      </div>
                      <InfoItem label="Effective From" value={formatDate(user.salaryDetails?.effectiveFrom)} />
                  </div>
              </Card>
          </div>

          {/* Column 3: Stats & Documents */}
          <div className="space-y-6">
               <Card className="p-6">
                  <SectionTitle icon={Shield} title="System Access" />
                  <div className="space-y-4">
                      <InfoItem label="Role" value={<Badge variant="info">{user.role}</Badge>} />
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                          {user.permissions?.approvalRights ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                          <span>Approval Rights</span>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-3">
                          <InfoItem label="Verification Status" value={
                              <Badge variant={user.verification?.status === 'Verified' ? 'success' : 'warning'}>
                                  {user.verification?.status || 'Pending'}
                              </Badge>
                          } />
                          {user.verification?.status === 'Verified' && (
                              <p className="text-xs text-muted-foreground mt-1">
                                  Verified by {user.verification?.verifiedBy} on {formatDate(user.verification?.verificationDate)}
                              </p>
                          )}
                      </div>
                  </div>
              </Card>

               <Card className="p-6">
                  <SectionTitle icon={FileText} title="Uploaded Documents" />
                  <div className="space-y-3">
                      {user.documents && Object.entries(user.documents).map(([key, url]) => {
                          if (!url) return null;
                          return (
                              <div key={key} className="flex items-center justify-between p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                  <div className="flex items-center gap-2 overflow-hidden">
                                      <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                      <span className="text-sm font-medium text-gray-700 capitalize truncate w-32">
                                          {key.replace(/([A-Z])/g, ' $1').trim()}
                                      </span>
                                  </div>
                                  <a 
                                      href={url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 p-1"
                                      title="View Document"
                                  >
                                      <ExternalLink className="w-4 h-4" />
                                  </a>
                              </div>
                          );
                      })}
                      {(!user.documents || Object.values(user.documents).every(v => !v)) && (
                          <p className="text-sm text-gray-500 italic">No documents uploaded.</p>
                      )}
                  </div>
              </Card>
          </div>
      </div>
    </div>
  );
}
