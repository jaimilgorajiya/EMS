import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { UserMinus, Calendar, FileText, CheckCircle, AlertTriangle, Shield, Clock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function OffboardingInitiate() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState<{_id: string, name: string, email: string}[]>([]);
    const [currentUser, setCurrentUser] = useState<{role: string} | null>(null);
    const [loading, setLoading] = useState(true);
    
    // Form State
    const [formData, setFormData] = useState({
        employeeId: '',
        exitType: 'Resignation', // Resignation, Termination, Retirement
        resignationDate: new Date().toISOString().split('T')[0],
        noticePeriodDays: 30,
        lastWorkingDate: '',
        handoverTo: '',
        ktRequired: 'Yes',
        reason: '',
        remarks: '',
        rehireEligible: 'Review Later',
        policyConfirmed: false
    });

    useEffect(() => {
        // 1. Check Access Control (Admin Only)
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setCurrentUser(user);
            if (user.role !== 'Admin') {
                alert('Access Denied. Only Admins can initiate offboarding.');
                navigate('/offboarding');
                return;
            }
        } else {
            navigate('/login');
            return;
        }

        // 2. Fetch Active Employees
        fetchEmployees();
        
        // 3. Initial Date Calculation
        calculateLastWorkingDay(new Date().toISOString().split('T')[0], 30);
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.data.success) {
                // Filter only Active employees
                setEmployees(response.data.users.filter((u: any) => u.status === 'Active'));
            }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    // Auto-calculate Last Working Day
    const calculateLastWorkingDay = (startDate: string, days: number) => {
        if (!startDate) return;
        const result = new Date(startDate);
        
        // Validate date
        if (isNaN(result.getTime())) return;

        result.setDate(result.getDate() + (parseInt(days?.toString() || '0')));
        
        if (isNaN(result.getTime())) return;

        setFormData(prev => ({ 
            ...prev, 
            resignationDate: startDate,
            noticePeriodDays: days,
            lastWorkingDate: result.toISOString().split('T')[0] 
        }));
    };

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
             setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            
            // Trigger calculation if date changes
            if (name === 'resignationDate') {
                calculateLastWorkingDay(value, formData.noticePeriodDays);
            }
            if (name === 'noticePeriodDays') {
                calculateLastWorkingDay(formData.resignationDate, value);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!formData.employeeId) return alert('Please select an employee.');
        if (!formData.policyConfirmed) return alert('Please confirm adherence to company policy.');
        if (new Date(formData.lastWorkingDate) < new Date(formData.resignationDate)) {
            return alert('Last Working Day cannot be before Resignation Date.');
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/offboarding/initiate`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.data.success) {
                alert('Offboarding Workflow Initiated Successfully!');
                navigate('/offboarding');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to initiate offboarding. Please check inputs.');
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <UserMinus className="w-6 h-6 text-red-600" />
                    Initiate Offboarding
                </h1>
                <p className="text-gray-500">Official exit process initialization. Admin use only.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* SECTION 1: EMPLOYEE & EXIT TYPE */}
                <Card className="p-6 border-l-4 border-l-blue-500">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm">1</span>
                        Employee Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Select Employee *</label>
                            <select 
                                name="employeeId" 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.employeeId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">-- Search by Name/Email --</option>
                                {employees.map((emp) => (
                                    <option key={emp._id} value={emp._id}>{emp.name} ({emp.email})</option>
                                ))}
                            </select>
                        </div>
                        <Select 
                            label="Exit Type *"
                            options={[
                                { value: 'Resignation', label: 'Resignation (Voluntary)' },
                                { value: 'Termination', label: 'Termination (Involuntary)' },
                                { value: 'Retirement', label: 'Retirement' },
                                { value: 'Death', label: 'Death / Medical Exit' }
                            ]}
                            value={formData.exitType}
                            onChange={(val) => setFormData({...formData, exitType: val})}
                        />
                    </div>
                </Card>

                {/* SECTION 2: TIMELINE */}
                <Card className="p-6 border-l-4 border-l-amber-500">
                     <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-sm">2</span>
                        Exit Timeline
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <Input 
                            label="Initiation / Resignation Date *"
                            type="date"
                            name="resignationDate"
                            value={formData.resignationDate}
                            onChange={handleInputChange}
                            required
                        />
                         <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Notice Period (Days)</label>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="number"
                                    name="noticePeriodDays"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.noticePeriodDays}
                                    onChange={handleInputChange}
                                    min="0"
                                />
                                <span className="text-xs text-gray-400 whitespace-nowrap">Auto-calc LWD</span>
                            </div>
                        </div>
                        <Input 
                            label="Last Working Day (LWD) *"
                            type="date"
                            name="lastWorkingDate"
                            value={formData.lastWorkingDate}
                            onChange={handleInputChange}
                            required
                            // Allowing manual override, but typically auto-calculated
                        />
                    </div>
                    <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Ensure LWD accounts for public holidays if creating strictly.
                    </div>
                </Card>

                {/* SECTION 3: HANDOVER & DETAILS */}
                <Card className="p-6 border-l-4 border-l-purple-500">
                     <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-sm">3</span>
                        Handover & Reason
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                         <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Handover Assets/Tasks To</label>
                            <select 
                                name="handoverTo" 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                value={formData.handoverTo}
                                onChange={handleInputChange}
                            >
                                <option value="">-- Select Assignee (Optional) --</option>
                                {employees.filter(e => e._id !== formData.employeeId).map((emp) => (
                                    <option key={emp._id} value={emp._id}>{emp.name}</option>
                                ))}
                            </select>
                        </div>
                         <Select 
                            label="Knowledge Transfer Required?"
                            options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }, { value: 'Partial', label: 'Partial' }]}
                            value={formData.ktRequired}
                            onChange={(val) => setFormData({...formData, ktRequired: val})}
                        />
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Exit Reason Summary *</label>
                            <textarea 
                                name="reason"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                rows={2}
                                value={formData.reason}
                                onChange={handleInputChange}
                                placeholder="State the primary reason for exit..."
                                required
                            ></textarea>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Shield className="w-3 h-3 text-gray-400" />
                                Internal Confidential Remarks (Admin Only)
                            </label>
                            <textarea 
                                name="remarks"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none bg-gray-50"
                                rows={2}
                                value={formData.remarks}
                                onChange={handleInputChange}
                                placeholder="Private notes regarding this case..."
                            ></textarea>
                        </div>
                    </div>
                </Card>

                 {/* SECTION 4: COMPLIANCE */}
                 <Card className="p-6 border-l-4 border-l-green-500">
                     <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-sm">4</span>
                        Compliance & Status
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <Select 
                            label="Rehire Eligibility"
                            options={[{ value: 'Yes', label: 'Yes - Eligible' }, { value: 'No', label: 'No - Do Not Rehire' }, { value: 'Review Later', label: 'Review Later' }]}
                            value={formData.rehireEligible}
                            onChange={(val) => setFormData({...formData, rehireEligible: val})}
                        />
                        <div className="pb-3">
                             <label className="flex items-center gap-3 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="policyConfirmed"
                                    checked={formData.policyConfirmed}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700 font-medium">I confirm this exit follows company policy.</span>
                            </label>
                        </div>
                    </div>
                </Card>

                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="ghost" type="button" onClick={() => navigate('/offboarding')}>Cancel</Button>
                    <Button variant="danger" type="submit" size="lg" disabled={!formData.policyConfirmed}>
                        <UserMinus className="w-5 h-5 mr-2" />
                        Initiate Offboarding
                    </Button>
                </div>
            </form>
        </div>
    );
}
