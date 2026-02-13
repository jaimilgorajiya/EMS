import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Textarea from '../../components/Textarea';

export default function PerformanceReview() {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const teamMembers = [
    {
      id: 'EMP003',
      name: 'Emily Rodriguez',
      position: 'Senior Software Engineer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      lastReview: '2025-11-15',
      performance: 4.5,
      attendance: 99.1,
      tasksCompleted: 42
    },
    {
      id: 'EMP006',
      name: 'David Brown',
      position: 'Software Engineer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      lastReview: '2025-12-10',
      performance: 4.0,
      attendance: 98.0,
      tasksCompleted: 38
    },
    {
      id: 'EMP005',
      name: 'Sophia Lee',
      position: 'Marketing Specialist',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
      lastReview: '2025-10-22',
      performance: 4.8,
      attendance: 97.5,
      tasksCompleted: 45
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleReview = (employee: any) => {
    setSelectedEmployee(employee);
    setShowReviewModal(true);
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'Manager', path: '/manager' }, { label: 'Performance Review' }]} />
      
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Performance Review</h1>
        <p className="text-gray-600 mt-1">Review and evaluate team member performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Team Members</p>
          <p className="text-3xl font-semibold text-gray-900">10</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Reviews Due</p>
          <p className="text-3xl font-semibold text-orange-600">3</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Avg. Performance</p>
          <p className="text-3xl font-semibold text-blue-600">4.3/5</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Completed Reviews</p>
          <p className="text-3xl font-semibold text-green-600">7</p>
        </Card>
      </div>

      {/* Team Members */}
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <div className="flex items-start gap-6">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.position} • {member.id}</p>
                  </div>
                  <Button onClick={() => handleReview(member)}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Performance Rating</p>
                    {renderStars(member.performance)}
                    <p className="text-sm font-medium text-gray-900 mt-1">{member.performance}/5</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Attendance</p>
                    <p className="text-2xl font-semibold text-green-600">{member.attendance}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Tasks Completed</p>
                    <p className="text-2xl font-semibold text-blue-600">{member.tasksCompleted}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Last Review</p>
                    <p className="text-sm font-medium text-gray-900">{member.lastReview}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Performance Review"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
              Cancel
            </Button>
            <Button>Submit Review</Button>
          </>
        }
      >
        {selectedEmployee && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedEmployee.name}</h3>
                  <p className="text-sm text-gray-600">{selectedEmployee.position}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Overall Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="hover:scale-110 transition-transform"
                  >
                    <Star className="w-8 h-8 text-gray-300 hover:fill-yellow-400 hover:text-yellow-400" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Performance Areas
              </label>
              <div className="space-y-3">
                {['Quality of Work', 'Communication', 'Teamwork', 'Initiative'].map((area) => (
                  <div key={area}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700">{area}</span>
                      <span className="text-sm font-medium">4/5</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      defaultValue="4"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Textarea
              label="Strengths"
              placeholder="What does this employee do well?"
              rows={3}
            />

            <Textarea
              label="Areas for Improvement"
              placeholder="What could this employee improve on?"
              rows={3}
            />

            <Textarea
              label="Goals for Next Period"
              placeholder="What goals should this employee work towards?"
              rows={3}
            />

            <Textarea
              label="Additional Comments"
              placeholder="Any additional feedback..."
              rows={2}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
