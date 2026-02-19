import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Briefcase, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

export default function OffboardingDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [offboarding, setOffboarding] = useState(null);
    const [activeTab, setActiveTab] = useState('summary');

    useEffect(() => {
        fetchDetails();
    }, [id]);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/offboarding/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.data.success) {
                setOffboarding(response.data.data);
            }
        } catch (error) { console.error('Error fetching details:', error); }
    };

    const handleFinalize = async () => {
        if (!confirm('Are you sure you want to finalize this offboarding? This will deactivate the employee account.')) return;
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/offboarding/finalize/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.data.success) {
                alert('Offboarding Finalized Successfully!');
                navigate('/offboarding');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to finalize offboarding.');
        }
    };

    const handleStatusUpdate = async (newStatus: string) => {
        if (!confirm(`Are you sure you want to move status to ${newStatus}?`)) return;
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/offboarding/${id}`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.data.success) {
                setOffboarding(response.data.data);
                // alert(`Status updated to ${newStatus}`);
            }
        } catch (err) { console.error(err); }
    };

    if (!offboarding) return <div>Loading...</div>;

    const renderTabContent = () => {
        switch (activeTab) {
            case 'notice-period':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Notice Period Tracker</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-4">
                                <p className="text-sm text-gray-500">Notice Start Date</p>
                                <p className="text-lg font-medium">{new Date(offboarding.resignationDate).toLocaleDateString()}</p>
                            </Card>
                            <Card className="p-4">
                                <p className="text-sm text-gray-500">Last Working Date</p>
                                <p className="text-lg font-medium">{new Date(offboarding.lastWorkingDate).toLocaleDateString()}</p>
                            </Card>
                        </div>
                        {offboarding.status === 'Initiated' && (
                             <div className="p-4 bg-blue-50 text-blue-800 rounded-lg flex justify-between items-center">
                                 <span>The notice period hasn't officially started in the system.</span>
                                 <Button size="sm" onClick={() => handleStatusUpdate('Notice Period Active')}>Start Notice Period</Button>
                             </div>
                        )}
                    </div>
                );
            case 'clearance':
                return (
                    <div className="space-y-4">
                         <h3 className="text-lg font-semibold">Clearance Checklist</h3>
                         <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                             <p className="text-orange-800 font-medium">Coming Soon: Interactive Checklist</p>
                         </div>
                         {offboarding.status === 'Notice Period Active' && (
                             <Button onClick={() => handleStatusUpdate('Clearance Pending')}>Begin Clearance Process</Button>
                         )}
                    </div>
                );
            case 'settlement':
                return (
                    <div className="space-y-4">
                         <h3 className="text-lg font-semibold">Final Settlement</h3>
                         <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                             <p className="text-purple-800 font-medium">Coming Soon: Settlement Calculator</p>
                         </div>
                         {offboarding.status === 'Clearance Pending' && (
                             <Button onClick={() => handleStatusUpdate('Settlement Pending')}>Start Settlement</Button>
                         )}
                    </div>
                );
            // ... Add other cases
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Employee Details</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Name:</span> {offboarding.employeeId?.name}</p>
                                <p><span className="font-medium">Department:</span> {offboarding.employeeId?.department}</p>
                                <p><span className="font-medium">Designation:</span> {offboarding.employeeId?.designation}</p>
                            </div>
                        </Card>
                         <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Exit Status</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Type:</span> {offboarding.exitType}</p>
                                <p><span className="font-medium">Current Stage:</span> <Badge variant="outline">{offboarding.status}</Badge></p>
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <h4 className="text-sm font-medium mb-2">Next Step:</h4>
                                {offboarding.status === 'Initiated' && (
                                    <Button className="w-full" onClick={() => handleStatusUpdate('Notice Period Active')}>Start Notice Period</Button>
                                )}
                                {offboarding.status === 'Notice Period Active' && (
                                    <Button className="w-full" onClick={() => handleStatusUpdate('Clearance Pending')}>Start Clearance</Button>
                                )}
                                {offboarding.status === 'Clearance Pending' && (
                                    <Button className="w-full" onClick={() => handleStatusUpdate('Settlement Pending')}>Start Settlement</Button>
                                )}
                                {offboarding.status === 'Settlement Pending' && (
                                    <Button className="w-full" onClick={() => handleStatusUpdate('Completed')}>Mark Completed</Button>
                                )}
                                {offboarding.status === 'Completed' && (
                                    <Button variant="danger" className="w-full" onClick={handleFinalize}>Archive & Deactivate User</Button>
                                )}
                                {offboarding.status === 'Archived' && (
                                    <p className="text-green-600 font-medium text-center">Process Completed & Archived</p>
                                )}
                            </div>
                        </Card>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div>
                     <h1 className="text-2xl font-bold text-gray-900">{offboarding.employeeId?.name}</h1>
                     <p className="text-gray-500">Offboarding Process</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate('/offboarding')}>Back to Dashboard</Button>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 space-x-4">
                {['Summary', 'Notice Period', 'Clearance', 'Exit Interview', 'Settlement', 'Documents'].map((tab) => (
                    <button
                        key={tab}
                        className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === tab.toLowerCase().replace(' ', '-') 
                            ? 'border-blue-500 text-blue-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="mt-6">
                {renderTabContent()}
            </div>
        </div>
    );
}
