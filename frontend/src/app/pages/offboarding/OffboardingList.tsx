import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { UserMinus, Calendar, FileText, CheckCircle, AlertTriangle, Search, Briefcase, Filter } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router';

// interface Offboarding defined here or in types

export default function OffboardingList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(searchParams.get('status') || '');

  useEffect(() => {
    fetchOffboardings();
  }, [filterStatus]);

  const fetchOffboardings = async () => {
    try {
        const query = filterStatus ? `?status=${filterStatus}` : '';
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/offboarding${query}`, {
           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.data.success) {
            setEmployees(response.data.data);
        }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const statusColors = {
      'Initiated': 'bg-blue-100 text-blue-800',
      'Notice Period Active': 'bg-amber-100 text-amber-800',
      'Clearance Pending': 'bg-orange-100 text-orange-800',
      'Settlement Pending': 'bg-purple-100 text-purple-800',
      'Documents Issued': 'bg-indigo-100 text-indigo-800',
      'Completed': 'bg-green-100 text-green-800',
      'Archived': 'bg-gray-100 text-gray-800'
  };

  const filteredEmployees = employees.filter(e => 
      e.employeeId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Offboarding Requests</h1>
                <p className="text-gray-500">Manage ongoing exit processes</p>
            </div>
            <Button onClick={() => navigate('/offboarding/initiate')}><UserMinus className="w-4 h-4 mr-2" /> Initiate Exit</Button>
        </div>

        <Card className="p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search employees..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-64">
                    <Select 
                        label=""
                        value={filterStatus}
                        onChange={setFilterStatus}
                        options={[
                            { value: '', label: 'All Statuses' },
                            { value: 'Initiated', label: 'Initiated' },
                            { value: 'Notice Period Active', label: 'Notice Period Active' },
                            { value: 'Clearance Pending', label: 'Clearance Pending' },
                            { value: 'Settlement Pending', label: 'Settlement Pending' },
                            { value: 'Archived', label: 'Completed / Archived' }
                        ]}
                    />
                </div>
            </div>
        </Card>

        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="bg-gray-50 text-gray-700 uppercase">
                    <tr>
                        <th className="px-6 py-3">Employee</th>
                        <th className="px-6 py-3">Exit Type</th>
                        <th className="px-6 py-3">Last Working Day</th>
                        <th className="px-6 py-3">Stage</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredEmployees.map((emp: any) => (
                        <tr key={emp._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/offboarding/process/${emp._id}`)}>
                            <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{emp.employeeId?.name || 'Unknown'}</div>
                                <div className="text-xs text-gray-400">{emp.employeeId?.designation}</div>
                            </td>
                            <td className="px-6 py-4">{emp.exitType}</td>
                            <td className="px-6 py-4">{new Date(emp.lastWorkingDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[emp.status] || 'bg-gray-100'}`}>
                                    {emp.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Button variant="ghost" size="sm">Manage</Button>
                            </td>
                        </tr>
                    ))}
                     {filteredEmployees.length === 0 && (
                        <tr><td colSpan={5} className="text-center py-8 text-gray-400">No records found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
}
