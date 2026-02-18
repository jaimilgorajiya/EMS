import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Edit, Trash2, MapPin, X } from 'lucide-react';

interface Location {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}

export default function LocationList() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoc, setEditingLoc] = useState<Location | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    coordinates: {
      latitude: '',
      longitude: '',
      radius: '100'
    }
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/locations`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data.success) {
        setLocations(response.data.locations);
      }
    } catch (error) {
      console.error("Failed to fetch locations", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      if (editingLoc) {
        await axios.put(`${import.meta.env.VITE_API_URL}/locations/${editingLoc._id}`, formData, { headers });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/locations/add`, formData, { headers });
      }
      
      setIsModalOpen(false);
      fetchLocations();
      resetForm();
    } catch (error) {
      console.error("Failed to save location", error);
      alert("Failed to save location");
    }
  };

  const handleDelete = async (id: string) => {
    if(!window.confirm("Are you sure?")) return;
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/locations/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchLocations();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const openCreateModal = () => {
      setEditingLoc(null);
      resetForm();
      setIsModalOpen(true);
  };

  const openEditModal = (loc: Location) => {
      setEditingLoc(loc);
      setFormData({
          name: loc.name,
          address: loc.address,
          city: loc.city,
          state: loc.state,
          country: loc.country,
          pincode: loc.pincode,
          coordinates: {
            latitude: loc.coordinates?.latitude?.toString() || '',
            longitude: loc.coordinates?.longitude?.toString() || '',
            radius: loc.coordinates?.radius?.toString() || '100'
          }
      });
      setIsModalOpen(true);
  };

  const resetForm = () => {
      setFormData({ 
        name: '', 
        address: '', 
        city: '', 
        state: '', 
        country: '', 
        pincode: '',
        coordinates: {
          latitude: '',
          longitude: '',
          radius: '100'
        }
      });
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Locations / Branches</h1>
          <p className="text-sm text-gray-500">Manage office locations and branches</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Location
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
              <Card key={loc._id} className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-red-50 rounded-lg text-red-600">
                          <MapPin className="w-6 h-6" />
                      </div>
                      <div className="flex gap-2">
                          <button onClick={() => openEditModal(loc)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-blue-600">
                              <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(loc._id)} className="p-2 hover:bg-red-50 rounded-full text-gray-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                          </button>
                      </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{loc.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{loc.address}</p>
                  
                  <div className="border-t pt-4 space-y-2">
                       <div className="flex justify-between text-sm">
                          <span className="text-gray-500">City/State:</span>
                          <span className="font-medium text-gray-900">{loc.city}, {loc.state}</span>
                      </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Country:</span>
                          <span className="font-medium text-gray-900">{loc.country}</span>
                      </div>
                  </div>
              </Card>
          ))}
          {locations.length === 0 && !loading && (
              <div className="col-span-full py-10 text-center text-gray-500">
                  No locations found. Create one to get started.
              </div>
          )}
      </div>

       {/* Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95">
             <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingLoc ? 'Edit Location' : 'Add New Location'}
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
                label="Branch / Location Name *" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
              <Input 
                label="Address *" 
                value={formData.address} 
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
              />
               <div className="grid grid-cols-2 gap-4">
                    <Input 
                        label="City *" 
                        value={formData.city} 
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        required
                    />
                    <Input 
                        label="State *" 
                        value={formData.state} 
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        required
                    />
               </div>
                <div className="grid grid-cols-2 gap-4">
                     <Input 
                         label="Country *" 
                         value={formData.country} 
                         onChange={(e) => setFormData({...formData, country: e.target.value})}
                         required
                     />
                     <Input 
                         label="Pincode" 
                         value={formData.pincode} 
                         onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                     />
                </div>
                
                {/* Geolocation Fields for Attendance System */}
                <div className="border-t pt-4 mt-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 block">Attendance Geofencing</h4>
                    <div className="grid grid-cols-3 gap-3">
                        <Input 
                            label="Latitude" 
                            type="number"
                            step="any"
                            value={formData.coordinates.latitude} 
                            onChange={(e) => setFormData({
                                ...formData, 
                                coordinates: { ...formData.coordinates, latitude: e.target.value } 
                            })}
                        />
                        <Input 
                            label="Longitude" 
                            type="number"
                            step="any"
                            value={formData.coordinates.longitude} 
                            onChange={(e) => setFormData({
                                ...formData, 
                                coordinates: { ...formData.coordinates, longitude: e.target.value } 
                            })}
                        />
                         <Input 
                            label="Radius (m)" 
                            type="number"
                            value={formData.coordinates.radius} 
                            onChange={(e) => setFormData({
                                ...formData, 
                                coordinates: { ...formData.coordinates, radius: e.target.value } 
                            })}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Used for verifying employee location during punch-in.</p>
                </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingLoc ? 'Save Changes' : 'Create Location'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
