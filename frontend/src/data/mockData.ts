export const mockEmployees = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Admin",
    department: "IT",
    status: "Active",
    lastLogin: "2026-02-13 09:45 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    phone: "+1 234 567 8900",
    dateJoined: "2024-01-15",
    position: "Senior System Administrator",
    reportingTo: "N/A",
    salary: "$85,000",
    leaveBalance: 15,
    attendanceRate: 98.5
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "Manager",
    department: "Engineering",
    status: "Active",
    lastLogin: "2026-02-13 10:20 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    phone: "+1 234 567 8901",
    dateJoined: "2023-06-10",
    position: "Engineering Manager",
    reportingTo: "Sarah Johnson",
    salary: "$95,000",
    leaveBalance: 12,
    attendanceRate: 96.2
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    role: "Employee",
    department: "Engineering",
    status: "Active",
    lastLogin: "2026-02-13 08:30 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    phone: "+1 234 567 8902",
    dateJoined: "2024-03-22",
    position: "Senior Software Engineer",
    reportingTo: "Michael Chen",
    salary: "$78,000",
    leaveBalance: 18,
    attendanceRate: 99.1
  },
  {
    id: "EMP004",
    name: "James Williams",
    email: "james.williams@company.com",
    role: "Manager",
    department: "Marketing",
    status: "Active",
    lastLogin: "2026-02-12 04:55 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    phone: "+1 234 567 8903",
    dateJoined: "2023-09-05",
    position: "Marketing Manager",
    reportingTo: "Sarah Johnson",
    salary: "$88,000",
    leaveBalance: 10,
    attendanceRate: 94.8
  },
  {
    id: "EMP005",
    name: "Sophia Lee",
    email: "sophia.lee@company.com",
    role: "Employee",
    department: "Marketing",
    status: "Active",
    lastLogin: "2026-02-13 09:10 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    phone: "+1 234 567 8904",
    dateJoined: "2024-07-18",
    position: "Marketing Specialist",
    reportingTo: "James Williams",
    salary: "$62,000",
    leaveBalance: 20,
    attendanceRate: 97.5
  },
  {
    id: "EMP006",
    name: "David Brown",
    email: "david.brown@company.com",
    role: "Employee",
    department: "Engineering",
    status: "Active",
    lastLogin: "2026-02-13 09:00 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    phone: "+1 234 567 8905",
    dateJoined: "2024-02-10",
    position: "Software Engineer",
    reportingTo: "Michael Chen",
    salary: "$72,000",
    leaveBalance: 16,
    attendanceRate: 98.0
  },
  {
    id: "EMP007",
    name: "Olivia Martinez",
    email: "olivia.martinez@company.com",
    role: "Employee",
    department: "HR",
    status: "Active",
    lastLogin: "2026-02-13 08:45 AM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    phone: "+1 234 567 8906",
    dateJoined: "2023-11-20",
    position: "HR Specialist",
    reportingTo: "Sarah Johnson",
    salary: "$58,000",
    leaveBalance: 14,
    attendanceRate: 96.7
  },
  {
    id: "EMP008",
    name: "Robert Taylor",
    email: "robert.taylor@company.com",
    role: "Employee",
    department: "Sales",
    status: "On Leave",
    lastLogin: "2026-02-10 03:20 PM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    phone: "+1 234 567 8907",
    dateJoined: "2024-05-12",
    position: "Sales Executive",
    reportingTo: "James Williams",
    salary: "$65,000",
    leaveBalance: 8,
    attendanceRate: 92.3
  },
];

export const mockDepartments = [
  {
    id: "DEPT001",
    name: "Engineering",
    manager: "Michael Chen",
    employeeCount: 24,
    description: "Software development and technical infrastructure",
    budget: "$2,400,000"
  },
  {
    id: "DEPT002",
    name: "Marketing",
    manager: "James Williams",
    employeeCount: 12,
    description: "Marketing, branding, and customer acquisition",
    budget: "$850,000"
  },
  {
    id: "DEPT003",
    name: "Sales",
    manager: "Jennifer Davis",
    employeeCount: 18,
    description: "Sales operations and business development",
    budget: "$1,200,000"
  },
  {
    id: "DEPT004",
    name: "HR",
    manager: "Sarah Johnson",
    employeeCount: 6,
    description: "Human resources and employee management",
    budget: "$450,000"
  },
  {
    id: "DEPT005",
    name: "IT",
    manager: "Sarah Johnson",
    employeeCount: 8,
    description: "IT support and system administration",
    budget: "$680,000"
  },
];

export const mockAttendance = [
  { date: "2026-02-01", present: 142, absent: 8, wfh: 12, late: 5 },
  { date: "2026-02-02", present: 138, absent: 10, wfh: 14, late: 3 },
  { date: "2026-02-03", present: 145, absent: 6, wfh: 11, late: 7 },
  { date: "2026-02-04", present: 140, absent: 9, wfh: 13, late: 4 },
  { date: "2026-02-05", present: 143, absent: 7, wfh: 12, late: 6 },
  { date: "2026-02-06", present: 141, absent: 8, wfh: 13, late: 5 },
  { date: "2026-02-07", present: 139, absent: 10, wfh: 13, late: 8 },
];

export const mockPayroll = [
  { month: "Aug", amount: 485000 },
  { month: "Sep", amount: 492000 },
  { month: "Oct", amount: 498000 },
  { month: "Nov", amount: 505000 },
  { month: "Dec", amount: 520000 },
  { month: "Jan", amount: 512000 },
  { month: "Feb", amount: 518000 },
];

export const mockLeaveStats = [
  { type: "Sick Leave", count: 45, color: "#ef4444" },
  { type: "Casual Leave", count: 78, color: "#3b82f6" },
  { type: "Paid Leave", count: 92, color: "#10b981" },
  { type: "WFH", count: 156, color: "#f59e0b" },
];

export const mockLeaveRequests = [
  {
    id: "LR001",
    employeeName: "Emily Rodriguez",
    employeeId: "EMP003",
    type: "Sick Leave",
    from: "2026-02-15",
    to: "2026-02-17",
    days: 3,
    reason: "Medical appointment and recovery",
    status: "Pending",
    appliedOn: "2026-02-13"
  },
  {
    id: "LR002",
    employeeName: "David Brown",
    employeeId: "EMP006",
    type: "WFH",
    from: "2026-02-14",
    to: "2026-02-14",
    days: 1,
    reason: "Home internet installation",
    status: "Pending",
    appliedOn: "2026-02-12"
  },
  {
    id: "LR003",
    employeeName: "Sophia Lee",
    employeeId: "EMP005",
    type: "Casual Leave",
    from: "2026-02-20",
    to: "2026-02-22",
    days: 3,
    reason: "Family event",
    status: "Approved",
    appliedOn: "2026-02-10"
  },
  {
    id: "LR004",
    employeeName: "Robert Taylor",
    employeeId: "EMP008",
    type: "Paid Leave",
    from: "2026-02-10",
    to: "2026-02-14",
    days: 5,
    reason: "Vacation",
    status: "Approved",
    appliedOn: "2026-02-05"
  },
];

export const mockTasks = [
  {
    id: "TASK001",
    title: "Update employee database",
    assignedTo: "Emily Rodriguez",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-02-15",
    progress: 65
  },
  {
    id: "TASK002",
    title: "Prepare Q1 marketing report",
    assignedTo: "Sophia Lee",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2026-02-18",
    progress: 40
  },
  {
    id: "TASK003",
    title: "Code review for new feature",
    assignedTo: "David Brown",
    priority: "High",
    status: "To Do",
    dueDate: "2026-02-14",
    progress: 0
  },
  {
    id: "TASK004",
    title: "Update HR policies document",
    assignedTo: "Olivia Martinez",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-02-12",
    progress: 100
  },
];

export const mockRecentActivities = [
  {
    id: 1,
    user: "Emily Rodriguez",
    action: "submitted leave request",
    time: "5 minutes ago",
    type: "leave"
  },
  {
    id: 2,
    user: "Michael Chen",
    action: "approved WFH request",
    time: "15 minutes ago",
    type: "approval"
  },
  {
    id: 3,
    user: "David Brown",
    action: "clocked in",
    time: "1 hour ago",
    type: "attendance"
  },
  {
    id: 4,
    user: "Sarah Johnson",
    action: "added new employee",
    time: "2 hours ago",
    type: "user"
  },
  {
    id: 5,
    user: "Sophia Lee",
    action: "completed task",
    time: "3 hours ago",
    type: "task"
  },
];

export const mockSystemAlerts = [
  {
    id: 1,
    type: "warning",
    message: "5 pending leave approvals",
    time: "Today"
  },
  {
    id: 2,
    type: "info",
    message: "Payroll processing scheduled for Feb 28",
    time: "Today"
  },
  {
    id: 3,
    type: "error",
    message: "3 missed punch-in corrections needed",
    time: "Yesterday"
  },
];

export const currentUser = {
  name: "Sarah Johnson",
  email: "sarah.johnson@company.com",
  role: "Admin",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
};
