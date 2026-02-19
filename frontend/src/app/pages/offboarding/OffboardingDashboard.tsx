import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Briefcase, AlertTriangle, CheckCircle, Clock, Search, LogOut, ChevronRight, UserX } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function OffboardingDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
      pending: 0,
      activeNotice: 0,
      clearancePending: 0,
      settlementPending: 0,
      completed: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/offboarding`, {
             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.data.success) {
            const data = response.data.data;
            
            // Calculate Stats
            setStats({
                pending: data.filter((i: any) => i.status === 'Initiated').length,
                activeNotice: data.filter((i: any) => i.status === 'Notice Period Active').length,
                clearancePending: data.filter((i: any) => i.status === 'Clearance Pending').length,
                settlementPending: data.filter((i: any) => i.status === 'Settlement Pending').length,
                completed: data.filter((i: any) => i.status === 'Archived').length
            });

            // Get Recent Activity (Sort by updated at descending)
            const sortedData = [...data].sort((a: any, b: any) => 
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            ).slice(0, 5);
            setRecentActivity(sortedData);
        }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const StatCard = ({ title, count, icon: Icon, colorClass, bgClass, textClass, onClick }: any) => (
      <Card className={`relative overflow-hidden p-5 cursor-pointer hover:shadow-lg transition-all duration-200 group border-l-4 ${colorClass}`} onClick={onClick}>
          <div className="flex justify-between items-start">
              <div>
                  <p className="text-gray-500 text-xs font-bold tracking-wider uppercase mb-1">{title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{count}</h3>
              </div>
              <div className={`p-3 rounded-xl ${bgClass} ${textClass} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
              </div>
          </div>
      </Card>
  );

  return (
    <div className="space-y-8 pb-10">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Offboarding Dashboard</h1>
            <p className="text-gray-500">Overview of employee exit processes and tasks.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            <StatCard 
                title="Pending Exits" 
                count={stats.pending} 
                icon={LogOut} 
                colorClass="border-blue-500" 
                bgClass="bg-blue-50" 
                textClass="text-blue-600" 
                onClick={() => navigate('/offboarding/list?status=Initiated')} 
            />
            <StatCard 
                title="Notice Period" 
                count={stats.activeNotice} 
                icon={Clock} 
                colorClass="border-amber-500" 
                bgClass="bg-amber-50" 
                textClass="text-amber-600" 
                onClick={() => navigate('/offboarding/list?status=Notice Period Active')} 
            />
            <StatCard 
                title="Clearance" 
                count={stats.clearancePending} 
                icon={AlertTriangle} 
                colorClass="border-orange-500" 
                bgClass="bg-orange-50" 
                textClass="text-orange-600" 
                onClick={() => navigate('/offboarding/list?status=Clearance Pending')} 
            />
            <StatCard 
                title="Settlement" 
                count={stats.settlementPending} 
                icon={Briefcase} 
                colorClass="border-purple-500" 
                bgClass="bg-purple-50" 
                textClass="text-purple-600" 
                onClick={() => navigate('/offboarding/list?status=Settlement Pending')} 
            />
            <StatCard 
                title="Completed" 
                count={stats.completed} 
                icon={CheckCircle} 
                colorClass="border-green-500" 
                bgClass="bg-green-50" 
                textClass="text-green-600" 
                onClick={() => navigate('/offboarding/list?status=Archived')} 
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <Card className="p-6 lg:col-span-1 h-fit">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-4">
                    <Button 
                        className="w-full justify-between h-12 text-md" 
                        onClick={() => navigate('/offboarding/initiate')}
                    >
                        <span className="flex items-center gap-2">
                            <UserX className="w-4 h-4" /> Initiate Offboarding
                        </span>
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                    <Button 
                        variant="outline" 
                        className="w-full justify-between h-12 text-md" 
                        onClick={() => navigate('/offboarding/list')}
                    >
                        <span className="flex items-center gap-2">
                            <Search className="w-4 h-4" /> View All Requests
                        </span>
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </Card>
            
            {/* Recent Activity */}
            <Card className="p-6 lg:col-span-2">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/offboarding/list')}>View All</Button>
                 </div>
                 
                 {loading ? (
                     <div className="text-center py-10 text-gray-400">Loading activity...</div>
                 ) : recentActivity.length === 0 ? (
                     <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-lg">
                         <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                             <Clock className="w-6 h-6 text-gray-400" />
                         </div>
                         <p className="text-gray-500">No recent activity found.</p>
                     </div>
                 ) : (
                     <div className="space-y-4">
                         {recentActivity.map((item: any) => (
                             <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all border border-gray-100 cursor-pointer" onClick={() => navigate(`/offboarding/process/${item._id}`)}>
                                 <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                         {item.employeeId?.name?.charAt(0) || 'U'}
                                     </div>
                                     <div>
                                         <p className="font-semibold text-gray-900">{item.employeeId?.name || 'Unknown Employee'}</p>
                                         <p className="text-xs text-gray-500">{item.employeeId?.designation} • {item.exitType}</p>
                                     </div>
                                 </div>
                                 <div className="text-right">
                                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                         item.status === 'Archived' ? 'bg-green-100 text-green-700' :
                                         item.status === 'Initiated' ? 'bg-blue-100 text-blue-700' :
                                         'bg-amber-100 text-amber-700'
                                     }`}>
                                         {item.status}
                                     </span>
                                     <p className="text-xs text-gray-400 mt-1">
                                         Updated: {new Date(item.updatedAt).toLocaleDateString()}
                                     </p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 )}
            </Card>
        </div>
    </div>
  );
}
