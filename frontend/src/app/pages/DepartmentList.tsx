import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select'; 
import { Plus, Edit, Trash2, Building, RefreshCw, X } from 'lucide-react';

interface Department {
  _id: string;
  departmentId: string;
  name: string;
  description: string;
  headOfDepartment: string;
  location: string;
}

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    headOfDepartment: '',
    location: ''
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/departments`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data.success) {
        setDepartments(response.data.departments);
      }
    } catch (error) {
      console.error("Failed to fetch departments", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      if (editingDept) {
        await axios.put(`${import.meta.env.VITE_API_URL}/departments/${editingDept._id}`, formData, { headers });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/departments/create`, formData, { headers });
      }
      
      setIsModalOpen(false);
      fetchDepartments();
      resetForm();
    } catch (error) {
      console.error("Failed to save department", error);
      alert("Failed to save department");
    }
  };

  const handleDelete = async (id: string) => {
    if(!window.confirm("Are you sure?")) return;
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/departments/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchDepartments();
    } catch (error) {
        console.error("Failed to delete", error);
    }
  };

  const openCreateModal = () => {
      setEditingDept(null);
      resetForm();
      setIsModalOpen(true);
  };

  const openEditModal = (dept: Department) => {
      setEditingDept(dept);
      setFormData({
          name: dept.name,
          description: dept.description,
          headOfDepartment: dept.headOfDepartment,
          location: dept.location
      });
      setIsModalOpen(true);
  };

  const resetForm = () => {
      setFormData({ name: '', description: '', headOfDepartment: '', location: '' });
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-sm text-gray-500">Manage organization departments</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
              <Card key={dept._id} className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                          <Building className="w-6 h-6" />
                      </div>
                      <div className="flex gap-2">
                          <button onClick={() => openEditModal(dept)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-blue-600">
                              <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(dept._id)} className="p-2 hover:bg-red-50 rounded-full text-gray-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                          </button>
                      </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{dept.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{dept.description || 'No description'}</p>
                  
                  <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                          <span className="text-gray-500">ID:</span>
                          <span className="font-medium text-gray-900">{dept.departmentId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Head:</span>
                          <span className="font-medium text-gray-900">{dept.headOfDepartment || '-'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Location:</span>
                          <span className="font-medium text-gray-900">{dept.location || '-'}</span>
                      </div>
                  </div>
              </Card>
          ))}
          {departments.length === 0 && !loading && (
              <div className="col-span-full py-10 text-center text-gray-500">
                  No departments found. Create one to get started.
              </div>
          )}
      </div>

       {/* Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingDept ? 'Edit Department' : 'Add New Department'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <Input 
                label="Department Name *" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
              <Input 
                label="Description" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <Input 
                label="Head of Department" 
                value={formData.headOfDepartment} 
                onChange={(e) => setFormData({...formData, headOfDepartment: e.target.value})}
              />
              <Input 
                label="Location" 
                value={formData.location} 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDept ? 'Save Changes' : 'Create Department'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
